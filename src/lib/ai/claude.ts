// src/lib/ai/claude.ts
// Claude API wrapper — Conversation Engine (Dev Brief, Page 6)

import { BAWDIC_SYSTEM_PROMPT } from '@/lib/prompts/systemPrompt';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 300;

export type ChatRole = 'user' | 'assistant';

export type ClaudeMessage = {
  role: ChatRole;
  content: string;
};

export type ClaudeResult = {
  ok: boolean;
  reply?: string;
  error?: string;
};

/**
 * Send the full conversation history to Claude and get the next reply.
 * History is kept in memory per session on the client; server is stateless.
 */
export async function getClaudeReply(
  conversationHistory: ClaudeMessage[]
): Promise<ClaudeResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      error:
        'ANTHROPIC_API_KEY missing. Bilal se API key le kar .env mein add karein.',
    };
  }

  if (!conversationHistory.length) {
    return { ok: false, error: 'Empty conversation history.' };
  }

  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: BAWDIC_SYSTEM_PROMPT,
        messages: conversationHistory,
      }),
    });

    if (!res.ok) {
  const text = await res.text().catch(() => '');
  console.error('[Claude API] Non-OK response:', res.status, text);

  let friendlyError = `Claude API error (${res.status})`;

  if (res.status === 401) {
    friendlyError =
      'Claude API key missing or invalid. Please check ANTHROPIC_API_KEY in .env.local.';
  } else if (res.status === 429) {
    friendlyError = 'Claude API rate limit reached. Try again shortly.';
  } else if (res.status >= 500) {
    friendlyError = 'Claude API temporarily unavailable.';
  }

  return { ok: false, error: friendlyError };
}

    const data = await res.json();

    // Anthropic returns content as an array of blocks
    const firstBlock = Array.isArray(data?.content) ? data.content[0] : null;
    const reply = firstBlock?.text?.trim();

    if (!reply) {
      return { ok: false, error: 'Claude returned empty reply.' };
    }

    return { ok: true, reply };
  } catch (err) {
    console.error('[Claude API] Fetch failed:', err);
    return { ok: false, error: 'Network error while contacting Claude.' };
  }
}