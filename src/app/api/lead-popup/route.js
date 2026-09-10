// src/app/api/lead-popup/route.js
import { connectDB } from '@/lib/dbConnect';
import Lead from '@/models/Lead';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, name, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 🔥 Database connect karo
    await connectDB();

    // 🔥 Lead save karo
    const newLead = new Lead({
      name: name || 'Popup Visitor',
      email: email,
      source: source || 'Exit-Intent Popup',
      status: 'New',
      message: 'Captured via Exit-Intent Popup.',
    });
    await newLead.save();

    console.log('✅ Popup Lead Saved to DB:', email);
    return NextResponse.json({ success: true, data: newLead });
  } catch (error) {
    console.error('❌ Popup DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}