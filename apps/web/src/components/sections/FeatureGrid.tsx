"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "TEAM MATCHING",
    icon: "✦",
    description: "Browse verified builders with real project history. No LinkedIn fluff, just world-class code.",
    bg: "var(--purple)",
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "BUILD IN PUBLIC",
    icon: "⚐",
    description: "Share daily progress with the community and attract high-tier collaborators.",
    bg: "var(--green)",
    span: "col-span-1"
  },
  {
    title: "PROJECT INCUBATOR",
    icon: "★",
    description: "The teams formed here are the CEOs and CTOs of tomorrow. Start small, ship big.",
    bg: "var(--yellow)",
    span: "col-span-1"
  },
  {
    title: "COLLAB ROOMS",
    icon: "⚒",
    description: "Private spaces for your core team to coordinate without the discord noise.",
    bg: "var(--cyan)",
    span: "col-span-1 md:col-span-2"
  }
];

export function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-48 bg-[var(--bg)] grid-pattern transition-colors duration-500">
       {/* Section Header */}
       <div className="max-w-7xl mx-auto px-6 mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 text-left">
          <div className="max-w-2xl">
             <div className="text-[14px] font-mono font-bold tracking-[8px] text-[var(--purple)] mb-8 uppercase italic border-l-4 border-[var(--purple)] pl-6">
                PLATFORM CAPABILITIES
             </div>
             <motion.h2 
               initial={{ opacity: 0, x: -60 }}
               animate={isInView ? { opacity: 1, x: 0 } : {}}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }} 
               className="text-[60px] md:text-[90px] font-display font-extrabold flex flex-col leading-[0.88] tracking-[-0.04em] italic uppercase"
             >
                <span className="text-[var(--text)]">EVERYTHING A</span>
                <span className="text-[var(--purple)]">BUILDER NEEDS.</span>
             </motion.h2>
          </div>
          <div className="max-w-xs pb-4">
             <p className="text-[18px] text-[var(--text-muted)] font-medium leading-relaxed italic uppercase border-b-4 border-[var(--bg-card)] pb-6">
                We've built tools that help developers focus on shipping, not networking.
             </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} isInView={isInView} />
          ))}
       </div>
    </section>
  );
}

function FeatureCard({ feature, index, isInView }: { feature: any, index: number, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 100 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] as any }}
      className={cn(
        "group relative h-[440px] bg-[var(--bg-card)] border-8 border-[var(--text)] p-12 rounded-[56px] overflow-hidden transition-all duration-500 shadow-[20px_20px_0_var(--purple)]/10 hover:shadow-none hover:translate-x-2 hover:translate-y-2",
        feature.span
      )}
    >
       {/* Background Reveal Shape */}
       <div 
         className="absolute top-0 right-0 w-48 h-48 -translate-y-1/2 translate-x-1/2 rounded-full opacity-[0.08] transition-all duration-700 group-hover:scale-[8] blur-3xl pointer-events-none"
         style={{ background: feature.bg }}
       />

       <div className="relative z-10 h-full flex flex-col items-start gap-10">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-black text-4xl italic shadow-xl group-hover:rotate-[360deg] transition-all duration-1000 border-4 border-[var(--text)]"
            style={{ background: feature.bg, color: "var(--bg)" }}
          >
             {feature.icon}
          </div>
          
          <div className="space-y-4">
             <h3 className="text-3xl md:text-4xl font-display font-black text-[var(--text)] italic leading-tight uppercase underline decoration-[var(--purple)] decoration-8 underline-offset-8 mt-2">
                {feature.title}
             </h3>
             <p className="text-[17px] md:text-[19px] text-[var(--text-muted)] leading-[1.6] group-hover:text-[var(--text)] transition-colors duration-500 font-medium italic uppercase tracking-tighter max-w-[320px]">
                {feature.description}
             </p>
          </div>

          <div className="mt-auto self-end opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-3 duration-500">
             <span className="text-[12px] font-mono font-black text-[var(--purple)] tracking-[6px] uppercase italic">REVEAL DEPTH →</span>
          </div>
       </div>

       {/* String Screw Dot */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--text)] rounded-full border-2 border-[var(--bg)]/5" />
    </motion.div>
  );
}
