'use client';

import { useEffect, useState } from "react";

export default function Highlight() {
   const [content, setContent] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/admin/highlight');
      const data = await res.json();

      if (data?.content) {
        setContent(data.content);
      }
    };

    load();
  }, []);
  return (
    <section className="bg-gradient-to-b from-primary-100 to-white py-10 md:py-14 px-4 md:px-2">
  <div className="max-w-6xl mx-auto overflow-hidden bg-gradient-to-r from-primary-700 to-primary-400 text-white p-5 md:p-8 rounded-2xl relative">

    <h2 className="text-xl sm:text-2xl lg:text-[35px] font-bold mb-4 text-center">
      Điểm khác biệt
    </h2>

    <div
      className="prose prose-invert max-w-none text-base md:text-lg"
      dangerouslySetInnerHTML={{ __html: content }}
    />

    {/* decorative image */}
    <div className="absolute -bottom-10 -right-10 md:-bottom-14 md:-right-14 opacity-70 md:opacity-100">
      <img
        src="/flower.png"
        alt="Điểm khác biệt"
        className="w-[180px] md:w-[300px]"
      />
    </div>

  </div>
</section>
  );
}