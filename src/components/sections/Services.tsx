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
    <section className="py-10 md:py-16 px-2 bg-primary-100">
      <h2 className="text-2xl lg:text-[35px] font-bold mb-6 text-center">
        Trị liệu hôn nhân và gia đình
      </h2>
      {/* 3 services */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <h3 className="text-center p-4 text-md bg-gradient-to-r from-primary-700 to-primary-400 text-white font-bold">
              {item.title}
            </h3>

            <div className='p-4'>
              <div
                className="text-md prose"
                dangerouslySetInnerHTML={{
                  __html: item.desc || '',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      
      {/* MAIN */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-5">
        <h3 className="text-center p-4 text-[18px] bg-gradient-to-r from-teal-500 to-teal-300 text-white font-bold">
          <div dangerouslySetInnerHTML={{ __html: data.mainDesc1 || '' }} />
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30 p-4 text-md">
          <div className='prose' dangerouslySetInnerHTML={{ __html: data.mainDesc2 || '' }} />
          <div className='prose' dangerouslySetInnerHTML={{ __html: data.mainDesc3 || '' }} />
        </div>
        <div className='p-4'>
          <button className="block mx-auto p-3 w-full bg-gradient-to-r from-primary-700 to-primary-400 text-white rounded-full">
            TƯ VẤN CHƯƠNG TRÌNH
          </button>
        </div>
      </div>
    </section>
  );
}