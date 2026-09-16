// src/lib/integrations/airtable.ts
// Saves a lead row to Airtable (Dev Brief, Page 6)

const AIRTABLE_API = 'https://api.airtable.com/v0';

export type LeadPayload = {
  name: string;
  email: string;
  wantsToBuild: string;
  page: string;
  intentScore: number;
  source: string;
  timestamp?: string; // ISO
};

export type AirtableResult = {
  ok: boolean;
  recordId?: string;
  error?: string;
};

export async function saveLeadToAirtable(
  lead: LeadPayload
): Promise<AirtableResult> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

  if (!apiKey || !baseId) {
    return {
      ok: false,
      error: 'Airtable credentials missing (AIRTABLE_API_KEY / AIRTABLE_BASE_ID)',
    };
  }

  const url = `${AIRTABLE_API}/${baseId}/${encodeURIComponent(tableName)}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: lead.name,
              Email: lead.email,
              'What They Want to Build': lead.wantsToBuild,
              'Page They Were On': lead.page,
              'Intent Score': lead.intentScore,
              'Traffic Source': lead.source,
              Timestamp: lead.timestamp || new Date().toISOString(),
              Status: 'New Lead',
            },
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[Airtable] Failed:', res.status, text);
      return { ok: false, error: `Airtable error (${res.status})` };
    }

    const data = await res.json();
    const recordId = data?.records?.[0]?.id;

    return { ok: true, recordId };
  } catch (err) {
    console.error('[Airtable] Fetch failed:', err);
    return { ok: false, error: 'Airtable network error' };
  }
}