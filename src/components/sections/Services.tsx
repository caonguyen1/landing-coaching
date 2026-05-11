'use client';

import { useEffect, useState } from 'react';

export default function Services() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/services')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  // 👉 convert object → array
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
    <section className="py-10 md:py-16 px-4 md:px-2 bg-primary-100">
  
  <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-bold mb-6 text-center">
    Trị liệu hôn nhân và gia đình
  </h2>

  {/* 3 services */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4">
    {items.map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <h3 className="text-center p-3 md:p-4 text-sm md:text-md bg-gradient-to-r from-primary-700 to-primary-400 text-white font-bold">
          {item.title}
        </h3>

        <div className="p-4">
          <div
            className="text-sm md:text-md prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: item.desc || '',
            }}
          />
        </div>
      </div>
    ))}
  </div>

  {/* MAIN */}
  <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-6 md:mt-5">

    <h3 className="text-center p-4 text-[16px] md:text-[18px] bg-gradient-to-r from-teal-500 to-teal-300 text-white font-bold">
      <div dangerouslySetInnerHTML={{ __html: data.mainDesc1 || '' }} />
    </h3>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4 text-sm md:text-md">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.mainDesc2 || '' }}
      />
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.mainDesc3 || '' }}
      />
    </div>

    <div className="p-4">
      <button className="block mx-auto p-3 w-full bg-gradient-to-r from-primary-700 to-primary-400 text-white rounded-full font-medium hover:opacity-90 transition">
        TƯ VẤN CHƯƠNG TRÌNH
      </button>
    </div>

  </div>

</section>
  );
}