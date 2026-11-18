// // app/api/chat/route.ts
// //
// // Proxies the website chat widget to the BawdicSoft AI Agent Studio backend
// // deployed on Hugging Face Spaces (Docker / Starlette, NOT Gradio).
// //
// // Backend contract (backend/app.py):
// //   POST {BOT_API_URL}/api/chat   body: { sessionId, message, config? }
// //   -> { reply, analysis, leadCaptured, userProfile, ... }
// // The backend stores the conversation history itself (per sessionId),
// // so we only send the newest user message, not the whole history.

// import { NextResponse } from 'next/server';
// import { getAgentById, personalize } from '@/lib/agents';

// export const runtime = 'nodejs';
// // HF Spaces can take a while to wake up from sleep, so allow extra time.
// export const maxDuration = 60;

// // e.g. https://moizshah956-my-rag-bot-2.hf.space  (no trailing slash)
// const BOT_API_URL = (process.env.BOT_API_URL || '').replace(/\/+$/, '');
// // Only needed if the Space is private.
// const HF_TOKEN = process.env.HF_TOKEN;

// const REQUEST_TIMEOUT_MS = 55_000; 
// const CONFIG_TTL_MS = 5 * 60_000; 

// // Quick-reply chips -> clearer questions for the model
// const CHIP_MAP: Record<string, string> = {
//   // '💼 Get a Free Quote': 'How much does a custom project cost?',
//   '🤖 AI Solutions': 'What AI solutions and chatbots do you build?',
//   '⛓️ Blockchain Development': 'Tell me about your blockchain and smart contract development.',
//   '📞 Book a Strategy Call': 'I would like to book a strategy call.',
// };

// function authHeaders(): Record<string, string> {
//   return HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {};
// }

// // Cache the Space's active bot config so we can swap in the assigned agent's
// // name without fetching it on every message.
// let cachedConfig: { value: Record<string, unknown>; at: number } | null = null;

// async function getBotConfig(): Promise<Record<string, unknown> | null> {
//   if (cachedConfig && Date.now() - cachedConfig.at < CONFIG_TTL_MS) {
//     return cachedConfig.value;
//   }
//   try {
//     const res = await fetch(`${BOT_API_URL}/api/config`, {
//       headers: authHeaders(),
//       cache: 'no-store',
//       signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
//     });
//     if (!res.ok) return cachedConfig?.value ?? null;
//     const value = (await res.json()) as Record<string, unknown>;
//     cachedConfig = { value, at: Date.now() };
//     return value;
//   } catch {
//     return cachedConfig?.value ?? null;
//   }
// }

// // Keep session ids short and safe; they become keys in the backend's sessions.json.
// function toSessionId(visitorId: unknown): string {
//   const raw = typeof visitorId === 'string' ? visitorId : '';
//   const clean = raw.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
//   return clean ? `web_${clean}` : `web_anon_${crypto.randomUUID()}`;
// }

// // e.g. moizshah956/MY_RAG_BOT_2 (optional, shown in the health check)
// const BOT_SPACE_ID = process.env.BOT_SPACE_ID || '';

// // Asks Hugging Face for this Space's details and checks its URL matches BOT_API_URL.
// async function getSpaceInfo() {
//   if (!BOT_SPACE_ID) return { spaceName: null, note: 'Set BOT_SPACE_ID to see the Space name' };
//   // HF builds the Space URL from owner-name, lowercased, with _ and . turned into -
//   const expectedHost =
//     'https://' + BOT_SPACE_ID.toLowerCase().replace(/\//, '-').replace(/[_.]/g, '-') + '.hf.space';
//   try {
//     const res = await fetch(`https://huggingface.co/api/spaces/${BOT_SPACE_ID}`, {
//       headers: authHeaders(),
//       cache: 'no-store',
//       signal: AbortSignal.timeout(15_000),
//     });
//     const info = res.ok ? await res.json() : null;
//     return {
//       spaceName: info?.id ?? BOT_SPACE_ID,
//       spacePage: `https://huggingface.co/spaces/${BOT_SPACE_ID}`,
//       spaceStatus: info?.runtime?.stage ?? (res.ok ? 'unknown' : `HF API ${res.status}`),
//       urlMatchesSpace: expectedHost === BOT_API_URL.toLowerCase(),
//     };
//   } catch {
//     return {
//       spaceName: BOT_SPACE_ID,
//       spaceStatus: 'could not reach huggingface.co',
//       urlMatchesSpace: expectedHost === BOT_API_URL.toLowerCase(),
//     };
//   }
// }

// // Health check: open http://localhost:3000/api/chat in the browser.
// // It pings the Space and reports which URL was hit and what it returned.
// export async function GET() {
//   if (!BOT_API_URL) {
//     return NextResponse.json({ ok: false, error: 'BOT_API_URL is not set' }, { status: 500 });
//   }
//   const target = `${BOT_API_URL}/api/config`;
//   const started = Date.now();
//   try {
//     const res = await fetch(target, {
//       headers: authHeaders(),
//       cache: 'no-store',
//       signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
//     });
//     const cfg = await res.json().catch(() => null);
//     return NextResponse.json({
//       ...(await getSpaceInfo()),
//       ok: res.ok,
//       hit: target,
//       status: res.status,
//       latencyMs: Date.now() - started,
//       businessName: cfg?.businessName ?? null,
//       agentName: cfg?.agentName ?? null,
//       knowledgeBaseChars: typeof cfg?.knowledgeBase === 'string' ? cfg.knowledgeBase.length : 0,
//     });
//   } catch (e: any) {
//     return NextResponse.json(
//       { ok: false, hit: target, error: e?.name === 'TimeoutError' ? 'timeout' : e?.message },
//       { status: 502 },
//     );
//   }
// }

// export async function POST(req: Request) {
//   if (!BOT_API_URL) {
//     return NextResponse.json(
//       { ok: false, error: 'BOT_API_URL is not configured (API key / env missing)' },
//       { status: 500 },
//     );
//   }

//   try {
//     const { messages, visitorId, agent } = await req.json();

//     // Only trust the agent id; look the name up on the server from the whitelist.
//     const assigned = getAgentById(agent?.id);

//     // The newest user message is the one to send.
//     const lastUser = Array.isArray(messages)
//       ? [...messages].reverse().find((m: any) => m?.role === 'user')
//       : null;
//     const rawText = String(lastUser?.content ?? '').trim();
//     if (!rawText) {
//       return NextResponse.json({ ok: false, error: 'Empty message' }, { status: 400 });
//     }
//     const message = (CHIP_MAP[rawText] ?? rawText).slice(0, 2000);

//     // Make the model introduce itself with the assigned agent's name.
//     let config: Record<string, unknown> | undefined;
//     if (assigned) {
//       const base = await getBotConfig();
//       if (base) config = { ...base, agentName: assigned.name };
//     }

//     const target = `${BOT_API_URL}/api/chat`;
//     const started = Date.now();
//     console.log(`[api/chat] -> POST ${target}`);

//     const res = await fetch(target, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', ...authHeaders() },
//       body: JSON.stringify({
//         sessionId: toSessionId(visitorId),
//         message,
//         ...(config ? { config } : {}),
//       }),
//       cache: 'no-store',
//       signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
//     });

//     const data = await res.json().catch(() => null);
//     const ms = Date.now() - started;
//     console.log(
//       `[api/chat] <- ${res.status} from ${target} in ${ms}ms` +
//         (data?.isMockMode ? ' (WARNING: Space is in mock mode, GEMINI_API_KEY missing)' : ''),
//     );
//     if (!res.ok || !data) {
//       throw new Error(data?.error || `Bot backend returned ${res.status}`);
//     }

//     let reply = String(data.reply ?? '').trim();
//     if (!reply) throw new Error('empty reply');

//     // Safety net in case the model still uses its default persona name.
//     if (assigned) reply = personalize(reply, assigned);

//     return NextResponse.json(
//       {
//         ok: true,
//         reply,
//         agent: assigned?.id ?? null,
//         leadCaptured: Boolean(data.leadCaptured),
//         // Debug info: proves which backend answered
//         source: {
//           backend: BOT_API_URL,
//           status: res.status,
//           latencyMs: ms,
//           mockMode: Boolean(data.isMockMode),
//           replySource: data.analysis?.source ?? null,
//         },
//       },
//       { headers: { 'x-bot-backend': BOT_API_URL, 'x-bot-latency-ms': String(ms) } },
//     );
//   } catch (e: any) {
//     const msg =
//       e?.name === 'TimeoutError' ? 'Bot backend timed out (Space may be waking up)' : e?.message;
//     console.error('[api/chat]', msg);
//     return NextResponse.json({ ok: false, error: msg || 'Unknown error' }, { status: 502 });
//   }
// }


