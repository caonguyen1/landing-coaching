import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await prisma.setting.findFirst();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('GET SETTINGS ERROR:', err);

    return NextResponse.json(
      { message: err.message || 'GET error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ chỉ lấy field hợp lệ (tránh Prisma crash)
    const data = {
      logo: body.logo ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      website: body.website ?? null,
      facebook: body.facebook ?? null,
      youtube: body.youtube ?? null,
      title: body.title ?? null,
      meta: body.meta ?? null,
      content: body.content ?? null,
    };

    const existing = await prisma.setting.findFirst();

    let result;

    if (existing) {
      result = await prisma.setting.update({
        where: { id: existing.id },
        data,
      });
    } else {
      result = await prisma.setting.create({
        data,
      });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('POST SETTINGS ERROR:', err);

    return NextResponse.json(
      {
        message: err.message || 'Lưu thất bại (server error)',
      },
      { status: 500 }
    );
  }
}