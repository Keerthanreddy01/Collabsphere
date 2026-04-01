import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TickerSection } from "@/components/sections/Ticker";
import { StoryScroll } from "@/components/sections/StoryScroll";
import { StatsBar } from "@/components/sections/StatsBar";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F] selection:bg-[#6C63FF]/30">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <TickerSection />
        <StoryScroll />
        <ShowcaseSection />
        <StatsBar />
        <FeatureGrid />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
    </div>
  );
}
