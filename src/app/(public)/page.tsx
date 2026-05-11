import CTA from "@/components/sections/CTA";
import Expert from "@/components/sections/Expert";
import FooterSection from "@/components/sections/footer";
import Hero from "@/components/sections/Hero";
import Highlight from "@/components/sections/Highlight";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Videos from "@/components/sections/Videos";
export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Highlight />
      <Services />
      <Expert />
      <Videos/>
      <Testimonials />
      <CTA />
      <FooterSection/>
    </main>
  );
}