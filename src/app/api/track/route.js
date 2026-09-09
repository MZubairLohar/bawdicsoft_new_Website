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
import { NextResponse } from 'next/server';

// 🔥 In-memory database (server restart par reset ho jayega)
let mockVisitors = [];

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('📥 Visitor Data Received:', body);

    // Mock visitor entry
    const newVisit = {
      _id: 'visit_' + Date.now(),
      ip: body.ip,
      company: body.company || 'Unknown',
      city: body.city || 'Unknown',
      country: body.country || 'Unknown',
      device: body.device || 'Unknown',
      sessionId: body.sessionId || 'unknown_session',
      page: body.page || '/',
      referrer: body.referrer || 'Direct',
      visitedAt: new Date().toISOString(),
    };

    // Memory mein save karo
    mockVisitors.unshift(newVisit);
    console.log('✅ Visitor saved. Total visitors:', mockVisitors.length);

    return NextResponse.json({ success: true, data: newVisit });
  } catch (error) {
    console.error('❌ Track error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET: Sare visitors return karo (Company Tracker ke liye)
export async function GET() {
  try {
    // Agar koi visitor nahi hai toh mock companies bhejo (taake khaali na lage)
    if (mockVisitors.length === 0) {
      const mockData = [
        {
          _id: 'Acme Corp',
          count: 3,
          pages: ['/ai', '/blockchain'],
          lastVisit: new Date().toISOString(),
          locations: ['New York, US'],
          sessions: ['sess_1'],
          totalVisits: 3,
        },
        {
          _id: 'TechStart Inc',
          count: 1,
          pages: ['/web'],
          lastVisit: new Date(Date.now() - 3600000).toISOString(),
          locations: ['London, UK'],
          sessions: ['sess_2'],
          totalVisits: 1,
        },
      ];
      return NextResponse.json({ success: true, data: mockData });
    }

    // Real visitors ko group karo
    const grouped = mockVisitors.reduce((acc, visit) => {
      const company = visit.company || 'Unknown';
      if (!acc[company]) {
        acc[company] = {
          _id: company,
          count: 1,
          pages: [visit.page],
          lastVisit: visit.visitedAt,
          locations: [`${visit.city}, ${visit.country}`],
          sessions: [visit.sessionId],
          totalVisits: 1,
        };
      } else {
        acc[company].count += 1;
        if (!acc[company].pages.includes(visit.page)) {
          acc[company].pages.push(visit.page);
        }
        if (!acc[company].locations.includes(`${visit.city}, ${visit.country}`)) {
          acc[company].locations.push(`${visit.city}, ${visit.country}`);
        }
        if (!acc[company].sessions.includes(visit.sessionId)) {
          acc[company].sessions.push(visit.sessionId);
        }
        acc[company].totalVisits = acc[company].sessions.length;
        acc[company].lastVisit = visit.visitedAt; // latest
      }
      return acc;
    }, {});

    const companies = Object.values(grouped);
    return NextResponse.json({ success: true, data: companies });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}