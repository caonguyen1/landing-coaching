import { prisma } from '@/lib/prisma';

export const revalidate = 300;

async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function Testimonials() {
  const data = await getTestimonials();

  if (!data.length) return null;

  return (
    <section className="bg-primary-100 px-4 py-12 md:px-0 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* TITLE */}
        <h2 className="mb-6 text-center text-2xl font-bold lg:text-[35px]">
          Phản hồi khách hàng
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex h-full flex-col rounded-[15px] bg-white p-4 shadow-md"
            >
              {/* QUOTE */}
              <div className="flex items-start gap-2">
                <span className="text-[50px] leading-none font-bold text-primary-400 md:text-[80px]">
                  “
                </span>

                <p className="pt-1 text-[13px] leading-[1.6] md:pt-2 md:text-[14px] md:leading-[1.7]">
                  {item.content}
                </p>
              </div>

              {/* USER */}
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={
                    item.avatar ||
                    '/images/default-avatar.png'
                  }
                  alt={item.name}
                  className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
                />

                <div>
                  <p className="text-[14px] font-bold text-black">
                    {item.name}
                  </p>

                  {item.position && (
                    <p className="mt-1 text-xs text-gray-500 md:text-sm">
                      {item.position}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}