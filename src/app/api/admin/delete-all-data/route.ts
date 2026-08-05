import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/project';
import Lead from '@/models/lead';
import User from '@/models/user';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function DELETE() {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401 });
    }

    await connectToDatabase();

    // Get current user to verify they have admin rights
    const user = await User.findById(payload.id);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Insufficient permissions' }, { status: 403 });
    }

    // Delete all projects and leads (but keep the admin user)
    await Project.deleteMany({});
    await Lead.deleteMany({});

    return NextResponse.json({ 
      success: true, 
      message: 'All projects and leads deleted successfully' 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Delete all data error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}