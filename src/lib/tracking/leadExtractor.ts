// src/lib/tracking/leadExtractor.ts
// Extract lead info (email, name, wants-to-build) from conversation history.

import { ChatMessage } from '@/components/agent-widget/MessageBubble';

// Simple but robust email regex
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export type ExtractedLead = {
  email: string;
  name: string;
  wantsToBuild: string;
};

/**
 * Find the first email address appearing in any user message.
 */
export function findEmailInConversation(messages: ChatMessage[]): string | null {
  for (const m of messages) {
    if (m.role === 'user') {
      const match = m.text.match(EMAIL_REGEX);
      if (match) return match[0].toLowerCase();
    }
  }
  return null;
}

/**
 * Try to extract the user's name from conversation.
 * Heuristic: look for short user replies (1-3 words) that are likely names,
 * especially right after the agent asked something name-related.
 */
function guessName(messages: ChatMessage[]): string {
  const namePrompts = [
    'your name',
    "what's your name",
    'what is your name',
    'may i know your name',
    'who am i talking to',
  ];

  for (let i = 0; i < messages.length - 1; i++) {
    const msg = messages[i];
    const next = messages[i + 1];

    if (msg.role !== 'agent' || next.role !== 'user') continue;

    const agentLower = msg.text.toLowerCase();
    const askedForName = namePrompts.some((p) => agentLower.includes(p));

    if (askedForName) {
      const candidate = next.text.trim();
      // Only accept short, word-like replies
      if (
        candidate.length >= 2 &&
        candidate.length <= 40 &&
        /^[a-zA-Z\u00C0-\u024F\s'.-]+$/.test(candidate) &&
        !EMAIL_REGEX.test(candidate)
      ) {
        return candidate;
      }
    }
  }

  return 'Website Visitor';
}

/**
 * Pick the most "meaningful" user message as their intent summary.
 * Skips: greetings, emails, names, short replies.
 */
function guessWantsToBuild(messages: ChatMessage[]): string {
  const skipWords = [
    'hi',
    'hey',
    'hello',
    'yo',
    'thanks',
    'thank you',
    'ok',
    'okay',
    'yes',
    'no',
  ];

  const candidates = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.text.trim())
    .filter((t) => {
      if (t.length < 6) return false;
      if (EMAIL_REGEX.test(t)) return false;
      const lower = t.toLowerCase();
      if (skipWords.some((w) => lower === w || lower === w + '!')) return false;
      return true;
    })
    // Prefer longer messages (more signal)
    .sort((a, b) => b.length - a.length);

  return candidates[0] || 'Not specified';
}

/**
 * Main entrypoint: given the full conversation, return lead info if email found.
 */
export function extractLeadFromConversation(
  messages: ChatMessage[]
): ExtractedLead | null {
  const email = findEmailInConversation(messages);
  if (!email) return null;

  return {
    email,
    name: guessName(messages),
    wantsToBuild: guessWantsToBuild(messages),
  };
}