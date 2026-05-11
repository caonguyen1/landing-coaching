'use client';

import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

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
    <div className="w-6xl max-w-full mx-auto py-10 md:py-16 pt-0!">
      <h2 className="text-2xl lg:text-[35px] font-bold mb-6 text-center">
        Bạn có đang
      </h2>
      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((v, i) => (
          <button
            key={v.id}
            onClick={() => open(i)}
            className="cursor-pointer group relative block w-full overflow-hidden rounded-[15px] shadow-lg pt-[80%]"
          >
            {/* Image */}
            <img
              src={v.image || v.thumbnail}
              alt={v.title}
              className="absolute h-full w-full top-0 left-0 object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Play */}
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 lg:h-16 lg:w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur-sm transition duration-300 group-hover:scale-110 ">
              <span className="ml-1  text-white pr-2">
                <FaPlay className="ml-2 text-lg md:text-2xl text-white" />
              </span>
            </div>

            {/* Title */}
            <div className="absolute left-0 w-full px-2 lg:bottom-4">
              <p className="line-clamp-1 text-center text-[14px] lg:text-[16px] font-bold text-white drop-shadow-lg">
                {v.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* POPUP */}
      {currentIndex !== null && videos[currentIndex] && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[900px] max-w-[95%]">

            {/* CLOSE */}
            <button
              onClick={close}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕
            </button>

            {/* VIDEO */}
            <iframe
              key={videos[currentIndex].youtubeId}
              className="w-full h-[500px] rounded-lg"
              src={`https://www.youtube.com/embed/${videos[currentIndex].youtubeId}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

            {/* TITLE */}
            <p className="text-white mt-3">
              {videos[currentIndex].title}
            </p>

            {/* CONTROLS */}
            <div className="flex justify-between mt-4 text-white">
              <button onClick={prev}>⟨ Prev</button>
              <button onClick={next}>Next ⟩</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}