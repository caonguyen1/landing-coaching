import { prisma } from '@/lib/prisma';

// DELETE
export async function DELETE(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json(
        { error: 'Missing id' },
        { status: 400 }
      );
    }

    const deleted =
      await prisma.testimonial.delete({
        where: { id },
      });

    return Response.json(deleted);
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const updated =
      await prisma.testimonial.update({
        where: { id },

        data: {
          name: body.name,
          content: body.content,
          avatar: body.avatar,
          isActive: body.isActive,
        },
      });

    return Response.json(updated);
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}