import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Hardcoded credentials
    if (username === 'admin' && password === 'bayana2026') {
      const cookieStore = await cookies();
      cookieStore.set('admin_auth', 'true', { 
        path: '/', 
        httpOnly: true, 
        maxAge: 60 * 60 * 24 // 1 day
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
