'use client';

import { useEffect, useState } from 'react';
import { FaPlay, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

type Video = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  image: string | null;
};

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // FETCH DATA
  useEffect(() => {
    fetch('/api/admin/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const open = (index: number) => setCurrentIndex(index);
  const close = () => setCurrentIndex(null);

  const next = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % videos.length);
  };

  const prev = () => {
    if (currentIndex === null) return;
    setCurrentIndex(
      (currentIndex - 1 + videos.length) % videos.length
    );
  };

  return (
    <div className="max-w-6xl w-full mx-auto py-10 md:py-16 pt-0">

      <h2 className="text-2xl lg:text-[35px] font-bold mb-6 text-center">
        Bạn có đang
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {videos.map((v, i) => (
          <button
            key={v.id}
            onClick={() => open(i)}
            className="cursor-pointer group relative block w-full overflow-hidden rounded-[15px] shadow-lg pt-[75%] md:pt-[80%]"
          >

            {/* Image */}
            <img
              src={v.image || v.thumbnail}
              alt={v.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Play */}
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 md:h-16 md:w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 md:border-4 border-white bg-white/20 backdrop-blur-sm transition duration-300 group-hover:scale-110">
              <FaPlay className="text-white text-base md:text-2xl ml-1" />
            </div>

            {/* Title */}
            <div className="absolute left-0 bottom-2 md:bottom-4 w-full px-2">
              <p className="line-clamp-1 text-center text-[12px] md:text-[16px] font-bold text-white drop-shadow-lg">
                {v.title}
              </p>
            </div>

          </button>
        ))}
      </div>

      {/* POPUP */}
      {currentIndex !== null && videos[currentIndex] && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">

          {/* CLOSE */}
          <button
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 text-white hover:scale-110 transition cursor-pointer"
          >
            <FaTimes className="text-2xl md:text-3xl" />
          </button>

          {/* PREV */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-50 text-white hover:scale-110 transition cursor-pointer"
          >
            <FaChevronLeft className="text-2xl md:text-3xl" />
          </button>

          {/* NEXT */}
          <button
            onClick={next}
            className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-50 text-white hover:scale-110 transition  cursor-pointer"
          >
            <FaChevronRight className="text-2xl md:text-3xl" />
          </button>

          {/* CONTENT */}
          <div className="relative w-full max-w-5xl">

            {/* VIDEO */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-black pt-[56.25%] shadow-2xl">
              <iframe
                key={videos[currentIndex].youtubeId}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videos[currentIndex].youtubeId}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            {/* TITLE */}
            <p className="mt-4 text-center text-white text-sm md:text-lg px-10">
              {videos[currentIndex].title}
            </p>

          </div>
        </div>
      )}
    </div>
  );
}