// src/lib/integrations/whatsapp.ts
// Sends Bilal a WhatsApp notification on every new lead (Dev Brief, Page 6)

export type WhatsAppLeadInfo = {
  name: string;
  email: string;
  wantsToBuild: string;
  page: string;
  intentScore: number;
  source: string;
};

export type WhatsAppResult = {
  ok: boolean;
  error?: string;
};

export async function notifyBilalOnWhatsApp(
  lead: WhatsAppLeadInfo
): Promise<WhatsAppResult> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const recipient = process.env.BILAL_WHATSAPP_NUMBER;

  if (!token || !phoneId || !recipient) {
    return {
      ok: false,
      error:
        'WhatsApp credentials missing (WHATSAPP_API_TOKEN / WHATSAPP_PHONE_ID / BILAL_WHATSAPP_NUMBER)',
    };
  }

  const url = `https://graph.facebook.com/v20.0/${phoneId}/messages`;

  const messageBody =
    `🔥 New Lead — BawdicSoft\n\n` +
    `Name: ${lead.name}\n` +
    `Email: ${lead.email}\n` +
    `Looking to build: ${lead.wantsToBuild}\n` +
    `Page: ${lead.page}\n` +
    `Intent Score: ${lead.intentScore}/10\n` +
    `Source: ${lead.source}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'text',
        text: { body: messageBody },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[WhatsApp] Failed:', res.status, text);
      return { ok: false, error: `WhatsApp error (${res.status})` };
    }

    return { ok: true };
  } catch (err) {
    console.error('[WhatsApp] Fetch failed:', err);
    return { ok: false, error: 'WhatsApp network error' };
  }
}