import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ success: true });

    res.cookies.set('admin_token', process.env.ADMIN_SECRET!, {
      httpOnly: true,
      path: '/',
    });

    return res;
  }

  return new NextResponse('Unauthorized', { status: 401 });
}