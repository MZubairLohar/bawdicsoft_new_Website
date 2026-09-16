// src/lib/tracking/pageMessages.ts
// Page-wise proactive card messages (different from chat openers)

export type PageCard = {
  title: string;
  message: string;
  cta: string;         // Call to action button
  emoji: string;       // Header emoji
};

const DEFAULT_CARD: PageCard = {
  title: 'BawdicSoft',
  message: "Hey! Building something with AI or blockchain? That's our space.",
  cta: 'View More',
//   emoji: '👋',
};

export const PAGE_CARDS: Record<string, PageCard> = {
  '/': {
    title: 'BawdicSoft',
    message: "Hey! Building something with AI or blockchain? That's our space.",
    cta: 'View More',
    // emoji: '👋',
  },
  '/services': {
    title: 'Need help choosing?',
    message: "Looking for a dev team or exploring a specific solution? Let's talk.",
    cta: 'See How We Help',
    // emoji: '🛠️',
  },
  '/portfolio': {
    title: 'Like what you see?',
    message: "See something that fits what you need? Happy to walk you through it.",
    cta: 'Show Me More',
    // emoji: '💼',
  },
  '/contact': {
    title: 'Before you fill the form...',
    message: "Want me to help figure out the right starting point?",
    cta: 'Help Me Out',
    // emoji: '💬',
  },
  '/case-studies': {
    title: 'Great projects inside',
    message: "Building something similar? Let's talk about your idea.",
    cta: 'Chat With Us',
    // emoji: '🏆',
  },
  '/casestudies': {
    title: 'Great projects inside',
    message: "Building something similar? Let's talk about your idea.",
    cta: 'Chat With Us',
    // emoji: '🏆',
  },
};

export function getCardForPage(pathname: string): PageCard {
  if (!pathname) return DEFAULT_CARD;

  // Exact match first
  if (PAGE_CARDS[pathname]) return PAGE_CARDS[pathname];

  // Prefix match (e.g. /services/web-dev)
  const matchedKey = Object.keys(PAGE_CARDS).find(
    (key) => key !== '/' && pathname.startsWith(key)
  );
  if (matchedKey) return PAGE_CARDS[matchedKey];

  return DEFAULT_CARD;
}