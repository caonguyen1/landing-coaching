import { prisma } from '@/lib/prisma';

export default async function Expert() {
  const data =
    await prisma.expertSection.findFirst();

  if (!data) return null;

  return (
    <section className="pt-30 pb-16 px-2">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-primary-700 to-primary-400 text-white p-8 rounded-2xl relative">
        <div className="pr-[500px]">
          {/* LEFT */}
          <div className="relative z-10">
            {/* title */}
            <p className="font-bold mb-3">
              {data.name}
            </p>
            <h2 className="mt-2 text-[30px] font-extrabold leading-none text-white">
              {data.title}
            </h2>

            {/* content */}
            <div className="mt-6 text-white">
              <div
                className="space-y-2 editor-content"
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            </div>

            {/* quote */}
            <div className="relative mt-4 rounded-[20px] bg-white/10 p-4 backdrop-blur-sm">
              <span className="absolute left-4 top-2 text-[70px] font-bold leading-none text-white/30">
                “
              </span>

              <div
                className="relative z-10 pl-8 leading-[1.7] text-white"
                dangerouslySetInnerHTML={{
                  __html: data.quote,
                }}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="z-10 absolute bottom-0 right-10">
            <img
              src="/flower.png"
              alt="Điểm khác biệt"
              className="absolute top-30 -left-10 w-[250px]"
            />

            {/* circles */}
            <div className="absolute bottom-10 left-0 h-[250px] w-[250px] rounded-full bg-white/10" />
            
            <div className="absolute -bottom-16 -left-[0px] h-[180px] w-[180px] rounded-full bg-white/10" />

            {/* person */}
            <img
              src={data.image}
              alt={data.name}
              className="w-[250px] lg:w-[400px] relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}