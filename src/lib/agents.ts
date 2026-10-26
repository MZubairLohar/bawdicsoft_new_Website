// lib/agents.ts
// The AI assistants a visitor can be paired with (max 6).
// Edit names / avatars / colours here — nothing else needs to change.

export type Agent = {
  id: string;        // stable key, stored in the browser and sent to /api/chat
  name: string;      // full name shown in the chat header
  firstName: string; // shown on the launcher and used to personalise copy
  avatar: string;    // image in /public (falls back to initials if missing)
  color: string;     // fallback avatar colour
};

export const AGENTS: Agent[] = [
  { id: 'sophia', name: 'Sophia Carter', firstName: 'Sophia', avatar: '/Sophia.jpg', color: '#2563EB' },
  { id: 'leah',   name: 'Leah Morgan',   firstName: 'Leah',   avatar: '/Leah.jpg',   color: '#DB2777' },
  { id: 'adil',   name: 'Adil Khan',     firstName: 'Adil',   avatar: '/Adil.jpg',   color: '#0D9488' },
  { id: 'daniel', name: 'Daniel Reed',   firstName: 'Daniel', avatar: '/Daniel.png', color: '#7C3AED' },
  { id: 'ayesha', name: 'Ayesha Malik',  firstName: 'Ayesha', avatar: '/Ayesha.jpg', color: '#EA580C' },
  { id: 'omar',   name: 'Omar Hassan',   firstName: 'Omar',   avatar: '/Omar.jpg',   color: '#4F46E5' },
];

const STORAGE_KEY = 'bawdic_agent_id';

export function getAgentById(id: unknown): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}

/**
 * Returns this browser's assistant. First visit: pick one at random and
 * remember it, so the same visitor always talks to the same person.
 * Client-side only (uses localStorage).
 */
export function getOrAssignAgent(): Agent {
  try {
    const saved = getAgentById(localStorage.getItem(STORAGE_KEY));
    if (saved) return saved;
  } catch {
    /* storage blocked — fall through to a random pick */
  }

  const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
  try {
    localStorage.setItem(STORAGE_KEY, agent.id);
  } catch {
    /* ignore */
  }
  return agent;
}

/**
 * Stop-gap for existing copy that hard-codes "Sophia" (openers, proactive
 * messages): swaps in the assigned assistant's name.
 */
export function personalize(text: string, agent: Agent): string {
  return text
    .replace(/Sophia Carter/g, agent.name)
    .replace(/Sophia/g, agent.firstName);
}