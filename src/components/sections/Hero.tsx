import { prisma } from '@/lib/prisma';
import { BiCheckCircle } from 'react-icons/bi';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import QRCode from 'react-qr-code';

export const revalidate = 300;

async function getData() {
  const [hero, settings] = await Promise.all([
    prisma.hero.findFirst(),
    prisma.setting.findFirst(),
  ]);

  return {
    hero,
    settings,
  };
}

export default async function Hero() {
  const { hero: data, settings: dataSetting } =
    await getData();

  if (!data) return null;
  return (
    <>
      <section
      className="text-white bg-cover bg-no-repeat bg-bottom relative overflow-hidden bg-primary-800"
    >
      <div className='absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover opacity-25' 
      style={{ backgroundImage: 'url(/bg-banner.png)' }}></div>
      <img
        src="/flower.png"
        alt={data.title}
        className="absolute -top-10 -right-10 w-[200px] md:w-[250px] -rotate-90"
      />
      <img
        src="/flower.png"
        alt={data.title}
        className="absolute -bottom-10 -left-10 w-[200px] md:w-[250px] -rotate-90"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-2 flex flex-col md:flex-row gap-0 md:gap-10 items-center">

        {/* gradient */}
        <div className="z-10 absolute bottom-0 left-0 w-full bg-gradient-to-b from-primary-950/0 to-primary-950 h-[30%]" />

        {/* LEFT */}
        <div className="w-full md:w-[55%] py-4 relative z-20">

          <div className="mb-6 flex justify-center md:justify-start">
            {dataSetting?.logo && (
              <img
                src={dataSetting.logo}
                alt="logo"
                className="h-14 md:h-18 w-auto object-contain"
              />
            )}
          </div>

          <h1
            className="text-center md:text-center text-4xl md:text-6xl font-extrabold uppercase text-white leading-snug md:leading-18"
            style={{
              textShadow: `
                -4px -4px 0 var(--color-primary-900),
                4px -4px 0 var(--color-primary-900),
                -4px 4px 0 var(--color-primary-900),
                4px 4px 0 var(--color-primary-900),
                0px -4px 0 var(--color-primary-900),
                0px 4px 0 var(--color-primary-900),
                -4px 0px 0 var(--color-primary-900),
                4px 0px 0 var(--color-primary-900)
              `,
            }}
          >
            {data.title}
          </h1>

          <div className="flex flex-col items-center md:items-center">

            <ul className="mt-6 space-y-3 text-[14px] md:text-[18px]">
              {data?.bullets?.map((item: string, index: number) => (
                <li key={index} className="flex gap-2 items-start md:items-center">
                  <BiCheckCircle className="text-green-400 text-2xl md:text-3xl shrink-0 mt-[2px] md:mt-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CONTENT */}
            {data.content1 && (
              <div className="mt-6 bg-primary-950/50 p-4 rounded-xl w-full md:w-[550px] max-w-full">
                <div
                  className="text-[14px] md:text-[16px] prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: data.content1,
                  }}
                />
              </div>
            )}

            {/* QR */}
            {dataSetting?.phone && (
              <div className="rounded-[10px] bg-white p-2 shadow-xl inline-flex mt-3">
                <QRCode
                  value={`https://zalo.me/${dataSetting.phone}`}
                  size={90}
                  bgColor="transparent"
                  fgColor="#000"
                />
              </div>
            )}

            {/* CONTACT */}
            <div className="flex flex-wrap gap-3 items-center justify-center mt-4 text-[13px] md:text-[17px]">

              {dataSetting?.phone && (
                <a href={`tel:${dataSetting.phone}`} className="flex items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[16px]">
                    <FaPhoneAlt />
                  </div>
                  <span className="font-bold">{dataSetting.phone}</span>
                </a>
              )}

              {dataSetting?.website && (
                <a
                  href={
                    dataSetting.website.startsWith(
                      'http'
                    )
                      ? dataSetting.website
                      : `https://${dataSetting.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[22px]">
                    <TbWorldWww />
                  </div>

                  <span className="font-bold">
                    {dataSetting.website}
                  </span>
                </a>
              )}

              {dataSetting?.facebook && (
                <a
                  href={dataSetting.facebook}
                  target="_blank"
                  className="flex items-center gap-1.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[20px]">
                    <FaFacebookF />
                  </div>
                  <span className="font-bold">ngoclonglanh</span>
                </a>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-[45%] relative flex justify-center">
          <img
            src="/img1.png"
            alt="expert"
            className="w-[80%] md:w-full max-w-[420px] md:max-w-none"
          />
        </div>

        {/* NAME OVERLAY */}
        <div className="w-full md:w-[45%] absolute md:absolute bottom-2 md:bottom-4 right-0 md:right-[6vw] text-center z-20 px-4">
          <h1 className="text-[22px] md:text-[32px] font-bold">
            Ngọc Trương Lê
          </h1>
          <h2 className="text-[14px] md:text-[20px]">
            Nhà đào tạo – Tham vấn – Trị liệu Tâm trí
          </h2>
        </div>

      </div>
    </section>
    </>
  );
}