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

// ✅ GET Function - Admin Panel mein companies fetch karne ke liye
export async function GET(req) {
  try {
    await connectDB();

    // 🔥 Aggregation: Companies ke hisaab se data group karo
    const companies = await Visitor.aggregate([
      {
        $group: {
          _id: "$company", // Company ke naam par group karo
          company: { $first: "$company" },
          count: { $sum: 1 }, // Total visits
          lastVisit: { $max: "$createdAt" }, // Last visit ka time
          pages: { $addToSet: "$page" }, // Unique pages
          locations: { $addToSet: { $concat: ["$city", ", ", "$country"] } } // Location
        }
      },
      { $sort: { lastVisit: -1 } } // Latest visit wali company upar
    ]);

    // Frontend ke interface ke mutabiq data format karo
    const formattedData = companies.map(c => ({
      _id: c._id || "Unknown",
      count: c.count,
      totalVisits: c.count,
      lastVisit: c.lastVisit || new Date().toISOString(),
      pages: c.pages || [],
      locations: c.locations || [],
      sessions: []
    }));

    console.log("🔥 GET - Companies found:", formattedData.length);
    return NextResponse.json({ success: true, data: formattedData });

  } catch (error) {
    console.error('❌ Track GET Error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// ✅ POST Function - Visitor ko database mein save karne ke liye
export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

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

// import { connectDB } from '@/lib/dbConnect';
// import Visitor from '@/models/Visitor';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     // 🔥 Database connect karo
//     await connectDB();

//     // 🔥 Visitor save karo
//     const newVisit = new Visitor({
//       ip: body.ip,
//       company: body.company || 'Unknown',
//       city: body.city,
//       country: body.country,
//       device: body.device,
//       sessionId: body.sessionId,
//       page: body.page,
//       referrer: body.referrer,
//     });
//     await newVisit.save();

//     console.log('✅ Visitor saved to DB:', body.company);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('❌ Track DB Error:', error);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }