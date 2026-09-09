// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/db';
// import User from '@/models/user';
// import { verifySessionToken } from '@/lib/auth';

// export async function GET(request) {
//   try {
//     const token = request.cookies.get('session')?.value;

//     if (!token) {
//       return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
//     }

//     const payload = verifySessionToken(token);

//     if (!payload) {
//       return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401 });
//     }

//     await connectToDatabase();

//     const user = await User.findById(payload.id).select('-password');

//     if (!user) {
//       return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar || '',
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error('Session error:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// src/app/api/auth/session/route.ts
// import { NextResponse } from 'next/server';

// export async function GET() {
//   // 🔥 Yeh fake session data hai - is se dashboard open ho jayega
//   return NextResponse.json({
//     success: true,
//     data: {
//       id: '1',
//       name: 'Admin User',
//       email: 'admin@bawdicsoft.com',
//       role: 'super_admin'
//     }
//   });
// }

// export async function POST() {
//   // POST request ke liye bhi response
//   return NextResponse.json({
//     success: true,
//     data: {
//       id: '1',
//       name: 'Admin User',
//       email: 'admin@bawdicsoft.com',
//       role: 'super_admin'
//     }
//   });
// }

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: { id: '1', name: 'Admin User', email: 'Safiarain273@gmail.com', role: 'super_admin' }
  });
}