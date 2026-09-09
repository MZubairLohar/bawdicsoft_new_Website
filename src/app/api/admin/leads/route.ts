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
import { NextResponse } from 'next/server';

// 🔥 Mock Data (Database ki jagah ye return hoga)
let mockLeads = [
  {
    _id: '3',
    name: 'Pakistan Telecommuication company limited',
    email: 'info@ptcl.com.pk',
    phone: '1234567890',
    service: 'AI Services',
    message: 'Auto-captured from Company Tracker',
    source: 'Company Tracker',
    status: 'New',
    createdAt: new Date().toISOString(),
  },


  {
    _id: '1',
    name: 'SAFIUILAH ARAIN',
    email: 'safiarain273@gmail.com',
    phone: '',
    service: 'Book My Free Call',
    message: 'Auto-captured from Company Tracker',
    source: 'Company Tracker',
    status: 'New',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Thjbp Pkoiecat',
    email: 'test@example.com',
    phone: '8620814503',
    service: 'RpfzSZYyNbdwsLmEywcPGTo',
    message: 'VdTnhXRcMaKCRwLDgf',
    source: 'Contact Form',
    status: 'New',
    createdAt: new Date().toISOString(),
  },
];

// GET: Sare leads return karo (Mock)
export async function GET() {
  try {
    return NextResponse.json({ success: true, data: mockLeads }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Nayi lead "Generate" karo (Mock - memory mein save)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newLead = {
      _id: `mock_${Date.now()}`,
      name: body.name,
      email: body.email || '',
      phone: body.phone || '',
      service: body.service || '',
      message: body.message || 'Auto-captured from Company Tracker',
      source: body.source || 'Company Tracker',
      status: body.status || 'New',
      createdAt: new Date().toISOString(),
    };

    // Mock array mein add karo (taake list refresh par dikhe)
    mockLeads.unshift(newLead);

    console.log('📝 Mock Lead Generated:', newLead);

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Status update karo (Mock)
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // leadId extract karo
    const body = await request.json();

    const leadIndex = mockLeads.findIndex((lead) => lead._id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    mockLeads[leadIndex].status = body.status;

    return NextResponse.json({ success: true, data: mockLeads[leadIndex] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}