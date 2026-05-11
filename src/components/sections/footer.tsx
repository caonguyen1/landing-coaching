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
    <section className="bg-primary-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-6xl px-2 items-start justify-between gap-4">
        
        {/* LEFT BOX */}
        <div className="w-[40%] rounded-[15px] bg-primary-900 px-7 py-6">
          {dataSetting?.content &&
            <div
              className="space-y-2 editor-content"
              dangerouslySetInnerHTML={{
                __html: dataSetting.content,
              }}
            />
          }
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-[16px] font-bold">Liên hệ</h3>

          <div className="mt-5 space-y-2 text-[14px] leading-normal">
            {dataSetting?.phone && <p>Sđt: {dataSetting.phone}</p>}
            {dataSetting?.email && <p>Email: {dataSetting.email}</p>}
            {dataSetting?.website && <p>Website: <a
                  href={
                    dataSetting.website?.startsWith('http')
                      ? dataSetting.website
                      : `https://${dataSetting.website}`
                  }
                  target="_blank"
                >{dataSetting.website}
                </a></p>
            }
          </div>
        </div>

        {/* FANPAGE */}
        <div>
          <h3 className="text-[16px] font-bold">Fanpage</h3>

          <div className="mt-5 space-y-4">
            {dataSetting?.youtube &&
            <a href={dataSetting.youtube} target="_blank" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <FaYoutube className="text-[22px] text-red-500" />
              </div>

              <span className="text-[14px] font-semibold">
                Youtube
              </span>
            </a>
            }
            {dataSetting?.facebook &&
              <a href={dataSetting.facebook} target="_blank"className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <FaFacebook className="text-[22px] text-blue-500" />
                </div>

                <span className="text-[14px] font-semibold">
                  Facebook
                </span>
              </a>
            }
          </div>
        </div>
      </div>
    </section>
  );
}