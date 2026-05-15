import { prisma } from '@/lib/prisma';

import CTA from '@/components/sections/CTA';
import Expert from '@/components/sections/Expert';
import FooterSection from '@/components/sections/footer';
import Hero from '@/components/sections/Hero';
import Highlight from '@/components/sections/Highlight';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Videos from '@/components/sections/Videos';

async function getVideos() {
  return prisma.video.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function Homepage() {
  const videos = await getVideos();

  return (
    <main className="flex flex-col">
      <Hero />

      <Highlight />

      <Services />

      <Expert />

      <Videos videos={videos} />

      <Testimonials />

      <CTA />

      <FooterSection />
    </main>
  );
}