import { prisma } from '@/lib/prisma';

export const revalidate = 300;

async function getServices() {
  return prisma.serviceSection.findFirst();
}

export default async function Services() {
  const data = await getServices();

  if (!data) return null;

  // convert object -> array
  const items = [
    {
      title: data.item1Title,
      desc: data.item1Desc,
    },
    {
      title: data.item2Title,
      desc: data.item2Desc,
    },
    {
      title: data.item3Title,
      desc: data.item3Desc,
    },
  ];

  return (
    <section className="bg-primary-100 px-4 py-10 md:px-2 md:py-16">
      {/* TITLE */}
      <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl lg:text-[35px]">
        Trị liệu hôn nhân và gia đình
      </h2>

      {/* SERVICES */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl bg-white shadow-md"
          >
            {/* CARD TITLE */}
            <h3 className="bg-gradient-to-r from-primary-700 to-primary-400 p-3 text-center text-sm font-bold text-white md:p-4 md:text-md">
              {item.title}
            </h3>

            {/* CARD CONTENT */}
            <div className="p-4">
              <div
                className="prose max-w-none text-sm md:text-md"
                dangerouslySetInnerHTML={{
                  __html: item.desc || '',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* MAIN BOX */}
      <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl bg-white shadow-md md:mt-5">
        {/* MAIN TITLE */}
        <h3 className="bg-gradient-to-r from-teal-500 to-teal-300 p-4 text-center text-[16px] font-bold text-white md:text-[18px]">
          <div
            dangerouslySetInnerHTML={{
              __html: data.mainDesc1 || '',
            }}
          />
        </h3>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-6 p-4 text-sm md:gap-8 md:text-md lg:grid-cols-2">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: data.mainDesc2 || '',
            }}
          />

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: data.mainDesc3 || '',
            }}
          />
        </div>

        {/* BUTTON */}
        <div className="p-4">
          <button className="mx-auto block w-full rounded-full bg-gradient-to-r from-primary-700 to-primary-400 p-3 font-medium text-white transition hover:opacity-90">
            TƯ VẤN CHƯƠNG TRÌNH
          </button>
        </div>
      </div>
    </section>
  );
}