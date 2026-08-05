import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Lead from '@/models/lead';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);
  return payload;
}

export async function GET() {
  try {
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newLead = await Lead.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      source: body.source || 'Contact Form',
      status: body.status || 'New',
    });

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}