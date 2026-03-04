"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProjectMarquee } from "@/components/landing/ProjectMarquee";
import { FeedPreview } from "@/components/landing/FeedPreview";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";

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
