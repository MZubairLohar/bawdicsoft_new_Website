import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import SiteVisit from '@/models/siteVisit';
import Interaction from '@/models/interaction';
import { cookies } from 'next/headers';

// Note: This route is intentionally public (no auth) so that public site
// visitors can be tracked. We record only aggregate/anonymized location data
// (country/city/region) and DO NOT store the visitor's IP address.

const GEO_API = 'https://ipapi.co/json/';

async function resolveLocation(): Promise<{ country: string; city: string; region: string }> {
  try {
    // ipapi.co uses the requesting IP implicitly. Optionally pass /{ip}/json from a forwarded header.
    const res = await fetch(GEO_API, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('geo failed');
    const data = await res.json();
    return {
      country: data?.country_name || 'Unknown',
      city: data?.city || 'Unknown',
      region: data?.region || 'Unknown',
    };
  } catch {
    return { country: 'Unknown', city: 'Unknown', region: 'Unknown' };
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const type = body?.type || 'visit'; // 'visit' | 'interaction'
    const label = body?.label || 'unknown';
    const path = body?.path || '/';

    const cookieStore = await cookies();
    let sessionId = cookieStore.get('bds_visitor')?.value;

    // Generate a session identifier if not present (used for deduping visits).
    if (!sessionId) {
      sessionId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }

    if (type === 'visit') {
      // Only record a page-open once per session (cookie present => already counted).
      const alreadyCounted = cookieStore.get('bds_visit_counted')?.value === '1';
      if (!alreadyCounted) {
        const geo = await resolveLocation();
        await SiteVisit.create({
          country: geo.country,
          city: geo.city,
          region: geo.region,
          path: path || '/',
          sessionId,
        });
      }
    } else if (type === 'interaction') {
      await Interaction.create({
        type: label || 'click',
        label,
        sessionId,
      });
    }

    // Set/refresh cookies on the response.
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set('bds_visitor', sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      httpOnly: false,
    });
    response.cookies.set('bds_visit_counted', '1', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      httpOnly: false,
    });

    return response;
  } catch (error: any) {
    console.error('Tracking error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
