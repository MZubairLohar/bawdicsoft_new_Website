// // src/app/api/chat/route.ts
// import { NextResponse } from 'next/server';

// export const runtime = 'nodejs';

// const BACKEND_URL = 'https://syedabdulmoizshah-bawdicsoft-agent.hf.space';

// type ChatRequestBody = {
//   messages: { role: 'user' | 'assistant'; content: string }[];
//   visitorId?: string;
//   intentScore?: number;
//   page?: string;
// };

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as ChatRequestBody;

//     if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
//       return NextResponse.json({ ok: false, error: 'messages required' }, { status: 400 });
//     }

//     const lastUserMsg = [...body.messages]
//       .reverse()
//       .find((m) => m.role === 'user' && m.content?.trim());

//     if (!lastUserMsg) {
//       return NextResponse.json({ ok: false, error: 'No user message' }, { status: 400 });
//     }

//     // ─── Step 1: Trigger the API call → get event_id ───
//     const callResp = await fetch(`${BACKEND_URL}/gradio_api/call/chat`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         data: [
//           body.visitorId || 'default',
//           lastUserMsg.content.trim(),
//           body.page || '/',
//         ],
//       }),
//     });

//     if (!callResp.ok) {
//       const errText = await callResp.text();
//       console.error('[HF call] failed:', callResp.status, errText);
//       return NextResponse.json(
//         { ok: false, error: `HF call: ${callResp.status} ${errText.slice(0, 100)}` },
//         { status: callResp.status }
//       );
//     }

//     const callData = await callResp.json();
//     const eventId = callData.event_id;
//     console.log('[HF call] event_id:', eventId);

//     if (!eventId) {
//       return NextResponse.json({ ok: false, error: 'No event_id returned' }, { status: 500 });
//     }

//     // ─── Step 2: Fetch the result via SSE ───
//     const resultResp = await fetch(
//       `${BACKEND_URL}/gradio_api/call/chat/${eventId}`,
//       { method: 'GET' }
//     );

//     if (!resultResp.ok) {
//       return NextResponse.json(
//         { ok: false, error: `HF result: ${resultResp.status}` },
//         { status: resultResp.status }
//       );
//     }

//     const sseText = await resultResp.text();
//     console.log('[HF SSE raw]:', sseText.slice(0, 500));

//     // ─── Parse SSE: lines like "event: complete\ndata: [...]" ───
//     let replyArr: any[] = [];
//     const lines = sseText.split('\n');
//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();
//       if (line.startsWith('data:')) {
//         const jsonStr = line.slice(5).trim();
//         if (jsonStr && jsonStr !== '[DONE]') {
//           try {
//             const parsed = JSON.parse(jsonStr);
//             // Gradio sends final data as an array of returns
//             if (Array.isArray(parsed)) {
//               replyArr = parsed;
//             }
//           } catch {
//             // ignore partial chunks
//           }
//         }
//       }
//     }

//     const reply = replyArr[0] || 'Sorry, no reply.';
//     const userType = replyArr[1] || 'unknown';
//     let lead: any = {};
//     try {
//       lead = replyArr[2] ? JSON.parse(replyArr[2]) : {};
//     } catch {
//       lead = {};
//     }

//     console.log('[chat] reply:', reply, '| user_type:', userType, '| lead:', lead);

//     // ─── Lead Forward ───
//     if (lead.email && lead.name) {
//       const origin = new URL(req.url).origin;
//       try {
//         const leadResp = await fetch(`${origin}/api/tracking/lead`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             visitorId: body.visitorId || 'default',
//             email: lead.email,
//             name: lead.name,
//             interest: lead.project || '',
//             page: body.page || '/',
//             source: 'chat-widget',
//           }),
//         });
//         const leadData = await leadResp.json();
//         console.log('[lead forward] status:', leadResp.status, 'body:', leadData);
//       } catch (err) {
//         console.error('[lead forward error]', err);
//       }
//     }

//     return NextResponse.json({
//       ok: true,
//       reply,
//       lead,
//       user_type: userType,
//     });
//   } catch (err: any) {
//     console.error('[api/chat] Error:', err);
//     return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
//   }
// }










// // // src/app/api/chat/route.ts
// // import { NextResponse } from 'next/server';

// // export const runtime = 'nodejs';

// // const BACKEND_URL = 'https://bawdicsoft-agent.onrender.com';

// // type ChatRequestBody = {
// //   messages: { role: 'user' | 'assistant'; content: string }[];
// //   visitorId?: string;
// //   intentScore?: number;
// //   page?: string;
// // };

// // export async function POST(req: Request) {
// //   try {
// //     const body = (await req.json()) as ChatRequestBody;

// //     if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
// //       return NextResponse.json({ ok: false, error: 'messages required' }, { status: 400 });
// //     }

// //     const lastUserMsg = [...body.messages]
// //       .reverse()
// //       .find((m) => m.role === 'user' && m.content?.trim());

// //     if (!lastUserMsg) {
// //       return NextResponse.json({ ok: false, error: 'No user message' }, { status: 400 });
// //     }

// //     const resp = await fetch(`${BACKEND_URL}/chat`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({
// //         session_id: body.visitorId || 'default',
// //         message: lastUserMsg.content.trim(),
// //         page: body.page || '/',
// //       }),
// //     });

// //     if (!resp.ok) {
// //       return NextResponse.json({ ok: false, error: `Backend: ${resp.status}` }, { status: resp.status });
// //     }

// //     const data = await resp.json();
// //     console.log('[lead check]', data.lead, 'origin:', new URL(req.url).origin);

// //     // ─── LEAD FORWARD ───
// //     const lead = data.lead || {};
// //     if (lead.email && lead.name) {
// //       const origin = new URL(req.url).origin;
// //       try {
// //         const leadResp = await fetch(`${origin}/api/tracking/lead`, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             visitorId: body.visitorId || 'default',
// //             email: lead.email,
// //             name: lead.name,
// //             interest: lead.project || '',
// //             page: body.page || '/',
// //             source: 'chat-widget',
// //           }),
// //         });
// //         const leadData = await leadResp.json();
// //         console.log('[lead forward] status:', leadResp.status, 'body:', leadData);
// //       } catch (err) {
// //         console.error('[lead forward error]', err);
// //       }
// //     }

// //     return NextResponse.json({
// //       ok: true,
// //       reply: data.reply,
// //       lead: data.lead || {},
// //       user_type: data.user_type || 'unknown',
// //     });
// //   } catch (err: any) {
// //     console.error('[api/chat] Error:', err);
// //     return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
// //   }
// // }


import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export const maxDuration = 30;

const KNOWN_PAGES = ['/services', '/portfolio', '/casestudies', '/about-us',
  '/contact-us', '/careers', '/blogs', '/deep-trace', '/cybercity', '/hashfor'];

// Your quick-reply buttons -> phrases the model understands
const CHIP_MAP: Record<string, string> = {
  '💼 Get a Free Quote': 'how much does it cost',
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