import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET
export async function GET() {
  try {
    const data = await prisma.hero.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        error: 'Cannot fetch hero',
      },
      {
        status: 500,
      }
    );
  }
}

// CREATE / UPDATE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existing =
      await prisma.hero.findFirst();

    const payload = {
      title: body.title || '',

      content1: body.content1 || '',

      bullets: body.bullets || [],
    };

    // UPDATE
    if (existing) {
      const updated =
        await prisma.hero.update({
          where: {
            id: existing.id,
          },

          data: payload,
        });

      return NextResponse.json(updated);
    }

    // CREATE
    const created =
      await prisma.hero.create({
        data: payload,
      });

    return NextResponse.json(created);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        error: 'Cannot save hero',
      },
      {
        status: 500,
      }
    );
  }
}