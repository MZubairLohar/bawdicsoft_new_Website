// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const BACKEND_URL = 'https://bawdicsoft-agent.onrender.com';

type ChatRequestBody = {
  messages: { role: 'user' | 'assistant'; content: string }[];
  visitorId?: string;
  intentScore?: number;
  page?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;

    if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ ok: false, error: 'messages required' }, { status: 400 });
    }

    const lastUserMsg = [...body.messages]
      .reverse()
      .find((m) => m.role === 'user' && m.content?.trim());

    if (!lastUserMsg) {
      return NextResponse.json({ ok: false, error: 'No user message' }, { status: 400 });
    }

    // Render backend se reply lo
    const resp = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: body.visitorId || 'default',
        message: lastUserMsg.content.trim(),
        page: body.page || '/',
      }),
    });

    if (!resp.ok) {
      return NextResponse.json({ ok: false, error: `Backend: ${resp.status}` }, { status: resp.status });
    }

    const data = await resp.json();

    // ─── LEAD FORWARD (AWAIT KARO — warna Vercel kill kar dega) ───
    const lead = data.lead || {};
    if (lead.email && lead.name) {
      const origin = new URL(req.url).origin;
      try {
        await fetch(`${origin}/api/tracking/lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId: body.visitorId || 'default',
            email: lead.email,
            name: lead.name,
            interest: lead.project || '',
            page: body.page || '/',
            source: 'chat-widget',
          }),
        });
        console.log('[lead forward] OK');
      } catch (err) {
        console.error('[lead forward]', err);
      }
    }

    return NextResponse.json({
      ok: true,
      reply: data.reply,
      lead: data.lead || {},
      user_type: data.user_type || 'unknown',
    });
  } catch (err: any) {
    console.error('[api/chat] Error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}




// // src/app/api/chat/route.ts
// // POST /api/chat — accepts conversation history, returns Claude's next reply.

// import { NextResponse } from 'next/server';
// import { getClaudeReply, ClaudeMessage } from '@/lib/ai/claude';

// export const runtime = 'nodejs'; // Claude API needs Node runtime (not Edge)

// type ChatRequestBody = {
//   messages: ClaudeMessage[];
//   visitorId?: string;
//   intentScore?: number;
//   page?: string;
// };

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as ChatRequestBody;

//     if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
//       return NextResponse.json(
//         { ok: false, error: 'messages array is required' },
//         { status: 400 }
//       );
//     }

//     // Basic shape validation
//     const sanitized: ClaudeMessage[] = body.messages
//       .filter(
//         (m) =>
//           m &&
//           (m.role === 'user' || m.role === 'assistant') &&
//           typeof m.content === 'string' &&
//           m.content.trim().length > 0
//       )
//       .map((m) => ({ role: m.role, content: m.content.trim() }));

//     if (!sanitized.length) {
//       return NextResponse.json(
//         { ok: false, error: 'No valid messages in history' },
//         { status: 400 }
//       );
//     }

//     // Optional: log context for later use (intent score, page)
//     // Ye later Airtable/analytics mein bhi use ho sakta hai
//     if (body.visitorId) {
//       console.log(
//         `[chat] visitor=${body.visitorId} page=${body.page ?? '-'} intent=${body.intentScore ?? '-'}`
//       );
//     }

//     const result = await getClaudeReply(sanitized);

//     if (!result.ok) {
//       return NextResponse.json(
//         { ok: false, error: result.error },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ ok: true, reply: result.reply });
//   } catch (err) {
//     console.error('[api/chat] Error:', err);
//     return NextResponse.json(
//       { ok: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }