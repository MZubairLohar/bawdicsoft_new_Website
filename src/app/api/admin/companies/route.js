// src/app/api/admin/companies/route.js
import { NextResponse } from 'next/server';

// 🔥 Mock Companies Data (Dashboard Company Tracker mein dikhega)
let mockCompanies = [
  {
    _id: 'Acme Corp',
    count: 12,
    pages: ['/ai', '/blockchain', '/contact'],
    lastVisit: new Date().toISOString(),
    locations: ['New York, US'],
    sessions: ['sess_1', 'sess_2'],
    totalVisits: 3,
  },
  {
    _id: 'TechStart Inc',
    count: 5,
    pages: ['/web', '/about-us'],
    lastVisit: new Date(Date.now() - 3600000).toISOString(),
    locations: ['London, UK'],
    sessions: ['sess_3'],
    totalVisits: 1,
  },
  {
    _id: 'DataFlow Systems',
    count: 8,
    pages: ['/ai', '/casestudies'],
    lastVisit: new Date(Date.now() - 86400000).toISOString(),
    locations: ['Dubai, UAE'],
    sessions: ['sess_4', 'sess_5'],
    totalVisits: 2,
  },
];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: mockCompanies }, { status: 200 });
  } catch (error) {
    console.error('Companies API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}