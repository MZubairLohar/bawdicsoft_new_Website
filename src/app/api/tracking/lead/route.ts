// src/app/api/tracking/lead/route.ts
// Lead capture: Airtable + Gmail (nodemailer) emails

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || '';
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Leads';

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const SALES_EMAIL = process.env.SALES_EMAIL || EMAIL_USER;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

type LeadBody = {
  visitorId: string;
  email: string;
  name?: string;
  interest?: string;
  ip?: string;
  page?: string;
  source?: string;
  createdAt?: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadBody;

    if (!body?.email || !body?.visitorId) {
      return NextResponse.json(
        { ok: false, error: 'email and visitorId required' },
        { status: 400 }
      );
    }

    const record = {
      Name: body.name || '',
      Email: body.email,
      IP: body.ip || '',
      Interest: body.interest || '',
      Page: body.page || '',
      VisitorID: body.visitorId,
      CreatedAt: new Date().toISOString(),
    };

    // 1. Airtable
    let airtableOk = false;
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      try {
        const atRes = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fields: record }),
          }
        );
        airtableOk = atRes.ok;
        if (atRes.ok) console.log(`[AIRTABLE] Saved: ${body.email}`);
        else console.error(`[AIRTABLE FAILED] ${atRes.status}`);
      } catch (err) {
        console.error('[AIRTABLE ERROR]', err);
      }
    }

    // 2. Email to visitor
    let emailOk = false;
    if (EMAIL_USER && EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"BawdicSoft" <${EMAIL_USER}>`,
          to: body.email,
          subject: 'Thanks for reaching out to BawdicSoft',
          html: `
            <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1E3A5F;">Hi ${body.name || 'there'},</h2>
              <p>Thanks for getting in touch with BawdicSoft. We received your inquiry${
                body.interest ? ` about <strong>${body.interest}</strong>` : ''
              }.</p>
              <p>Our team lead <strong>IMRAN KHAN</strong> will reach out within the next 24 hours.</p>
              <p>In the meantime, check our portfolio: <a href="https://www.bawdicsoft.com/portfolio">bawdicsoft.com/portfolio</a></p>
              <br>
              <p>Best regards,<br><strong>BawdicSoft Team</strong></p>
            </div>
          `,
        });
        emailOk = true;
        console.log(`[EMAIL SENT] ${body.email}`);
      } catch (err) {
        console.error('[EMAIL ERROR]', err);
      }
    }

    // 3. Internal email to Bilal
    if (EMAIL_USER && EMAIL_PASS && SALES_EMAIL) {
      try {
        await transporter.sendMail({
          from: `"BawdicSoft Bot" <${EMAIL_USER}>`,
          to: SALES_EMAIL,
          subject: `New Lead: ${body.name || body.email}`,
          html: `
            <h3 style="color: #1E3A5F;">New Lead Captured</h3>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.name || '-'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Interest</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.interest || '-'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>IP</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.ip || '-'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Page</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.page || '-'}</td></tr>
            </table>
          `,
        });
        console.log(`[INTERNAL EMAIL] Sent`);
      } catch (err) {
        console.error('[INTERNAL EMAIL ERROR]', err);
      }
    }

    return NextResponse.json({
      ok: true,
      saved: { airtable: airtableOk, email: emailOk },
    });
  } catch (err: any) {
    console.error('[lead/route] Error:', err);
    return NextResponse.json(
      { ok: false, error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}