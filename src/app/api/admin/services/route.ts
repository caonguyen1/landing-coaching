import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET
export async function GET() {
  const data = await prisma.serviceSection.findFirst();
  return NextResponse.json(data);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const existing = await prisma.serviceSection.findFirst();

  let result;

  if (existing) {
    result = await prisma.serviceSection.update({
      where: { id: existing.id },
      data: body,
    });
  } else {
    result = await prisma.serviceSection.create({
      data: body,
    });
  }

  return NextResponse.json(result);
}