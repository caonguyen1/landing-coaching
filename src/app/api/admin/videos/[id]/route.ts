import { prisma } from '@/lib/prisma';

// UPDATE
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const thumbnail = `https://img.youtube.com/vi/${body.youtubeId}/hqdefault.jpg`;

    const updated =
      await prisma.video.update({
        where: { id },

        data: {
          title: body.title,
          youtubeId: body.youtubeId,
          isActive: body.isActive,

          // IMPORTANT
          thumbnail,

          // nếu có custom image
          image: body.image,
        },
      });

    return Response.json(updated);
  } catch (err) {
    console.log(err);

    return Response.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.video.delete({
      where: { id },
    });

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error('DELETE error:', err);

    return Response.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}