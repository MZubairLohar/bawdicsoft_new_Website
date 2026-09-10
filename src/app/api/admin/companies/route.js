// src/app/api/admin/companies/route.js
import { connectDB } from '@/lib/dbConnect';
import Visitor from '@/models/Visitor';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const companies = await Visitor.aggregate([
      { $match: { visitedAt: { $gte: sevenDaysAgo }, company: { $ne: 'Unknown' } } },
      {
        $group: {
          _id: '$company',
          count: { $sum: 1 },
          pages: { $addToSet: '$page' },
          lastVisit: { $max: '$visitedAt' },
          locations: { $addToSet: '$city' },
          sessions: { $addToSet: '$sessionId' },
        },
      },
      {
        $addFields: {
          totalVisits: { $size: '$sessions' },
        },
      },
      { $sort: { lastVisit: -1 } },
      { $limit: 20 },
    ]);

    return NextResponse.json({ success: true, data: companies });
  } catch (error) {
    console.error('❌ Companies fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}