// app/api/chat/route.ts
//
// Proxies the website chat widget to the BawdicSoft AI Agent Studio backend
// deployed on Hugging Face Spaces (Docker / Starlette, NOT Gradio).
//
// Backend contract (backend/app.py):
//   POST {BOT_API_URL}/api/chat   body: { sessionId, message, config? }
//   -> { reply, analysis, leadCaptured, userProfile, ... }
// The backend stores the conversation history itself (per sessionId),
// so we only send the newest user message, not the whole history.

import { NextResponse } from 'next/server';
import { getAgentById, personalize } from '@/lib/agents';

export const runtime = 'nodejs';
// HF Spaces can take a while to wake up from sleep, so allow extra time.
// 45s backend timeout + 10s reply delay = 55s, plus some headroom.
// (Vercel Hobby plan max is 60s; Pro allows more.)
export const maxDuration = 70;

// e.g. https://moizshah956-my-rag-bot-2.hf.space  (no trailing slash)
const BOT_API_URL = (process.env.BOT_API_URL || '').replace(/\/+$/, '');
// Only needed if the Space is private.
const HF_TOKEN = process.env.HF_TOKEN;

const REQUEST_TIMEOUT_MS = 45_000;
const CONFIG_TTL_MS = 5 * 60_000;
// Wait this long before sending the reply back to the widget.
const REPLY_DELAY_MS = 6_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Quick-reply chips -> clearer questions for the model
const CHIP_MAP: Record<string, string> = {
  // '💼 Get a Free Quote': 'How much does a custom project cost?',
  '🤖 AI Solutions': 'What AI solutions and chatbots do you build?',
  '⛓️ Blockchain Development': 'Tell me about your blockchain and smart contract development.',
  '📞 Book a Strategy Call': 'I would like to book a strategy call.',
};

function authHeaders(): Record<string, string> {
  return HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {};
}

// Cache the Space's active bot config so we can swap in the assigned agent's
// name without fetching it on every message.
let cachedConfig: { value: Record<string, unknown>; at: number } | null = null;

