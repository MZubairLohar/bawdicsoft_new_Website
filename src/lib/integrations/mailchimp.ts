// src/lib/integrations/mailchimp.ts
// Adds lead to Mailchimp audience and tags them (Dev Brief, Page 7)

import crypto from 'crypto';

export type MailchimpLead = {
  email: string;
  name: string;
};

export type MailchimpResult = {
  ok: boolean;
  error?: string;
};

function md5(input: string): string {
  return crypto.createHash('md5').update(input.toLowerCase()).digest('hex');
}

export async function addLeadToMailchimp(
  lead: MailchimpLead
): Promise<MailchimpResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return {
      ok: false,
      error: 'Mailchimp credentials missing (MAILCHIMP_API_KEY / MAILCHIMP_AUDIENCE_ID)',
    };
  }

  // Mailchimp key format: xxxxxxxx-usXX  → datacenter = "usXX"
  const dc = apiKey.split('-')[1];
  if (!dc) {
    return { ok: false, error: 'Invalid MAILCHIMP_API_KEY format' };
  }

  const subscriberHash = md5(lead.email);
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

  const [firstName, ...rest] = lead.name.split(' ');
  const lastName = rest.join(' ');

  try {
    const res = await fetch(url, {
      method: 'PUT', // upsert — same email twice won't error
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: lead.email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
        },
        tags: ['website-agent-capture'],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[Mailchimp] Failed:', res.status, text);
      return { ok: false, error: `Mailchimp error (${res.status})` };
    }

    return { ok: true };
  } catch (err) {
    console.error('[Mailchimp] Fetch failed:', err);
    return { ok: false, error: 'Mailchimp network error' };
  }
}