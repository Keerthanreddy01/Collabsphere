import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ScrollingTicker } from "@/components/sections/ScrollingTicker";
import { StoryScroll } from "@/components/sections/StoryScroll";
import { StatsBar } from "@/components/sections/StatsBar";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ScrollingTicker />
        <StoryScroll />
        <StatsBar />
        <FeatureGrid />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
