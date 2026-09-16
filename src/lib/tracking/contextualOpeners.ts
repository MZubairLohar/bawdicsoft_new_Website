// src/lib/tracking/contextualOpeners.ts
// Page-wise contextual opener messages (from Dev Brief, Page 8)

export const CONTEXTUAL_OPENERS: Record<string, string> = {
  '/services':
    'Hey — looking for a dev team or exploring a specific solution?',
  '/portfolio':
    'See something that fits what you need? Happy to walk you through it.',
  '/contact':
    'Hey! Before you fill the form — want me to help figure out the right starting point?',
  '/case-studies':
    'These are some of our best projects. Building something similar?',
  '/casestudies':
    'These are some of our best projects. Building something similar?',
  '/': 'Hey! Building something with AI or blockchain? That\u2019s our space.',
};

const DEFAULT_OPENER =
  'Hey! Building something with AI or blockchain? That\u2019s our space.';

export function getOpenerForPage(pathname: string): string {
  if (!pathname) return DEFAULT_OPENER;

  // Exact match first
  if (CONTEXTUAL_OPENERS[pathname]) return CONTEXTUAL_OPENERS[pathname];

  // Prefix match (e.g. /services/web-dev)
  const matchedKey = Object.keys(CONTEXTUAL_OPENERS).find(
    (key) => key !== '/' && pathname.startsWith(key)
  );
  if (matchedKey) return CONTEXTUAL_OPENERS[matchedKey];

  return DEFAULT_OPENER;
}