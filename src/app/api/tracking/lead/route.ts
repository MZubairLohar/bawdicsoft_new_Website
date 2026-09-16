// src/app/api/tracking/lead/route.ts
// Main orchestration: capture lead → MongoDB + Airtable + WhatsApp + Mailchimp

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect'; // ✅ Named import
import Lead from '@/models/lead';
import { saveLeadToAirtable } from '@/lib/integrations/airtable';
import { notifyBilalOnWhatsApp } from '@/lib/integrations/whatsapp';
import { addLeadToMailchimp } from '@/lib/integrations/mailchimp';

export const runtime = 'nodejs';

type LeadRequestBody = {
  name?: string;
  email: string;
  wantsToBuild?: string;
  page?: string;
  intentScore?: number;
  intentLabel?: 'Hot' | 'Warm' | 'Cold';
  source?: string;
  visitorId?: string;
};

function deriveIntentLabel(score: number | undefined): 'Hot' | 'Warm' | 'Cold' | null {
  if (typeof score !== 'number') return null;
  if (score >= 7) return 'Hot';
  if (score >= 4) return 'Warm';
  return 'Cold';
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadRequestBody;

    if (!body?.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'email is required' },
        { status: 400 }
      );
    }

    const lead = {
      name: (body.name || 'Website Visitor').trim(),
      email: body.email.trim().toLowerCase(),
      wantsToBuild: (body.wantsToBuild || 'Not specified').trim(),
      page: body.page || '/',
      intentScore: typeof body.intentScore === 'number' ? body.intentScore : null,
      intentLabel: body.intentLabel || deriveIntentLabel(body.intentScore) || null,
      source: body.source || 'direct',
      visitorId: body.visitorId || null,
      timestamp: new Date().toISOString(),
    };

    // 1. Save to MongoDB
    let mongoResult: { ok: boolean; id?: string; error?: string } = { ok: false };
    try {
      await connectDB(); // ✅ Naam badla
      const doc = await Lead.create({
        name: lead.name,
        email: lead.email,
        service: 'AI Agent Capture',
        message: `Wants to build: ${lead.wantsToBuild}`,
        source: lead.source,
        status: 'New',
        intentScore: lead.intentScore,
        intentLabel: lead.intentLabel,
        pageCapturedFrom: lead.page,
        wantsToBuild: lead.wantsToBuild,
        visitorId: lead.visitorId,
      });
      mongoResult = { ok: true, id: String(doc._id) };
      console.log('[lead] Saved to MongoDB:', doc._id);
    } catch (err) {
      console.error('[lead] MongoDB save failed:', err);
      mongoResult = { ok: false, error: 'MongoDB save failed' };
    }

    // 2. Fire Airtable + WhatsApp + Mailchimp in parallel
   const [airtableRes, whatsappRes, mailchimpRes] = await Promise.all([
  saveLeadToAirtable({
    ...lead,
    intentScore: lead.intentScore ?? 0, // ✅ null → 0
  }),
  notifyBilalOnWhatsApp({
    ...lead,
    intentScore: lead.intentScore ?? 0, // ✅ null → 0
  }),
  addLeadToMailchimp({ email: lead.email, name: lead.name }),
]);

    if (!airtableRes.ok) console.warn('[lead] Airtable failed:', airtableRes.error);
    if (!whatsappRes.ok) console.warn('[lead] WhatsApp failed:', whatsappRes.error);
    if (!mailchimpRes.ok) console.warn('[lead] Mailchimp failed:', mailchimpRes.error);

    return NextResponse.json({
      ok: true,
      mongo: mongoResult,
      airtable: airtableRes,
      whatsapp: whatsappRes,
      mailchimp: mailchimpRes,
    });
  } catch (err) {
    console.error('[api/tracking/lead] Error:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}