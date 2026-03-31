"use client";

import { cn } from "@/lib/utils";

interface TickerProps {
  items: string[];
  className?: string;
  reverse?: boolean;
}

export function Ticker({ items, className, reverse = false }: TickerProps) {
  return (
    <div className={cn("relative overflow-hidden whitespace-nowrap py-4", className)}>
      <div className={cn("flex", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/90">
              {item}
            </span>
            <span className="mx-8 text-primary opacity-50">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
