"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TickerRowProps {
  items: string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

const TickerRow = ({ items, className, speed = 25, reverse = false }: TickerRowProps) => {
  return (
    <div className={cn("relative overflow-hidden whitespace-nowrap py-5 w-full", className)}>
      <div 
        className={cn("flex w-fit", reverse ? "animate-ticker-reverse" : "animate-ticker")}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-10">
            <span className="text-[16px] font-display font-extrabold uppercase italic transition-expo">
              {item}
            </span>
            <span className="mx-10 text-[18px] opacity-40">✦</span>
            {i % 4 === 0 && (
              <div className="w-[28px] h-[28px] rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] text-white">
                {String.fromCharCode(65 + (i % 26))}B
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export function TickerSection() {
  const row1 = [
    "Find Teammates",
    "Build in Public",
    "Ship Faster",
    "Open Source",
    "Developer Network",
    "Collaboration Rooms",
    "Workshops",
    "Project Incubation"
  ];

  const row2 = [
    "POST YOUR PROJECT",
    "FIND YOUR STACK",
    "BUILD IN PUBLIC",
    "SHIP TOGETHER",
    "OPEN SOURCE FIRST",
    "DEVELOPER NETWORK"
  ];

  return (
    <section className="relative py-12 flex flex-col gap-6 bg-[#0A0A0F] overflow-hidden">
      <TickerRow 
        items={row1} 
        className="bg-[#6C63FF] text-white italic" 
        speed={25} 
      />
      <TickerRow 
        items={row2} 
        className="bg-[#111118] text-[#6C63FF] font-mono italic" 
        speed={30} 
        reverse 
      />
    </section>
  );
}
