import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/user';
import { verifySessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { hashPassword } from '@/lib/auth';
import { hasRole, USER_MGMT_ROLES, canManageTarget } from '@/lib/roles';

export async function GET(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload || !hasRole(payload.role, USER_MGMT_ROLES)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();

    // Get all users except the current user (to prevent self-deletion/modification issues)
    const users = await User.find({ _id: { $ne: payload.id } }).select('-password');

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload || !hasRole(payload.role, USER_MGMT_ROLES)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Only super_admin can create another super_admin or admin
    if (role === 'super_admin' && payload.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'Only a Super Admin can create Super Admin accounts' }, { status: 403 });
    }

    if (!['super_admin', 'admin', 'manager', 'rep', 'user'].includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = hashPassword(password);

    // Create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload || !hasRole(payload.role, USER_MGMT_ROLES)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { userId, name, email, password, role } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    if (role && !['super_admin', 'admin', 'manager', 'rep', 'user'].includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch target user to enforce super_admin protection
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Super Admin accounts can only be modified by a super_admin
    if (!canManageTarget(targetUser.role, payload.role)) {
      return NextResponse.json({ success: false, error: 'You do not have permission to modify this user' }, { status: 403 });
    }

    // Only a super_admin can grant super_admin role
    if (role === 'super_admin' && payload.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'Only a Super Admin can grant Super Admin role' }, { status: 403 });
    }

    const updates: any = {};
    if (name) updates.name = name;
    if (email) updates.email = email.toLowerCase();
    if (role) updates.role = role;
    if (password) updates.password = hashPassword(password);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, select: '-password' }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload || !hasRole(payload.role, USER_MGMT_ROLES)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    if (userId === payload.id) {
      return NextResponse.json({ success: false, error: 'Cannot delete yourself' }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch target user to enforce super_admin protection
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Super Admin accounts can only be deleted by a super_admin
    if (!canManageTarget(targetUser.role, payload.role)) {
      return NextResponse.json({ success: false, error: 'You do not have permission to delete this user' }, { status: 403 });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}


