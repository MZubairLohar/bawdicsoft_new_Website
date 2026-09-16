// src/app/api/chat/route.ts
// POST /api/chat — BawdicSoft fine-tuned model on Render backend

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
      return NextResponse.json(
        { ok: false, error: 'messages array is required' },
        { status: 400 }
      );
    }

    // Last user message nikaalo
    const lastUserMsg = [...body.messages]
      .reverse()
      .find((m) => m.role === 'user' && m.content?.trim());

    if (!lastUserMsg) {
      return NextResponse.json(
        { ok: false, error: 'No valid user message' },
        { status: 400 }
      );
    }

    // Backend ko bhejo
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
      return NextResponse.json(
        { ok: false, error: `Backend error: ${resp.status}` },
        { status: resp.status }
      );
    }

    const data = await resp.json();

    // Frontend ko wahi format mein wapas bhejo
    return NextResponse.json({
      ok: true,
      reply: data.reply,
      lead: data.lead || {},
      user_type: data.user_type || 'unknown',
    });
  } catch (err: any) {
    console.error('[api/chat] Error:', err);
    return NextResponse.json(
      { ok: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
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