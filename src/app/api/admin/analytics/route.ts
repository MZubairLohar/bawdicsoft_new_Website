import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/project';
import Lead from '@/models/lead';
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

    const [totalProjects, totalLeads, newLeads, contactedLeads, closedLeads] = await Promise.all([
      Project.countDocuments(),
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ status: 'Contacted' }),
      Lead.countDocuments({ status: 'Closed' }),
    ]);

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
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}