// import { connectDB } from '@/lib/dbConnect';
// import Visitor from '@/models/Visitor';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     await new Visitor(body).save();
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }

// src/app/api/track/route.js
// src/app/api/track/route.js
import { connectDB } from '@/lib/dbConnect';
import Visitor from '@/models/Visitor';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    // 🔥 Database connect karo
    await connectDB();

    // 🔥 Visitor save karo
    const newVisit = new Visitor({
      ip: body.ip,
      company: body.company || 'Unknown',
      city: body.city,
      country: body.country,
      device: body.device,
      sessionId: body.sessionId,
      page: body.page,
      referrer: body.referrer,
    });
    await newVisit.save();

    console.log('✅ Visitor saved to DB:', body.company);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Track DB Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}