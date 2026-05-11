import { prisma } from '@/lib/prisma';

// GET
export async function GET() {
  const data = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return Response.json(data);
}

// CREATE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const item = await prisma.testimonial.create({
      data: {
        name: body.name,
        content: body.content,
        avatar: body.avatar || null,
        position: body.position || null,
        isActive: true,
      },
    });

    return Response.json(item);
  } catch (err) {
    return Response.json(
      { error: 'Create failed' },
      { status: 500 }
    );
  }
}