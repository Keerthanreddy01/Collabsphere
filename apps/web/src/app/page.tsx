"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/features/landing/Hero";
import { HowItWorks } from "@/components/features/landing/HowItWorks";
import { ProjectMarquee } from "@/components/features/landing/ProjectMarquee";
import { FeedPreview } from "@/components/features/landing/FeedPreview";
import { Testimonials } from "@/components/features/landing/Testimonials";
import { CTASection } from "@/components/features/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProjectMarquee />
      <FeedPreview />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
