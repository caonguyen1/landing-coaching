'use client';

import { useState } from 'react';
import {
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';

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

  const close = () => setCurrentIndex(null);

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
    <section className="mx-auto w-full max-w-6xl px-4 pt-0 py-10 md:px-2 md:py-16">
      {/* TITLE */}
      <h2 className="mb-6 text-center text-2xl font-bold lg:text-[35px]">
        Bạn có đang
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {videos.map((v, i) => (
          <button
            key={v.id}
            onClick={() => open(i)}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-[15px] pt-[75%] shadow-lg md:pt-[80%]"
          >
            {/* IMAGE */}
            <img
              src={v.image || v.thumbnail}
              alt={v.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/25" />

            {/* PLAY */}
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/20 backdrop-blur-sm transition duration-300 group-hover:scale-110 md:h-16 md:w-16 md:border-4">
              <FaPlay className="ml-1 text-base text-white md:text-2xl" />
            </div>

            {/* TITLE */}
            <div className="absolute bottom-2 left-0 w-full px-2 md:bottom-4">
              <p className="line-clamp-1 text-center text-[12px] font-bold text-white drop-shadow-lg md:text-[16px]">
                {v.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* POPUP */}
      {currentIndex !== null &&
        videos[currentIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            {/* CLOSE */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-50 cursor-pointer text-white transition hover:scale-110 md:top-6 md:right-6"
            >
              <FaTimes className="text-2xl md:text-3xl" />
            </button>

            {/* PREV */}
            <button
              onClick={prev}
              className="absolute top-1/2 left-2 z-50 -translate-y-1/2 cursor-pointer text-white transition hover:scale-110 md:left-5"
            >
              <FaChevronLeft className="text-2xl md:text-3xl" />
            </button>

            {/* NEXT */}
            <button
              onClick={next}
              className="absolute top-1/2 right-2 z-50 -translate-y-1/2 cursor-pointer text-white transition hover:scale-110 md:right-5"
            >
              <FaChevronRight className="text-2xl md:text-3xl" />
            </button>

            {/* CONTENT */}
            <div className="relative w-full max-w-5xl">
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
              <p className="mt-4 px-10 text-center text-sm text-white md:text-lg">
                {
                  videos[currentIndex]
                    .title
                }
              </p>
            </div>
          </div>
        )}
    </section>
  );
}