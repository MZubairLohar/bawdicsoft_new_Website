// // src/app/api/admin/leads/route.ts
// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/db';
// import Lead from '@/models/lead';
// import { verifySessionToken } from '@/lib/auth';
// import { cookies } from 'next/headers';

// async function checkAuth() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('session')?.value;
//   if (!token) return null;
//   try {
//     const payload = verifySessionToken(token);
//     return payload;
//   } catch {
//     return null;
//   }
// }

// export async function GET() {
//   try {
//     const user = await checkAuth();
//     if (!user) {
//       return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
//     }
//     await connectToDatabase();
//     const leads = await Lead.find({}).sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, data: leads }, { status: 200 });
//   } catch (error: any) {
//     console.error('Error fetching leads:', error);
//     return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     await connectToDatabase();
//     const body = await request.json();

//     const newLead = await Lead.create({
//       name: body.name,
//       email: body.email || '',
//       phone: body.phone || '',
//       service: body.service || '',
//       message: body.message || 'Auto-captured from Company Tracker',
//       source: body.source || 'Company Tracker',
//       status: body.status || 'New',
//     });

//     return NextResponse.json({ success: true, data: newLead }, { status: 201 });
//   } catch (error: any) {
//     console.error('Error creating lead:', error);
//     return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
//   }
// }

// src/app/api/admin/leads/route.ts
// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/db';
// import Lead from '@/models/lead';

// // 🔥 TEMPORARY: Auth completely hatao (sirf testing ke liye)
// export async function GET() {
//   try {
//     await connectToDatabase();
//     const leads = await Lead.find({}).sort({ createdAt: -1 });
//     console.log('📤 Sending leads to frontend:', leads.length); // Debug
//     return NextResponse.json({ success: true, data: leads }, { status: 200 });
//   } catch (error: any) {
//     console.error('Error fetching leads:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     await connectToDatabase();
//     const body = await request.json();

//     const newLead = await Lead.create({
//       name: body.name,
//       email: body.email || '',
//       phone: body.phone || '',
//       service: body.service || '',
//       message: body.message || 'Auto-captured from Company Tracker',
//       source: body.source || 'Company Tracker',
//       status: body.status || 'New',
//     });

//     return NextResponse.json({ success: true, data: newLead }, { status: 201 });
//   } catch (error: any) {
//     console.error('Error creating lead:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// src/app/api/admin/leads/route.ts

// src/app/api/admin/leads/route.js
import { connectDB } from '@/lib/dbConnect';
import Lead from '@/models/lead';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('❌ Leads fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const newLead = new Lead({
      name: body.name,
      email: body.email || '',
      source: body.source || 'Admin',
      status: 'New',
      message: body.message || '',
    });
    await newLead.save();
    return NextResponse.json({ success: true, data: newLead });
  } catch (error) {
    console.error('❌ Lead create error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}