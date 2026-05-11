import { prisma } from '@/lib/prisma';

export default async function Expert() {
  const data =
    await prisma.expertSection.findFirst();

  if (!data) return null;

  return (
    <section className="pt-10 md:pt-30 max-md:pb-10 px-4 md:px-2">
  <div className="max-w-6xl mx-auto bg-gradient-to-r from-primary-700 to-primary-400 text-white p-6 pb-0 md:p-8 rounded-2xl relative">

    <div className="flex flex-col lg:block">

      {/* LEFT */}
      <div className="relative z-10 lg:pr-[500px]">

        {/* title */}
        <p className="font-bold mb-3 text-sm md:text-base">
          {data.name}
        </p>

        <h2 className="mt-2 text-[22px] md:text-[30px] font-extrabold leading-tight md:leading-none text-white">
          {data.title}
        </h2>

        {/* content */}
        <div className="mt-5 md:mt-6 text-white">
          <div
            className="space-y-2 editor-content text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: data.description,
            }}
          />
        </div>

        {/* quote */}
        <div className="relative mt-5 md:mt-4 rounded-[16px] md:rounded-[20px] bg-white/10 p-4 backdrop-blur-sm">

          <span className="absolute left-3 top-2 text-[50px] md:text-[70px] font-bold leading-none text-white/30">
            “
          </span>

          <div
            className="relative z-10 pl-6 md:pl-8 leading-[1.6] md:leading-[1.7] text-white text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: data.quote,
            }}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative -mt-10 lg:mt-0 lg:absolute lg:bottom-0 lg:right-10 flex justify-end md:justify-center">

        {/* decoration flower */}
        <img
          src="/flower.png"
          alt="Điểm khác biệt"
          className="block absolute top-50 left-0 md:-left-10 w-[250px]"
        />

        {/* circles */}
        <div className="hidden lg:block absolute bottom-10 left-0 h-[250px] w-[250px] rounded-full bg-white/10" />
        <div className="hidden lg:block absolute -bottom-16 left-0 h-[180px] w-[180px] rounded-full bg-white/10" />

        {/* person */}
        <img
          src={data.image}
          alt={data.name}
          className="w-[300px] md:w-[300px] lg:w-[400px] relative z-10"
        />
      </div>

    </div>
  </div>
</section>
  );
}