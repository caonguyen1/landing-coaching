import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.contact.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return Response.json(data);
}