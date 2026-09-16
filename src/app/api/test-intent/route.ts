import { NextResponse } from 'next/server';
import { createEmptySignals, calculateIntentScore } from '@/lib/tracking/intentEngine';

export async function GET() {
  const results: any[] = [];

  // Test 1: /contact only → expect score 4, Warm
  const t1 = createEmptySignals();
  t1.visitedPages.add('/contact');
  results.push({ test: 'Test 1: /contact only', ...calculateIntentScore(t1) });

  // Test 2: /services + /portfolio + /contact → expect score 7, Hot
  const t2 = createEmptySignals();
  t2.visitedPages.add('/services');
  t2.visitedPages.add('/portfolio');
  t2.visitedPages.add('/contact');
  results.push({ test: 'Test 2: services+portfolio+contact', ...calculateIntentScore(t2) });

  // Test 3: Nothing → expect score 0, Cold
  const t3 = createEmptySignals();
  results.push({ test: 'Test 3: no activity', ...calculateIntentScore(t3) });

  // Test 4: Everything → expect score 10 (capped), Hot
  const t4 = createEmptySignals();
  t4.visitedPages.add('/contact');
  t4.visitedPages.add('/services');
  t4.visitedPages.add('/portfolio');
  t4.clickedDemoLinks.add('deep-trace');
  t4.isReturning = true;
  t4.timeOnSiteSeconds = 180;
  t4.maxScrollDepth = 85;
  t4.trafficSource = 'linkedin';
  t4.visitedAIProducts = true;
  results.push({ test: 'Test 4: all signals', ...calculateIntentScore(t4) });

  // Test 5: LinkedIn + 2min + scroll 70 → expect score 6, Warm
  const t5 = createEmptySignals();
  t5.timeOnSiteSeconds = 150;
  t5.maxScrollDepth = 75;
  t5.trafficSource = 'linkedin';
  results.push({ test: 'Test 5: linkedin+time+scroll', ...calculateIntentScore(t5) });

  return NextResponse.json({ results });
}