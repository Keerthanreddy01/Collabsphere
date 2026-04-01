"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "CREATE YOUR PROFILE",
    body: "Connect your GitHub. Define your stack. Showcase your shipped features.",
    color: "var(--purple)"
  },
  {
    number: "02",
    title: "LAUNCH PROJECTS",
    body: "Post your vision or find an existing team that needs your specific expertise.",
    color: "var(--cyan)"
  },
  {
    number: "03",
    title: "CONNECT & SHIP",
    body: "Join a room, coordinate in real-time, and ship world-class software together.",
    color: "var(--green)"
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-64 bg-[var(--bg)] border-b-[8px] border-[var(--bg)] overflow-hidden transition-colors duration-500">
      
      {/* BOUTIQUE GRID BACKGROUND */}
      <div className="absolute inset-0 grid-pattern opacity-60 z-0 pointer-events-none" />

      {/* Background Decor (Dynamic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--purple)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-48 flex flex-col items-center text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={isInView ? { opacity: 1, scale: 1 } : {}}
             className="mb-8 bg-[var(--purple)] text-white px-6 py-2.5 font-mono font-black text-xs uppercase italic rotate-[-1.5deg] rounded-xl shadow-2xl border-4 border-[var(--text)]"
           >
              PROCESS PROTOCOL
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
             className="text-[64px] md:text-[110px] font-display font-extrabold flex flex-col leading-[0.82] tracking-[-0.05em] italic uppercase"
           >
             <span className="text-[var(--text)]">THREE STEPS TO</span>
             <span className="text-[var(--purple)]">YOUR DREAM TEAM.</span>
           </motion.h2>
        </div>

        {/* Steps Horizontal Stack */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-24 items-start pt-20">
           
           {/* Animated Dotted Path (Theme-Aware) */}
           <div className="absolute top-[80px] left-0 right-0 hidden md:block -z-10 h-10 px-24">
              <svg width="100%" height="20" viewBox="0 0 1000 20" fill="none" className="overflow-visible">
                 <path 
                    d="M0 10 H1000" 
                    stroke="var(--border)" 
                    strokeWidth="6" 
                    strokeDasharray="16 12" 
                 />
                 <motion.path 
                    d="M0 10 H1000" 
                    stroke="var(--purple)" 
                    strokeWidth="6" 
                    style={{ pathLength }}
                    strokeLinecap="round"
                    strokeDasharray="16 12"
                 />
              </svg>
           </div>

           {STEPS.map((step, i) => (
             <div key={i} className="relative group perspective-1000">
                {/* PUPPET STRING (Elite Minimalist) */}
                <motion.div 
                    initial={{ height: 0 }}
                    animate={isInView ? { height: 160 } : {}}
                    transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                    className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-px bg-[var(--text)]/20 z-0 origin-top"
                >
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--text)] rounded-full border-2 border-[var(--bg)]" />
                </motion.div>

                {/* THE STEP CARD (ELITE THEME-SYNC) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 100 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotateX: 0
                  } : {}}
                  transition={{ duration: 1.2, delay: i * 0.2 + 0.3, ease: [0.16, 1, 0.3, 1] }} 
                  className="relative z-10 bg-[var(--bg-card)] border-8 border-[var(--text)] p-12 rounded-[56px] shadow-[24px_24px_0_var(--text)]/[0.03] hover:translate-x-3 hover:translate-y-3 hover:shadow-none transition-all duration-700"
                >
                   <div 
                      className="w-18 h-18 bg-[var(--bg)] text-[var(--text)] border-4 rounded-2xl flex items-center justify-center font-display font-black text-2xl mb-12 shadow-xl transition-colors duration-500" 
                      style={{ borderColor: step.color }}
                   >
                     {i + 1}
                   </div>

                   <h3 className="text-3xl md:text-5xl font-display font-black text-[var(--text)] mb-6 uppercase italic tracking-tighter leading-none group-hover:text-[var(--purple)] transition-colors duration-500">
                      {step.title}
                   </h3>
                   <p className="text-[19px] font-medium text-[var(--text-muted)] leading-[1.6] uppercase italic group-hover:text-[var(--text)] transition-colors duration-500">
                      {step.body}
                   </p>

                   {/* Background Number Ghost */}
                   <span className="absolute bottom-4 right-8 text-[120px] font-display font-black text-[var(--text)]/[0.03] select-none pointer-events-none tracking-tighter italic">
                     {step.number}
                   </span>
                </motion.div>
             </div>
           ))}
        </div>
      </div>

      {/* Background massive ghost text (Dynamic) */}
      <div className="absolute inset-x-0 bottom-10 pointer-events-none opacity-[0.03] flex justify-center overflow-hidden translate-y-1/2">
         <span className="text-[300px] font-display font-extrabold text-[var(--text)] leading-none whitespace-nowrap italic uppercase">
           THE PROCESS THE PROCESS THE PROCESS
         </span>
      </div>
    </section>
  );
}
