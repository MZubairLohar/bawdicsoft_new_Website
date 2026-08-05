export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(payload.id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'Current and new passwords are required' }, { status: 400 });
    }

    const isValid = verifyPassword(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 });
    }

    const hashedNewPassword = hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashedNewPassword });

    return NextResponse.json({ success: true, message: 'Password updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Password change error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}