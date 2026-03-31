"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "BUILDER PROFILES",
    icon: "★",
    description: "GitHub-native reputation system. Your PRs are your resume.",
    bg: "#6C63FF",
    span: "col-span-1"
  },
  {
    title: "PROJECT INCUBATION",
    icon: "✦",
    description: "Launch, recruit, and coordinate. One platform, zero friction.",
    bg: "#00D4FF",
    span: "col-span-1 lg:col-span-2"
  },
  {
    title: "SHIP-IN-PUBLIC FEED",
    icon: "🚀",
    description: "Build your fan base one shipped feature at a time. Get real-time boosts.",
    bg: "#00FF94",
    span: "col-span-1 lg:col-span-2"
  },
  {
    title: "COLLAB ROOMS",
    icon: "⚑",
    description: "Private spaces for your core team to coordinate without the discord noise.",
    bg: "#FFE135",
    span: "col-span-1"
  }
];

export function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-48 bg-[#0A0A0F] grid-texture">
       {/* Section Header */}
       <div className="max-w-7xl mx-auto px-6 mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 text-left">
          <div className="max-w-2xl">
             <div className="text-[14px] font-mono font-bold tracking-[8px] text-[#6C63FF] mb-8 uppercase italic border-l-4 border-[#6C63FF] pl-6">
                PLATFORM CAPABILITIES
             </div>
             <motion.h2 
               initial={{ opacity: 0, x: -60 }}
               animate={isInView ? { opacity: 1, x: 0 } : {}}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }} 
               className="text-[60px] md:text-[90px] font-display font-extrabold flex flex-col leading-[0.88] tracking-[-0.04em] italic uppercase"
             >
               <span className="text-white">EVERYTHING A</span>
               <span className="text-[#6C63FF]">BUILDER NEEDS.</span>
             </motion.h2>
          </div>
          <div className="max-w-xs pb-4">
             <p className="text-[18px] text-[#5A5A6E] font-medium leading-relaxed italic border-b border-white/10 pb-6 mb-6 uppercase">
                One platform. Zero friction. Built by developers for developers.
             </p>
             <button className="text-[12px] font-mono font-black text-white hover:text-[#6C63FF] transition-all underline underline-offset-8">VIEW ALL FEATURES</button>
          </div>
       </div>

       {/* Creative Masonry Grid */}
       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
             <FeatureCard key={i} index={i} feature={feature} isInView={isInView} />
          ))}
       </div>

       {/* Background decorative big ghost text */}
       <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] rotate-90 translate-x-1/2 origin-top-right">
          <span className="text-[300px] font-display font-extrabold italic whitespace-nowrap text-white">FEATURES FEATURES FEATURES</span>
       </div>
    </section>
  );
}

const FeatureCard = ({ feature, index, isInView }: { feature: any, index: number, isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] as any }}
      className={cn(
        "group relative h-[380px] bg-[#111118] border-4 border-[#0A0A0F] p-12 rounded-[48px] overflow-hidden transition-all duration-500 shadow-[12px_12px_0_rgba(10,10,15,1)] hover:shadow-none hover:translate-x-3 hover:translate-y-3",
        feature.span
      )}
    >
       {/* Background hover color splash like Byooooob */}
       <div 
         className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-[0.08]"
         style={{ backgroundColor: feature.bg }}
       />

       {/* Top Icon Badge - Creative Stamp style */}
       <div className="flex justify-between items-start mb-14 relative z-10">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-3xl transition-all duration-500 group-hover:rotate-[360deg] shadow-lg border-2 border-[#0A0A0F]"
            style={{ backgroundColor: feature.bg, color: feature.bg === "#FFE135" ? "#0A0A0F" : "#FFFFFF" }}
          >
             {feature.icon}
          </div>
          <div className="bg-[#0A0A0F] text-white px-5 py-2 font-mono font-black text-[10px] italic rotate-6 group-hover:rotate-0 transition-all rounded-xl shadow-lg uppercase">
             CAPABILITY #{index + 1}
          </div>
       </div>

       <div className="relative z-10">
          <h3 className="text-3xl font-display font-extrabold text-white italic uppercase mb-4 tracking-tighter leading-none group-hover:text-[#6C63FF] transition-all">
             {feature.title}
          </h3>
          <p className="text-[16px] font-medium text-[#565668] leading-[1.65] max-w-[280px] uppercase italic group-hover:text-[#8B8B9E] transition-all">
             {feature.description}
          </p>
       </div>

       {/* Corner floating element on hover */}
       <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: feature.bg }} />
    </motion.div>
  );
};
