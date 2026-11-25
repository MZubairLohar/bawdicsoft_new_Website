import { NextResponse } from 'next/server';
import { getAgentById, personalize } from '@/lib/agents';

// Proxies the website widget to the BawdicSoft Sales Agent backend (chatbot/backend/app.py).
//   POST /api/chat   -> POST {BOT_API_URL}/api/chat
//   GET  /api/chat   -> GET  {BOT_API_URL}/health   (open in the browser to check the connection)

export const runtime = 'nodejs';
// The backend makes two LLM calls per turn (analyse + reply), so allow some time.
// (Vercel Hobby plan max is 60s.)
export const maxDuration = 60;

// e.g. http://localhost:8000 locally, or https://api.bawdicsoft.com in production (no trailing slash)
// const BOT_API_URL = (process.env.BOT_API_URL || '').replace(/\/+$/, '');
// const BOT_API_URL = 'https://bawdicsoft-sales-agent.onrender.com';
const BOT_API_URL = 'http://localhost:8000';
// Tenant seeded with `python -m scripts.seed_tenant` (DEFAULT_TENANT_ID in chatbot/.env)
// const TENANT_ID = process.env.BOT_TENANT_ID || 'bawdicsoft';
const TENANT_ID = 'bawdicsoft';

const REQUEST_TIMEOUT_MS = 45_000;
// Minimum time before the reply is shown, so the typing indicator feels natural.
// The backend's own time counts towards it.
const MIN_REPLY_MS = 3_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Quick-reply chips -> clearer questions for the model
const CHIP_MAP: Record<string, string> = {
  '🤖 AI Solutions': 'What AI solutions and chatbots do you build?',
  '⛓️ Blockchain Development': 'Tell me about your blockchain and smart contract development.',
  '📞 Book a Strategy Call': 'I would like to book a strategy call.',
};

// Backend accepts ^[A-Za-z0-9_-]{8,64}$; otherwise it makes up a new visitor each time.
function toVisitorId(value: unknown): string | undefined {
  const clean = (typeof value === 'string' ? value : '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
  return clean.length >= 8 ? clean : undefined;
}

// Backend session ids are MongoDB ObjectIds (24 hex chars).
function toSessionId(value: unknown): string | undefined {
  return typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value) ? value : undefined;
}

// Health check: open http://localhost:3000/api/chat in the browser.
export async function GET() {
  if (!BOT_API_URL) {
    return NextResponse.json({ ok: false, error: 'BOT_API_URL is not set' }, { status: 500 });
  }
  const target = `${BOT_API_URL}/health`;
  const started = Date.now();
  try {
    const res = await fetch(target, { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    const data = await res.json().catch(() => null);
    return NextResponse.json(
      { ok: res.ok, hit: target, status: res.status, latencyMs: Date.now() - started, tenant: TENANT_ID, backend: data },
      { status: res.ok ? 200 : 502 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, hit: target, error: e?.name === 'TimeoutError' ? 'timeout' : e?.message },
      { status: 502 },
    );
  }
}

export async function POST(req: Request) {
  if (!BOT_API_URL) {
    return NextResponse.json({ ok: false, error: 'BOT_API_URL is not configured' }, { status: 500 });
  }

  try {
    const { messages, visitorId, sessionId, agent } = await req.json();

    // Only trust the agent id; look the name up on the server from the whitelist.
    const assigned = getAgentById(agent?.id);

    // The backend keeps the history itself, so only the newest user message is sent.
    const lastUser = Array.isArray(messages)
      ? [...messages].reverse().find((m: any) => m?.role === 'user')
      : null;
    const rawText = String(lastUser?.content ?? '').trim();
    if (!rawText) {
      return NextResponse.json({ ok: false, error: 'Empty message' }, { status: 400 });
    }
    const message = (CHIP_MAP[rawText] ?? rawText).slice(0, 2000);

    const target = `${BOT_API_URL}/api/chat`;
    const started = Date.now();

    const res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        tenant_id: TENANT_ID,
        visitor_id: toVisitorId(visitorId),
        session_id: toSessionId(sessionId),
        // The bot introduces itself as the visitor's assigned assistant.
        bot_name: assigned?.name,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const data = await res.json().catch(() => null);
    const ms = Date.now() - started;
    console.log(`[api/chat] <- ${res.status} from ${target} in ${ms}ms`);
    if (!res.ok || !data) {
      throw new Error(data?.error || `Bot backend returned ${res.status}`);
    }

    let reply = String(data.reply ?? '').trim();
    if (!reply) throw new Error('empty reply');

    // Safety net in case the model still uses a default persona name.
    if (assigned) reply = personalize(reply, assigned);

    await sleep(Math.max(0, MIN_REPLY_MS - ms));

    return NextResponse.json({
      ok: true,
      reply,
      sessionId: data.session_id ?? null,
      agent: assigned?.id ?? null,
      // e.g. [{ tool: 'book_meeting', status: 'ok' }]
      actions: Array.isArray(data.actions) ? data.actions : [],
    });
  } catch (e: any) {
    const msg = e?.name === 'TimeoutError' ? 'Bot backend timed out' : e?.message;
    console.error('[api/chat]', msg);
    return NextResponse.json({ ok: false, error: msg || 'Unknown error' }, { status: 502 });
  }
}
