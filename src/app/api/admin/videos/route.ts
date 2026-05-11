import { prisma } from '@/lib/prisma';

// GET LIST
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get('keyword') || '';

    const videos = await prisma.video.findMany({
      where: {
        title: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json(videos);
  } catch (err) {
    console.error('GET videos error:', err);
    return Response.json([], { status: 500 });
  }
}

// CREATE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.youtubeId) {
      return Response.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title: body.title,
        youtubeId: body.youtubeId,

        image: body.image || null,
        thumbnail:
          body.image ||
          `https://img.youtube.com/vi/${body.youtubeId}/hqdefault.jpg`,
      },
    });

    return Response.json(video);
  } catch (err) {
    console.error('CREATE video error:', err);
    return Response.json(
      { error: 'Create failed' },
      { status: 500 }
    );
  }
}