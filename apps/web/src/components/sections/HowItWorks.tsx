"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
   {
      number: "01",
      title: "BRAIN_ARCHITECT",
      description: "Directly synchronize your architectural patterns and commit history into our neural ingestion engine.",
      tag: "PHASE_01",
      color: "#6C63FF",
      code: "0x8F_INGEST"
   },
   {
      number: "02",
      title: "NEURAL_MATCH",
      description: "Match with elite human builders who share your technical DNA and delivery velocity.",
      tag: "PHASE_02",
      color: "#00FF94",
      code: "0x4A_SYNERGY"
   },
   {
      number: "03",
      title: "ORBITAL_SHIP",
      description: "Deploy into dedicated high-fidelity rooms. Execute and deliver software at boutique agency speeds.",
      tag: "PHASE_03",
      color: "#FF6B35",
      code: "0x12_VELOCITY"
   }
];

export function HowItWorks() {
   const targetRef = useRef<HTMLDivElement>(null);
   
   const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end end"]
   });

   // Smooth progress for elite boutique-grade narrative
   const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 80,
      damping: 25,
      restDelta: 0.001
   });

   // Technical Horizontal Track (0% -> -66.6% for 3 items)
   const x = useTransform(smoothProgress, [0, 1], ["0%", "-66.6%"]);
   
   // Parallax Backdrop Narrative
   const backdropX = useTransform(smoothProgress, [0, 1], [0, -400]);

   return (
      <section 
         ref={targetRef} 
         className="relative h-[400vh] bg-[var(--bg)] border-t-[4px] border-[var(--border)] overflow-visible z-40"
      >
         {/* THE CINEMATIC STICKY STAGE */}
         <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
            
            {/* Background Engineering Atmosphere */}
            <div className="absolute inset-0 grid-pattern opacity-[0.06] z-0 pointer-events-none" />
            
            {/* Parallax Atmospheric Narrative */}
            <div className="absolute top-[18%] left-[5%] z-0 pointer-events-none">
               <motion.h2 
                  style={{ x: backdropX }}
                  className="text-[100px] md:text-[140px] font-display font-black text-[var(--text)] opacity-[0.03] italic uppercase leading-none tracking-[-0.08em] whitespace-nowrap"
               >
                  THE_PROCESS_ENGINE_SYSTEM
               </motion.h2>
            </div>

            {/* THE HORIZONTAL NARRATIVE TRACK */}
            <div className="relative z-10 w-full flex items-center h-full">
               <motion.div 
                  style={{ x }}
                  className="flex gap-[15vw] md:gap-[25vw] px-[15vw] w-max items-center"
               >
                  {STEPS.map((step, i) => (
                     <StepCard key={step.number} step={step} i={i} progress={smoothProgress} />
                  ))}
               </motion.div>
            </div>

            {/* Global Telemetry Label (Anchored Bottom-Left) */}
            <div className="absolute bottom-12 left-10 md:left-[6%] flex items-center gap-6 z-20">
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple)] animate-pulse" />
                     <span className="font-mono text-[9px] tracking-[6px] text-[var(--text)] opacity-30 uppercase italic font-black">PHASE_SYNC_HUB</span>
                  </div>
                  <div className="font-mono text-[8px] text-[var(--text-muted)] opacity-20 italic">
                     LATENCY_SYNC_ACTIVE // CLUSTER_02_READY
                  </div>
               </div>
            </div>

            {/* Phase Indicator Dashboard (Anchored Bottom-Right) */}
            <div className="absolute bottom-12 right-10 md:right-[6%] z-20 flex gap-4">
               {STEPS.map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 scale-75 md:scale-100">
                     <span className="font-mono text-[10px] text-[var(--text-muted)] opacity-20 text-center">{i+1}</span>
                     <div className="w-16 h-1.5 bg-[var(--text)]/10 rounded-full overflow-hidden">
                        <motion.div 
                           className="h-full bg-[var(--purple)]"
                           style={{ width: useTransform(smoothProgress, [i/3, (i+1)/3], ["0%", "100%"]) }}
                        />
                     </div>
                  </div>
               ))}
            </div>

         </div>
      </section>
   );
}

function StepCard({ step, i, progress }: { step: any, i: number, progress: any }) {
   return (
      <div className="relative group">
         
         {/* THE CARD FRAME (Boutique Industrial Design) */}
         <div className="relative w-[85vw] md:w-[480px] lg:w-[540px] bg-[var(--bg-card)] border-[6px] md:border-[6px] border-[var(--text)] rounded-[56px] md:rounded-[64px] p-8 md:p-10 shadow-[20px_20px_0_var(--border)] overflow-hidden transition-all duration-700 group-hover:shadow-none group-hover:translate-x-2 group-hover:translate-y-2">
            
            {/* Animated Scanning HUD Line */}
            <div 
               className="absolute top-0 left-0 w-full h-[2px] opacity-20 animate-scan"
               style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
            />

            {/* Top Identity Block */}
            <div className="flex justify-between items-start mb-12">
               <div 
                  className="w-16 h-16 rounded-[22px] border-4 border-[var(--text)] flex items-center justify-center font-display font-black text-2xl italic transition-all duration-700 shadow-2xl group-hover:scale-110"
                  style={{ background: step.color, color: "var(--bg)" }}
               >
                  {step.number}
               </div>
               <div className="text-right">
                  <div className="font-mono text-[9px] tracking-[6px] text-[var(--purple)] font-black uppercase italic mb-1">
                     {step.tag}
                  </div>
                  <div className="font-mono text-[7px] text-[var(--text-muted)] opacity-30 uppercase italic font-bold">
                     CODE_REF: {step.code}
                  </div>
               </div>
            </div>

            {/* Core Narrative Detail */}
            <div className="space-y-6">
               <h3 className="text-4xl md:text-5xl font-display font-black text-[var(--text)] uppercase italic tracking-tighter leading-none group-hover:translate-x-3 transition-transform duration-500">
                  {step.title}
               </h3>
               <div className="h-1.5 w-24 bg-[var(--purple)] rounded-full group-hover:w-full transition-all duration-1000" style={{ backgroundColor: step.color }} />
               <p className="text-[17px] md:text-[20px] font-medium text-[var(--text-muted)] leading-[1.3] uppercase italic tracking-tight max-w-[450px] group-hover:text-[var(--text)] transition-colors duration-700">
                  {step.description}
               </p>
            </div>

            {/* Micro-Interaction Footer */}
            <div className="mt-14 pt-8 border-t-2 border-[var(--border)] flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
               <div className="font-mono text-[8px] tracking-[6px] uppercase italic text-[var(--text-muted)]">
                  READY_TO_SYNCHRONIZE
               </div>
               <div className="w-10 h-10 rounded-full border-2 border-[var(--border)] flex items-center justify-center text-lg hover:bg-[var(--text)] hover:text-[var(--bg)] cursor-pointer transition-all">
                  ✦
               </div>
            </div>

         </div>

         {/* Cinematic Background Connector Line (Award-Winning Detail) */}
         <div className="absolute -left-[25vw] top-1/2 -translate-y-1/2 w-[25vw] h-px bg-[var(--border)] z-[-1] opacity-20 pointer-events-none group-hover:opacity-100 group-hover:bg-[var(--purple)] transition-all duration-1000" />
         <div className="absolute -right-[25vw] top-1/2 -translate-y-1/2 w-[25vw] h-px bg-[var(--border)] z-[-1] opacity-20 pointer-events-none group-hover:opacity-100 group-hover:bg-[var(--purple)] transition-all duration-1000" />
      </div>
   );
}
