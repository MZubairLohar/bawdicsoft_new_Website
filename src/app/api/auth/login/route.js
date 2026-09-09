// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/db';
// import User from '@/models/user';
// import { verifyPassword, createSessionToken } from '@/lib/auth';

// export async function POST(request) {
//   try {
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
//     }

//     await connectToDatabase();

//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
//     }

//     const isValid = verifyPassword(password, user.password);

//     if (!isValid) {
//       return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
//     }

//     const token = createSessionToken({ id: user._id.toString(), role: user.role });

//     const response = NextResponse.json({
//       success: true,
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar || '',
//         role: user.role,
//       },
//     });

//     response.cookies.set('session', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       path: '/',
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//     });

//     return response;
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
// src/app/api/auth/login/route.ts
// import { NextResponse } from 'next/server';

// export async function POST() {
//   // 🔥 Hamesha success return karo - koi bhi email/password kaam karega
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

// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 🔥 Debug logs (Terminal mein dekho)
    console.log('📥 Email received:', email);
    console.log('📥 Password received:', password);

    // 🔥 Hardcoded credentials (exact match)
    const VALID_EMAIL = 'Safiarain273@gmail.com';
    const VALID_PASSWORD = '12345678';

    // Case-insensitive email compare (optional, lekin safe hai)
    if (email.toLowerCase() === VALID_EMAIL.toLowerCase() && password === VALID_PASSWORD) {
      console.log('✅ Login Success!');
      return NextResponse.json({
        success: true,
        data: {
          id: '1',
          name: 'Safi Arrain',
          email: VALID_EMAIL,
          role: 'super_admin'
        }
      });
    } else {
      console.log('❌ Login Failed - Mismatch');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}