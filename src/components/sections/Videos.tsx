'use client';

import { useState } from 'react';
import {
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';

import {
  AnimatePresence,
} from 'framer-motion';

import MotionItem from '@/components/motion/MotionItem';

type Video = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  image: string | null;
};

type Props = {
  videos: Video[];
};

export default function Videos({
  videos,
}: Props) {
  const [currentIndex, setCurrentIndex] =
    useState<number | null>(null);

  const open = (index: number) =>
    setCurrentIndex(index);

  const close = () =>
    setCurrentIndex(null);

  const next = () => {
    if (currentIndex === null) return;

    setCurrentIndex(
      (currentIndex + 1) % videos.length
    );
  };

  const prev = () => {
    if (currentIndex === null) return;

    setCurrentIndex(
      (currentIndex - 1 + videos.length) %
        videos.length
    );
  };

  const getYoutubeId = (
    url: string
  ): string | null => {
    try {
      const parsed = new URL(url);

      if (
        parsed.hostname.includes(
          'youtube.com'
        )
      ) {
        return parsed.searchParams.get('v');
      }

      if (
        parsed.hostname.includes('youtu.be')
      ) {
        return parsed.pathname.slice(1);
      }

      return url;
    } catch {
      return url;
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-2 md:py-16">

      {/* TITLE */}
      <MotionItem variant="slideDown">
        <h2 className="mb-6 text-center text-2xl font-bold lg:text-[35px]">
          Bạn có đang
        </h2>
      </MotionItem>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">

        {videos.map((v, i) => (
          <MotionItem
            key={v.id}
            variant='slideUp'
            delay={i * 0.12}
            className="group"
          >

            <button
              onClick={() => open(i)}
              className="relative block w-full cursor-pointer overflow-hidden rounded-[18px] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative pt-[75%] md:pt-[80%]">

                {/* IMAGE */}
                <img
                  src={
                    v.image || v.thumbnail
                  }
                  alt={v.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

                {/* glow */}
                <div className="absolute inset-0 bg-primary-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* PLAY */}
                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/20 backdrop-blur-md transition duration-500 group-hover:scale-110 md:h-16 md:w-16 md:border-4">

                  <FaPlay className="ml-1 text-base text-white md:text-2xl" />

                </div>

                {/* TITLE */}
                <div className="absolute bottom-2 left-0 w-full px-2 md:bottom-4">

                  <p className="line-clamp-1 text-center text-[12px] font-bold text-white drop-shadow-lg md:text-[16px]">
                    {v.title}
                  </p>

                </div>

              </div>

            </button>

          </MotionItem>
        ))}

      </div>

      {/* POPUP */}
      <AnimatePresence>

        {currentIndex !== null &&
          videos[currentIndex] && (
            <MotionItem
              variant="fade"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            >

              {/* CLOSE */}
              <button
                onClick={close}
                className="absolute right-4 top-4 z-50 cursor-pointer text-white transition duration-300 hover:scale-110 md:right-6 md:top-6"
              >
                <FaTimes className="text-2xl md:text-3xl" />
              </button>

              {/* PREV */}
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-white transition duration-300 hover:scale-110 md:left-5"
              >
                <FaChevronLeft className="text-2xl md:text-3xl" />
              </button>

              {/* NEXT */}
              <button
                onClick={next}
                className="absolute right-2 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-white transition duration-300 hover:scale-110 md:right-5"
              >
                <FaChevronRight className="text-2xl md:text-3xl" />
              </button>

              {/* CONTENT */}
              <MotionItem
                key={
                  videos[currentIndex]
                    .youtubeId
                }
                variant="scale"
                className="relative w-full max-w-5xl"
              >

                {/* VIDEO */}
                <div className="relative overflow-hidden rounded-2xl bg-black pt-[56.25%] shadow-2xl">

                  <iframe
                    key={
                      videos[currentIndex]
                        .youtubeId
                    }
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${getYoutubeId(
                      videos[currentIndex]
                        .youtubeId
                    )}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />

                </div>

                {/* TITLE */}
                <MotionItem
                  variant="fade"
                  delay={0.2}
                >
                  <p className="mt-4 px-10 text-center text-sm text-white md:text-lg">
                    {
                      videos[currentIndex]
                        .title
                    }
                  </p>
                </MotionItem>

              </MotionItem>

            </MotionItem>
          )}

      </AnimatePresence>

    </section>
  );
}