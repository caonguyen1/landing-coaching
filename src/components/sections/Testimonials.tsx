'use client';

import MotionItem from '@/components/motion/MotionItem';

type Testimonial = {
  id: string;
  content: string;
  name: string;
  position: string | null;
  avatar: string | null;
};

type Props = {
  data: Testimonial[];
};

export default function TestimonialsClient({
  data,
}: Props) {
  return (
    <section className="bg-primary-100 px-4 py-12 md:px-0 md:py-16">

      <div className="mx-auto max-w-6xl">

        {/* TITLE */}
        <MotionItem variant="slideDown">
          <h2 className="mb-6 text-center text-2xl font-bold lg:text-[35px]">
            Phản hồi khách hàng
          </h2>
        </MotionItem>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">

          {data.map((item, index) => (
            <MotionItem
              key={item.id}
              variant='slideUp'
              delay={index * 0.15}
              className="group relative h-full"
            >

              <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

                {/* hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/0 via-primary-100/0 to-primary-200/20 opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* top border */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-primary-500 to-primary-300 transition-all duration-500 group-hover:w-full" />

                {/* QUOTE */}
                <div className="relative z-10 flex items-start gap-2">

                  <span className="text-[50px] font-bold leading-none text-primary-400 transition duration-500 group-hover:scale-110 md:text-[80px]">
                    “
                  </span>

                  <p className="pt-1 text-[13px] leading-[1.7] text-gray-700 md:pt-2 md:text-[14px]">
                    {item.content}
                  </p>

                </div>

                {/* USER */}
                <div className="relative z-10 mt-5 flex items-center gap-3">

                  {/* AVATAR */}
                  <div className="overflow-hidden rounded-full ring-2 ring-primary-100 transition duration-500 group-hover:ring-primary-300">

                    <img
                      src={
                        item.avatar ||
                        '/images/default-avatar.png'
                      }
                      alt={item.name}
                      className="h-10 w-10 object-cover transition duration-700 group-hover:scale-110 md:h-11 md:w-11"
                    />

                  </div>

                  {/* INFO */}
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

            </MotionItem>
          ))}

        </div>

      </div>
    </section>
  );
}