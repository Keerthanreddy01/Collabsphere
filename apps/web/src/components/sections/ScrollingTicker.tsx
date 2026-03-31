"use client";

import { Ticker } from "@/components/ui/Ticker";

export function ScrollingTicker() {
  const items = [
    "Find Teammates",
    "Build in Public",
    "Ship Faster",
    "Open Source",
    "Developer Network",
    "Collaboration Rooms",
    "Workshops",
    "Project Incubation"
  ];

  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0F] opacity-10 pointer-events-none" />
      
      <div className="flex flex-col gap-8 md:gap-16 rotate-1 scale-105">
        <Ticker items={items} className="bg-primary/50 backdrop-blur-2xl py-6" />
        <Ticker items={items} reverse className="bg-primary/30 backdrop-blur-3xl py-6" />
      </div>
    </section>
  );
}
