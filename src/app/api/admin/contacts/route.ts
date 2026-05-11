import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';

export async function GET() {
  const data = await prisma.contact.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return Response.json(data);
}