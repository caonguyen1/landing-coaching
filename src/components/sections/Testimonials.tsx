'use client';

import { useEffect, useState } from 'react';

type Testimonial = {
  id: string;
  name: string;
  content: string;
  avatar?: string;
  position?: string;
};

export default function Testimonials() {
  const [data, setData] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="py-16 bg-primary-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl lg:text-[35px] font-bold mb-6 text-center">
          Phản hồi khách hàng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
                key={item.id}
                className="rounded-[15px] bg-white p-4 shadow-md"
              >
                {/* quote */}
                <div className="flex items-start gap-2">
                  <span className="text-[80px] font-bold leading-none text-primary-400">
                    “
                  </span>

                  <p className="pt-2 text-[14px] leading-[1.7]">
                    {item.content}
                  </p>
                </div>

                {/* user */}
                <div className="mt-4 flex items-center gap-2">
                  <img
                    src={item.avatar || "/images/default-avatar.png"}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-[14px] font-bold text-black">
                      {item.name}
                    </p>

                    {item.position && (
                      <p className="mt-1 text-sm text-gray-500 lg:text-xl">
                        {item.position}
                      </p>
                    )}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}