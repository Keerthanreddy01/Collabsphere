"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TickerRowProps {
  items: (string | { type: "card", img: string, label: string })[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

const TickerRow = ({ items, className, speed = 40, reverse = false }: TickerRowProps) => {
  return (
    <div className={cn("relative overflow-hidden whitespace-nowrap py-14 w-full group", className)}>
      
      {/* Edge Fades for Cinema Finish */}
      <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-inherit to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-inherit to-transparent z-10 pointer-events-none" />

      {/* DOTTED BACKGROUND PATTERN (Airloop style) */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.5) 2.5px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      <div 
        className={cn("flex w-fit items-center", reverse ? "animate-ticker-reverse" : "animate-ticker shadow-ticker")}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-20">
            {typeof item === "string" ? (
              <>
                <span className="text-[28px] md:text-[42px] font-display font-black uppercase italic tracking-[-0.04em] text-white/95">
                   {item}
                </span>
                <span className="mx-20 text-[40px] font-black text-black/20 select-none">★</span>
              </>
            ) : (
              <div className="relative h-28 w-56 mx-10 bg-[#0A0A0F] border-4 border-black/20 rounded-[30px] overflow-hidden shadow-2xl flex items-center justify-center rotate-[-3deg] group-hover:rotate-0 transition-all duration-700">
                <Image 
                  src={item.img} 
                  alt={item.label} 
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 py-2 bg-black/60 backdrop-blur-md flex items-center justify-center">
                   <span className="text-[10px] font-mono font-black text-white uppercase italic tracking-widest">{item.label}</span>
                </div>
              </div>
            )}
            
            {/* Boutique Hardware ID Badge */}
            {i % 4 === 0 && (
              <div className="w-[55px] h-[55px] rounded-2xl bg-black/30 backdrop-blur-xl border-4 border-black/20 flex flex-col items-center justify-center font-mono font-black text-[12px] text-white shadow-2xl skew-x-[-10deg] ml-10">
                 <span className="text-[8px] opacity-40 uppercase">UID</span>
                 {String.fromCharCode(65 + (i % 26))}{i % 100}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export function TickerSection() {
  const row1Items = [
    "Find Your Teammates",
    { type: "card" as const, img: "/project_1_showcase_1775052734961.png", label: "AURA BUILD" },
    "Build in Public",
    "Ship Faster",
    { type: "card" as const, img: "/project_2_showcase_1775052756574.png", label: "BOLT STACK" },
    "Open Source",
    "Developer Network",
    { type: "card" as const, img: "/project_3_showcase_1775052778130.png", label: "ZEN UI" },
    "Collaboration Rooms"
  ];

  const row2Items = [
    "POST YOUR PROJECT",
    { type: "card" as const, img: "/mini_mockup_1_1775052654655.png", label: "CODEBASE" },
    "FIND YOUR STACK",
    "BUILD IN PUBLIC",
    "SHIP TOGETHER",
    { type: "card" as const, img: "/mini_mockup_2_1775052672477.png", label: "INTERFACE" },
    "OPEN SOURCE FIRST",
    "DEVELOPER NETWORK"
  ];

  return (
    <section className="relative py-12 flex flex-col gap-10 bg-[#0A0A0F] overflow-hidden">
      
      {/* High-End Layout Lines Backdrop */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.05] px-20">
         {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full w-[1px] bg-white border-l-[1px]" />
         ))}
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <TickerRow 
          items={row1Items} 
          className="bg-[#2B59FF] shadow-[0_40px_100px_rgba(43,89,255,0.35)]" 
          speed={35} 
        />
        
        <TickerRow 
          items={row2Items} 
          className="bg-[#111118] text-white font-mono border-y-2 border-white/5" 
          speed={45} 
          reverse 
        />
      </div>

      {/* Boutique Details: Floating Atoms */}
      <div className="absolute top-[20%] left-10 w-2 h-2 bg-[#00FF94] rounded-full blur-[2px] animate-pulse" />
      <div className="absolute bottom-[20%] right-10 w-3 h-3 bg-[#FFE135] rounded-full blur-[4px] animate-pulse delay-700" />
    </section>
  );
}
