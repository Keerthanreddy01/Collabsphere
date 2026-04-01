"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "PROFILE_ARCHITECT",
    body: "Map your true developer DNA by synchronizing your GitHub ecosystem into a world-class portfolio audit.",
    color: "var(--purple)",
    tag: "DNA_MAPPING"
  },
  {
    number: "02",
    title: "TEAM_SYNERGY",
    body: "Enter the neural matching engine. Find exact peers that complement your technical architecture gaps.",
    color: "var(--cyan)",
    tag: "NEURAL_MATCH"
  },
  {
    number: "03",
    title: "SHIP_VELOCITY",
    body: "Deploy into high-fidelity rooms. Coordinate and deliver software at boutique agency speeds.",
    color: "var(--green)",
    tag: "TOTAL_IMPACT"
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[var(--bg)] transition-colors duration-500">
      
      {/* THE STICKY CONTENT AREA */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 grid-pattern opacity-40 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--purple)]/5 blur-[200px] rounded-full pointer-events-none" />

        {/* Cinematic Background Header (Reduced Scale) */}
        <div className="absolute top-1/4 w-full text-center z-0 pointer-events-none px-6">
           <motion.h2 
             style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.2, 0.2, 0.1]) } as any}
             className="text-[64px] md:text-[96px] font-display font-black leading-none italic uppercase text-transparent select-none"
           >
              THE PROCESS
           </motion.h2>
        </div>

        {/* The Stacked Cards Container */}
        <div className="relative z-10 w-full max-w-4xl px-6 h-[400px]">
           {STEPS.map((step, i) => (
             <StepCard key={step.number} step={step} i={i} progress={scrollYProgress} />
           ))}
        </div>
      </div>

      {/* Global Progress Indicator (Minimalist) */}
      <div className="fixed bottom-12 right-12 z-50 flex flex-col items-end gap-2 pr-4 border-r-2 border-[var(--border)]">
         <span className="font-mono text-[10px] tracking-[4px] text-[var(--purple)]">SYSTEM_PHASE</span>
         <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <motion.div 
                key={i} 
                className="w-2 h-2 bg-[var(--text)]/20 rounded-full"
                style={{ backgroundColor: useTransform(scrollYProgress, [i/3, (i+0.5)/3, (i+1)/3], ["rgba(var(--text-rgb), 0.2)", "var(--purple)", "var(--purple)"]) }}
              />
            ))}
         </div>
      </div>
    </section>
  );
}

function StepCard({ step, i, progress }: { step: any, i: number, progress: any }) {
  const start = i / STEPS.length;
  const end = (i + 1) / STEPS.length;

  const y = useTransform(progress, [start, end], [600, 0]);
  const scale = useTransform(progress, [start, end], [0.8, 1]);
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0.8]);
  const rotate = useTransform(progress, [start, end], [10, 0]);

  // Special "Stacking" Logic: stay at 0 once reached
  const stickyY = useTransform(progress, (val: number) => {
    if (val < start) return 600;
    if (val > end) return -20 * (val - end) * 500; 
    return 0;
  });

  const translateY = useTransform(progress, [start, end], [400, 0]);

  return (
    <motion.div
      style={{ 
        y: translateY,
        scale,
        opacity,
        rotateX: rotate,
        zIndex: i + 10
      }}
      className="absolute inset-0 flex items-center justify-center perspective-[1000px]"
    >
       <div className="relative w-full max-w-xl group">
          {/* THE BOUTIQUE HARDWARE CARD (Reduced Scale) */}
          <div className="bg-[var(--bg-card)] border-[4px] border-[var(--text)] p-7 md:p-8 rounded-[40px] shadow-[12px_12px_0_var(--text)]/[0.03] transition-all duration-700 overflow-hidden">
             
             {/* Hud Interface Detail */}
             <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl border-2 border-[var(--text)]/10 flex items-center justify-center font-display font-black text-xl italic group-hover:bg-[var(--purple)] group-hover:text-white transition-all">
                   {step.number}
                </div>
                <div className="font-mono text-[8px] tracking-[4px] text-[var(--purple)] opacity-50 uppercase">
                   {step.tag}
                </div>
             </div>

             <h3 className="text-3xl md:text-4xl font-display font-black text-[var(--text)] mb-4 uppercase italic tracking-tighter leading-none">
                {step.title}
             </h3>
             <p className="text-[14px] md:text-[16px] font-medium text-[var(--text-muted)] leading-relaxed uppercase italic max-w-sm">
                {step.body}
             </p>

             <div className="mt-8 pt-6 border-t border-[var(--border)] flex justify-between items-center">
                <div className="font-mono text-[7px] tracking-[4px] opacity-20 group-hover:opacity-100 transition-all">
                   ENCRYPTION_STATUS: OK
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[var(--text)]/10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:bg-[var(--purple)] group-hover:text-white transition-all">
                   ↓
                </div>
             </div>
          </div>

          {/* Technical Alignment Marker */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-px bg-[var(--text)] opacity-20" />
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-px bg-[var(--text)] opacity-20" />
       </div>
    </motion.div>
  );
}
