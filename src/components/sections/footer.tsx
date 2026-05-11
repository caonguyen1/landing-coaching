'use client';
import { useEffect, useState } from "react";
import { FaYoutube, FaFacebook } from "react-icons/fa";

export default function FooterSection() {
  const [dataSetting, setDataSetting] = useState<any>(null);
  useEffect(() => {
      const load = async () => {
        try {
          const res = await fetch(
            '/api/admin/settings'
          );
  
          const json = await res.json();
  
          setDataSetting(json);
        } catch (err) {
          console.error(err);
        }
      };
  
      load();
    }, []);
  return (
    <>
      <section className="bg-primary-950 px-4 md:px-6 py-12 md:py-16 text-white">
  
        <div className="mx-auto flex flex-col md:flex-row max-w-6xl gap-6 md:gap-4 items-start justify-between">
  
          {/* LEFT BOX */}
          <div className="w-full md:w-[40%] rounded-[15px] bg-primary-900 px-5 md:px-7 py-5 md:py-6">
  
            {dataSetting?.content && (
              <div
                className="space-y-2 editor-content text-sm md:text-base"
                dangerouslySetInnerHTML={{
                  __html: dataSetting.content,
                }}
              />
            )}
  
          </div>
  
          {/* CONTACT */}
          <div className="w-full md:w-auto">
  
            <h3 className="text-[16px] font-bold text-center md:text-left">
              Liên hệ
            </h3>
  
            <div className="mt-4 md:mt-5 space-y-2 text-[13px] md:text-[14px] leading-normal text-center md:text-left">
  
              {dataSetting?.phone && <p>Sđt: {dataSetting.phone}</p>}
              {dataSetting?.email && <p>Email: {dataSetting.email}</p>}
  
              {dataSetting?.website && (
                <p>
                  Website:{' '}
                  <a
                    href={
                      dataSetting.website?.startsWith('http')
                        ? dataSetting.website
                        : `https://${dataSetting.website}`
                    }
                    target="_blank"
                    className="underline break-all"
                  >
                    {dataSetting.website}
                  </a>
                </p>
              )}
  
            </div>
          </div>
  
          {/* FANPAGE */}
          <div className="w-full md:w-auto">
  
            <h3 className="text-[16px] font-bold text-center md:text-left">
              Fanpage
            </h3>
  
            <div className="mt-4 md:mt-5 space-y-4 flex flex-col items-center md:items-start">
  
              {dataSetting?.youtube && (
                <a
                  href={dataSetting.youtube}
                  target="_blank"
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <FaYoutube className="text-[22px] text-red-500" />
                  </div>
  
                  <span className="text-[14px] font-semibold">
                    Youtube
                  </span>
                </a>
              )}
  
              {dataSetting?.facebook && (
                <a
                  href={dataSetting.facebook}
                  target="_blank"
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <FaFacebook className="text-[22px] text-blue-500" />
                  </div>
  
                  <span className="text-[14px] font-semibold">
                    Facebook
                  </span>
                </a>
              )}
  
            </div>
          </div>
  
        </div>
      </section>
      <a
        href={`https://zalo.me/${dataSetting?.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
      >
        <img
          src="/zalo.svg"
          alt="zalo"
          className="w-14 h-14 hover:scale-110 transition"
        />
      </a>
    </>
  );
}