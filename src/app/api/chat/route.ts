


import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export const maxDuration = 30;

const KNOWN_PAGES = ['/services', '/portfolio', '/casestudies', '/about-us',
  '/contact-us', '/careers', '/blogs', '/deep-trace', '/cybercity', '/hashfor'];

// Your quick-reply buttons -> phrases the model understands
const CHIP_MAP: Record<string, string> = {
  // '💼 Get a Free Quote': 'how much does it cost',
  '🤖 AI Solutions': 'tell me about ai chatbots',
  '⛓️ Blockchain Development': 'tell me about smart contracts',
  '📞 Book a Strategy Call': 'can i book a call',
};

function normalizePage(p: string) {
  if (!p || p === '/') return '/';
  return KNOWN_PAGES.find((k) => p.startsWith(k)) ?? '/';
}

export async function POST(req: Request) {
  try {
    const { messages, page } = await req.json();

    const cleaned = messages.map((m: any) => ({
      role: m.role,
      content: CHIP_MAP[m.content] ?? m.content,
    }));

    const client = await Client.connect(process.env.HF_SPACE!);
    const result = await client.predict('/chat', [
      'unknown',
      '',
      '',
      normalizePage(page),
      JSON.stringify(cleaned),
    ]);

    const reply = String((result.data as any[])[0] ?? '').trim();
    if (!reply) throw new Error('empty reply');

    return NextResponse.json({ ok: true, reply });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}