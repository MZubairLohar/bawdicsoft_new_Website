import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/project';
import Lead from '@/models/lead';
import SiteVisit from '@/models/siteVisit';
import Interaction from '@/models/interaction';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);
  return payload;
}

export async function GET() {
  try {
    // Check authentication
    const user = await checkAuth();
if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [
      totalProjects,
      totalLeads,
      newLeads,
      contactedLeads,
      closedLeads,
      visitsThisMonth,
      visitsPrevMonth,
      totalVisits,
      interactionsThisMonth,
      interactionsPrevMonth,
      totalInteractions,
    ] = await Promise.all([
      Project.countDocuments(),
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ status: 'Contacted' }),
      Lead.countDocuments({ status: 'Closed' }),
      SiteVisit.countDocuments({ createdAt: { $gte: startOfThisMonth, $lt: startOfNextMonth } }),
      SiteVisit.countDocuments({ createdAt: { $gte: startOfPrevMonth, $lt: startOfThisMonth } }),
      SiteVisit.countDocuments(),
      Interaction.countDocuments({ createdAt: { $gte: startOfThisMonth, $lt: startOfNextMonth } }),
      Interaction.countDocuments({ createdAt: { $gte: startOfPrevMonth, $lt: startOfThisMonth } }),
      Interaction.countDocuments(),
    ]);

    // Build a monthly breakdown for the last 6 months (for the growth chart).
    const monthlyBreakdown: { month: string; opens: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const count = await SiteVisit.countDocuments({
        createdAt: { $gte: start, $lt: end },
      });
      const label = start.toLocaleString('default', { month: 'short' });
      monthlyBreakdown.push({ month: label, opens: count });
    }

    // Recent locations (top 6) for a geography snapshot.
    const locationAgg = await SiteVisit.aggregate([
      { $group: { _id: { city: '$city', country: '$country' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);
    const topLocations = locationAgg.map((l) => ({
      city: l._id.city || 'Unknown',
      country: l._id.country || 'Unknown',
      count: l.count,
    }));

    return NextResponse.json(
      {
        success: true,
        data: {
          totalProjects,
          totalLeads,
          leadsByStatus: {
            New: newLeads,
            Contacted: contactedLeads,
            Closed: closedLeads,
          },
          siteVisits: {
            thisMonth: visitsThisMonth,
            prevMonth: visitsPrevMonth,
            total: totalVisits,
            monthlyBreakdown,
            topLocations,
          },
          interactions: {
            thisMonth: interactionsThisMonth,
            prevMonth: interactionsPrevMonth,
            total: totalInteractions,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}