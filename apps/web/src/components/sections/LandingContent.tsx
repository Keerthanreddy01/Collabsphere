"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { TickerSection } from "@/components/sections/Ticker";
import { StoryScroll } from "@/components/sections/StoryScroll";
import { StatsBar } from "@/components/sections/StatsBar";

// Lazy-load heavier sections with SSR disabled to eliminate hydration errors
const ShowcaseSection = dynamic(() => import("@/components/sections/ShowcaseSection").then(mod => mod.ShowcaseSection), { 
  ssr: false,
  loading: () => <div className="h-[100vh] bg-[var(--bg)]" />
});

const FeatureGrid = dynamic(() => import("@/components/sections/FeatureGrid").then(mod => mod.FeatureGrid), { 
  ssr: false,
  loading: () => <div className="h-[80vh] bg-[var(--bg)]" />
});

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(mod => mod.HowItWorks), { 
  ssr: false,
  loading: () => <div className="h-[100vh] bg-[var(--bg)]" />
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials), { 
  ssr: false 
});

const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => mod.CTASection), { 
  ssr: false 
});

export function LandingContent() {
  return (
    <>
      <Hero />
      <TickerSection />
      <StoryScroll />
      <ShowcaseSection />
      <StatsBar />
      <FeatureGrid />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
