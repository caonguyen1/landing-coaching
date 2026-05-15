import { prisma } from '@/lib/prisma';
import MotionItem from '../motion/MotionItem';

export const revalidate = 300;

async function getHighlight() {
  return prisma.highlight.findFirst();
}

export default async function Highlight() {
  const data = await getHighlight();

  if (!data?.content) return null;

  return (
    <section className="bg-gradient-to-b from-primary-100 to-white px-4 py-10 md:px-2 md:py-14">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 to-primary-400 p-5 text-white md:p-8">

        {/* TITLE */}
        <MotionItem variant="fade">
          <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl lg:text-[35px]">
            Điểm khác biệt
          </h2>
        </MotionItem>

        {/* CONTENT */}
        <MotionItem variant="left" delay={0.2}>
          <div
            className="prose prose-invert relative z-10 max-w-none text-base md:text-lg"
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          />
        </MotionItem>

        {/* DECORATION */}
        <MotionItem variant="right" delay={0.4}>
          <div className="absolute -right-10 -bottom-10 opacity-70 md:-right-14 md:-bottom-14 md:opacity-100">
            <img
              src="/flower.png"
              alt="Điểm khác biệt"
              className="w-[180px] md:w-[300px]"
            />
          </div>
        </MotionItem>

      </div>
    </section>
  );
}