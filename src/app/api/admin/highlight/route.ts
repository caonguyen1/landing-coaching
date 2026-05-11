import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await prisma.highlight.findFirst();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existing = await prisma.highlight.findFirst();

    const result = existing
      ? await prisma.highlight.update({
          where: { id: existing.id },
          data: { content: body.content },
        })
      : await prisma.highlight.create({
          data: { content: body.content },
        });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}