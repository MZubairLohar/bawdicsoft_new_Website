// src/lib/tracking/intentEngine.ts
// Pure scoring logic for BawdicSoft AI Agent (Phase 1 Dev Brief)
// No API keys, no side effects — just signals in, score out.

export type VisitorSignals = {
  visitedPages: Set<string>;
  clickedDemoLinks: Set<string>;
  timeOnSiteSeconds: number;
  maxScrollDepth: number; // 0 - 100
  isReturning: boolean;
  trafficSource: string; // 'linkedin', 'google', 'direct', etc.
  visitedAIProducts: boolean;
};

// Weights exactly as per Dev Brief (Page 4)
export const INTENT_WEIGHTS = {
  CONTACT_PAGE: 4,
  DEMO_LINK_CLICK: 4,
  SERVICES_AND_PORTFOLIO: 3,
  RETURNING_VISITOR: 3,
  TIME_ON_SITE_2MIN: 2,
  SCROLL_70_PERCENT: 2,
  LINKEDIN_SOURCE: 2,
  AI_PRODUCTS_SECTION: 3,
} as const;

export const INTENT_THRESHOLD_FIRE = 7; // Score >= 7 → widget auto-opens
export const INTENT_MAX_SCORE = 10;

export type IntentLabel = 'Cold' | 'Warm' | 'Hot';

export type IntentBreakdown = {
  signal: string;
  points: number;
};

export type IntentScore = {
  score: number;
  label: IntentLabel;
  breakdown: IntentBreakdown[];
};

// Fresh empty state for a new visitor
export function createEmptySignals(): VisitorSignals {
  return {
    visitedPages: new Set<string>(),
    clickedDemoLinks: new Set<string>(),
    timeOnSiteSeconds: 0,
    maxScrollDepth: 0,
    isReturning: false,
    trafficSource: 'direct',
    visitedAIProducts: false,
  };
}

// Core scoring function
export function calculateIntentScore(signals: VisitorSignals): IntentScore {
  const breakdown: IntentBreakdown[] = [];
  let raw = 0;

  // +4 : visited /contact
  if (signals.visitedPages.has('/contact')) {
    breakdown.push({ signal: 'Visited /contact page', points: INTENT_WEIGHTS.CONTACT_PAGE });
    raw += INTENT_WEIGHTS.CONTACT_PAGE;
  }

  // +4 : clicked a demo link (Deep-Trace, CyberCity, Hashfor)
  if (signals.clickedDemoLinks.size > 0) {
    breakdown.push({ signal: 'Clicked a demo link', points: INTENT_WEIGHTS.DEMO_LINK_CLICK });
    raw += INTENT_WEIGHTS.DEMO_LINK_CLICK;
  }

  // +3 : visited /services AND /portfolio in same session
  if (signals.visitedPages.has('/services') && signals.visitedPages.has('/portfolio')) {
    breakdown.push({
      signal: 'Visited /services AND /portfolio',
      points: INTENT_WEIGHTS.SERVICES_AND_PORTFOLIO,
    });
    raw += INTENT_WEIGHTS.SERVICES_AND_PORTFOLIO;
  }

  // +3 : returning visitor
  if (signals.isReturning) {
    breakdown.push({ signal: 'Returning visitor', points: INTENT_WEIGHTS.RETURNING_VISITOR });
    raw += INTENT_WEIGHTS.RETURNING_VISITOR;
  }

  // +2 : time on site > 2 minutes
  if (signals.timeOnSiteSeconds >= 120) {
    breakdown.push({
      signal: 'Time on site > 2 minutes',
      points: INTENT_WEIGHTS.TIME_ON_SITE_2MIN,
    });
    raw += INTENT_WEIGHTS.TIME_ON_SITE_2MIN;
  }

  // +2 : scrolled past 70% of homepage
  if (signals.maxScrollDepth >= 70) {
    breakdown.push({
      signal: 'Scrolled past 70% of homepage',
      points: INTENT_WEIGHTS.SCROLL_70_PERCENT,
    });
    raw += INTENT_WEIGHTS.SCROLL_70_PERCENT;
  }

  // +2 : traffic source = LinkedIn
  if (signals.trafficSource === 'linkedin') {
    breakdown.push({ signal: 'Traffic from LinkedIn', points: INTENT_WEIGHTS.LINKEDIN_SOURCE });
    raw += INTENT_WEIGHTS.LINKEDIN_SOURCE;
  }

  // +3 : visited AI Products section
  if (signals.visitedAIProducts) {
    breakdown.push({
      signal: 'Visited AI Products section',
      points: INTENT_WEIGHTS.AI_PRODUCTS_SECTION,
    });
    raw += INTENT_WEIGHTS.AI_PRODUCTS_SECTION;
  }

  // Cap at 10 as per brief
  const score = Math.min(raw, INTENT_MAX_SCORE);

  // Label rules: >=7 Hot, >=4 Warm, else Cold
  const label: IntentLabel =
    score >= INTENT_THRESHOLD_FIRE ? 'Hot' : score >= 4 ? 'Warm' : 'Cold';

  return { score, label, breakdown };
}

// Helper: should the widget auto-open right now?
export function shouldWidgetAutoOpen(score: number): boolean {
  return score >= INTENT_THRESHOLD_FIRE;
}

// Helper: immediate opener if score = 10 (per brief)
export function isMaxIntent(score: number): boolean {
  return score >= INTENT_MAX_SCORE;
}