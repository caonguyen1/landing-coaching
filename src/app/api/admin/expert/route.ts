
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.expertSection.findFirst();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const exists = await prisma.expertSection.findFirst();

    if (exists) {
      const updated = await prisma.expertSection.update({
        where: {
          id: exists.id,
        },
        data: body,
      });

      return NextResponse.json(updated);
    }

    const created = await prisma.expertSection.create({
      data: body,
    });

    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}