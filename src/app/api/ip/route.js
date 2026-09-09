// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     // Use HTTP (not HTTPS) to avoid ip-api.com SSL restriction
//     const res = await fetch('http://ip-api.com/json/');
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch IP data' }, { status: 500 });
//   }
// }

// src/app/api/ip/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // HTTP (not HTTPS) – ip-api.com free tier doesn't support SSL
    const res = await fetch('http://ip-api.com/json/');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('IP API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch IP data' },
      { status: 500 }
    );
  }
}