import { prisma } from '@/lib/prisma';
import MotionItem from '@/components/motion/MotionItem';

export default async function Expert() {
  const data =
    await prisma.expertSection.findFirst();

  if (!data) return null;

  return (
    <section className="px-4 pt-10 md:px-2 md:pt-30 max-md:pb-10">

      <div className="relative mx-auto max-w-6xl rounded-2xl bg-gradient-to-r from-primary-700 to-primary-400 p-6 pb-0 text-white md:p-8">

        <div className="flex flex-col lg:block">

          {/* LEFT */}
          <div className="relative z-10 lg:pr-[500px]">

            {/* name */}
            <MotionItem variant="slideDown">
              <p className="mb-3 text-sm font-bold md:text-base">
                {data.name}
              </p>
            </MotionItem>

            {/* title */}
            <MotionItem
              variant="slideUp"
              delay={0.1}
            >
              <h2 className="mt-2 text-[22px] font-extrabold leading-tight text-white md:text-[30px] md:leading-none">
                {data.title}
              </h2>
            </MotionItem>

            {/* content */}
            <MotionItem
              variant="slideUp"
              delay={0.2}
            >
              <div className="mt-5 text-white md:mt-6">
                <div
                  className="editor-content space-y-2 text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: data.description,
                  }}
                />
              </div>
            </MotionItem>

            {/* quote */}
            <MotionItem
              variant="fade"
              delay={0.35}
            >
              <div className="relative mt-5 rounded-[16px] bg-white/10 p-4 backdrop-blur-sm md:mt-4 md:rounded-[20px]">

                <span className="absolute left-3 top-2 text-[50px] font-bold leading-none text-white/30 md:text-[70px]">
                  “
                </span>

                <div
                  className="relative z-10 pl-6 text-sm leading-[1.6] text-white md:pl-8 md:text-base md:leading-[1.7]"
                  dangerouslySetInnerHTML={{
                    __html: data.quote,
                  }}
                />
              </div>
            </MotionItem>

          </div>

          {/* RIGHT */}
          <MotionItem
            variant="fade"
            delay={0.3}
          >
            <div className="relative -mt-10 flex justify-end md:justify-center lg:absolute lg:bottom-0 lg:right-10 lg:mt-0">

              {/* flower */}
              <img
                src="/flower.png"
                alt="Điểm khác biệt"
                className="absolute left-0 top-50 block w-[250px] animate-float md:-left-10"
              />

              {/* circles */}
              <div className="absolute bottom-10 left-0 hidden h-[250px] w-[250px] rounded-full bg-white/10 blur-[2px] lg:block" />

              <div className="absolute -bottom-16 left-0 hidden h-[180px] w-[180px] rounded-full bg-white/10 blur-[2px] lg:block" />

              {/* image */}
              <img
                src={data.image}
                alt={data.name}
                className="relative z-10 w-[300px] drop-shadow-2xl md:w-[300px] lg:w-[400px]"
              />
            </div>
          </MotionItem>

        </div>
      </div>
    </section>
  );
}