async function getBotConfig(): Promise<Record<string, unknown> | null> {
  if (cachedConfig && Date.now() - cachedConfig.at < CONFIG_TTL_MS) {
    return cachedConfig.value;
  }
  try {
    const res = await fetch(`${BOT_API_URL}/api/config`, {
      headers: authHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return cachedConfig?.value ?? null;
    const value = (await res.json()) as Record<string, unknown>;
    cachedConfig = { value, at: Date.now() };
    return value;
  } catch {
    return cachedConfig?.value ?? null;
  }
}

// Keep session ids short and safe; they become keys in the backend's sessions.json.
function toSessionId(visitorId: unknown): string {
  const raw = typeof visitorId === 'string' ? visitorId : '';
  const clean = raw.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  return clean ? `web_${clean}` : `web_anon_${crypto.randomUUID()}`;
}

// e.g. moizshah956/MY_RAG_BOT_2 (optional, shown in the health check)
const BOT_SPACE_ID = process.env.BOT_SPACE_ID || '';

// Asks Hugging Face for this Space's details and checks its URL matches BOT_API_URL.
async function getSpaceInfo() {
  if (!BOT_SPACE_ID) return { spaceName: null, note: 'Set BOT_SPACE_ID to see the Space name' };
  // HF builds the Space URL from owner-name, lowercased, with _ and . turned into -
  const expectedHost =
    'https://' + BOT_SPACE_ID.toLowerCase().replace(/\//, '-').replace(/[_.]/g, '-') + '.hf.space';
  try {
    const res = await fetch(`https://huggingface.co/api/spaces/${BOT_SPACE_ID}`, {
      headers: authHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
    const info = res.ok ? await res.json() : null;
    return {
      spaceName: info?.id ?? BOT_SPACE_ID,
      spacePage: `https://huggingface.co/spaces/${BOT_SPACE_ID}`,
      spaceStatus: info?.runtime?.stage ?? (res.ok ? 'unknown' : `HF API ${res.status}`),
      urlMatchesSpace: expectedHost === BOT_API_URL.toLowerCase(),
    };
  } catch {
    return {
      spaceName: BOT_SPACE_ID,
      spaceStatus: 'could not reach huggingface.co',
      urlMatchesSpace: expectedHost === BOT_API_URL.toLowerCase(),
    };
  }
}

// Health check: open http://localhost:3000/api/chat in the browser.
// It pings the Space and reports which URL was hit and what it returned.
export async function GET() {
  if (!BOT_API_URL) {
    return NextResponse.json({ ok: false, error: 'BOT_API_URL is not set' }, { status: 500 });
  }
  const target = `${BOT_API_URL}/api/config`;
  const started = Date.now();
  try {
    const res = await fetch(target, {
      headers: authHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const cfg = await res.json().catch(() => null);
    return NextResponse.json({
      ...(await getSpaceInfo()),
      ok: res.ok,
      hit: target,
      status: res.status,
      latencyMs: Date.now() - started,
      businessName: cfg?.businessName ?? null,
      agentName: cfg?.agentName ?? null,
      knowledgeBaseChars: typeof cfg?.knowledgeBase === 'string' ? cfg.knowledgeBase.length : 0,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, hit: target, error: e?.name === 'TimeoutError' ? 'timeout' : e?.message },
      { status: 502 },
    );
  }
}

export async function POST(req: Request) {
  if (!BOT_API_URL) {
    return NextResponse.json(
      { ok: false, error: 'BOT_API_URL is not configured (API key / env missing)' },
      { status: 500 },
    );
  }

  try {
    const { messages, visitorId, agent } = await req.json();

    // Only trust the agent id; look the name up on the server from the whitelist.
    const assigned = getAgentById(agent?.id);

    // The newest user message is the one to send.
    const lastUser = Array.isArray(messages)
      ? [...messages].reverse().find((m: any) => m?.role === 'user')
      : null;
    const rawText = String(lastUser?.content ?? '').trim();
    if (!rawText) {
      return NextResponse.json({ ok: false, error: 'Empty message' }, { status: 400 });
    }
    const message = (CHIP_MAP[rawText] ?? rawText).slice(0, 2000);

    // Make the model introduce itself with the assigned agent's name.
    let config: Record<string, unknown> | undefined;
    if (assigned) {
      const base = await getBotConfig();
      if (base) config = { ...base, agentName: assigned.name };
    }

    const target = `${BOT_API_URL}/api/chat`;
    const started = Date.now();
    console.log(`[api/chat] -> POST ${target}`);

    const res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({
        sessionId: toSessionId(visitorId),
        message,
        ...(config ? { config } : {}),
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const data = await res.json().catch(() => null);
    const ms = Date.now() - started;
    console.log(
      `[api/chat] <- ${res.status} from ${target} in ${ms}ms` +
        (data?.isMockMode ? ' (WARNING: Space is in mock mode, GEMINI_API_KEY missing)' : ''),
    );
    if (!res.ok || !data) {
      throw new Error(data?.error || `Bot backend returned ${res.status}`);
    }

    let reply = String(data.reply ?? '').trim();
    if (!reply) throw new Error('empty reply');

    // Safety net in case the model still uses its default persona name.
    if (assigned) reply = personalize(reply, assigned);

    // Reply bhejne se pehle 10 second wait.
    // Agar total time kam se kam 10s chahiye (backend ka time minus karke), to
    // is line ko is se badal dein:  await sleep(Math.max(0, REPLY_DELAY_MS - ms));
    await sleep(REPLY_DELAY_MS);

    return NextResponse.json(
      {
        ok: true,
        reply,
        agent: assigned?.id ?? null,
        leadCaptured: Boolean(data.leadCaptured),
        // Debug info: proves which backend answered
        source: {
          backend: BOT_API_URL,
          status: res.status,
          latencyMs: ms,
          delayMs: REPLY_DELAY_MS,
          mockMode: Boolean(data.isMockMode),
          replySource: data.analysis?.source ?? null,
        },
      },
      { headers: { 'x-bot-backend': BOT_API_URL, 'x-bot-latency-ms': String(ms) } },
    );
  } catch (e: any) {
    const msg =
      e?.name === 'TimeoutError' ? 'Bot backend timed out (Space may be waking up)' : e?.message;
    console.error('[api/chat]', msg);
    return NextResponse.json({ ok: false, error: msg || 'Unknown error' }, { status: 502 });
  }
}