"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const PROJECTS = [
   {
      name: "CYBER CORE",
      desc: "Next-gen builder dashboard.",
      color: "#6C63FF"
   },
   {
      name: "NOVA PROTOCOL",
      desc: "Cross-chain networking for devs.",
      color: "#FF6B35"
   },
   {
      name: "ORBITAL APP",
      desc: "Real-time ship tracking protocol.",
      color: "#00FF94"
   }
];

export function ShowcaseSection() {
   const targetRef = useRef<HTMLDivElement>(null);

   // Expanded scroll track [300vh] to ensure horizontal narrative has full clearance
   const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end end"]
   });

   // Horizontal translate: Corrected mapping (-200% for 3 cards)
   // We move -66.6% to reveal all 3 cards in a horizontal track of 3.
   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

   // Backdrop parallax
   const backdropX = useTransform(scrollYProgress, [0, 1], [0, -300]);

   return (
      <section
         ref={targetRef}
         // h-[300vh] provides enough track for the 100vh sticky to exist while horizontal scroll happens
         className="relative h-[300vh] bg-[var(--bg)] border-t-[4px] border-[var(--border)] z-10 transition-colors duration-500"
      >
         {/* Visual Grid Background */}
         <div className="absolute inset-0 grid-pattern opacity-[0.06] pointer-events-none" />

         {/* STICKY CINEMA STAGE (Fixed to Viewport) */}
         <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

            {/* Cinematic Backdrop Text */}
            <div className="absolute top-[20%] left-[5%] z-0 pointer-events-none">
               <motion.h2
                  style={{ x: backdropX }}
                  className="text-[100px] md:text-[160px] lg:text-[200px] font-display font-black text-[var(--text)] italic uppercase leading-none tracking-[-0.08em] whitespace-nowrap opacity-[0.04]"
               >
                  PRODUCING IMPACT.
               </motion.h2>
            </div>

            <div className="relative z-10 w-full flex items-center h-full">
               <motion.div
                  style={{ x }}
                  className="flex gap-12 md:gap-20 px-[10vw] w-max"
               >
                  {PROJECTS.map((project, index) => (
                     <div key={project.name} className="flex flex-col gap-10 shrink-0">
                        <ProjectCard project={project} index={index} />

                        {/* Meta Labels Below Cards */}
                        <div className="flex justify-between items-end px-6">
                           <div className="space-y-1">
                              <h4 className="text-2xl md:text-3xl font-display font-black text-[var(--text)] italic uppercase tracking-tighter leading-[0.8]">
                                 {project.name}
                              </h4>
                              <p className="text-[10px] font-mono font-black text-[var(--purple)] uppercase tracking-[6px] italic">
                                 {project.desc}
                              </p>
                           </div>
                           <div className="w-12 h-12 rounded-full border-2 border-[var(--text)]/20 flex items-center justify-center font-black transition-all hover:bg-[var(--text)] hover:text-[var(--bg)] cursor-pointer">↗</div>
                        </div>
                     </div>
                  ))}
               </motion.div>
            </div>

            {/* Global Perspective Action (Anchored Bottom-Right) */}
            <div className="absolute bottom-16 right-[6%] z-20">
               <button className="group flex items-center gap-6 bg-[var(--text)] border-[3px] border-[var(--text)] shadow-[12px_12px_0_var(--purple)]/20 px-10 py-5 rounded-[24px] hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none transition-all duration-500">
                  <span className="text-lg font-display font-black text-[var(--bg)] italic uppercase tracking-widest">VIEW ALL_PROJECTS</span>
                  <div className="w-6 h-6 bg-[var(--bg)]/20 rounded-full flex items-center justify-center text-xs">✦</div>
               </button>
            </div>

            {/* Hardware Detail Label (Anchored Bottom-Left) */}
            <div className="absolute bottom-12 left-[6%] opacity-20 font-mono text-[10px] tracking-[4px] uppercase italic text-[var(--text)] flex items-center gap-6">
               <div className="w-8 h-px bg-[var(--text)]" />
               PROJECT SHOWCASE v5.1 PRODUCTION-READY
            </div>
         </div>
      </section>
   );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95, y: 50 }}
         whileInView={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
         whileHover={{ y: -15, transition: { duration: 0.4 } }}
         className="relative w-[80vw] md:w-[500px] lg:w-[580px] aspect-video bg-[var(--bg-card)] border-[6px] md:border-[8px] border-[var(--text)] rounded-[40px] md:rounded-[56px] overflow-hidden group shadow-[20px_20px_0_var(--border)] transition-all duration-700 cursor-pointer"
      >
         {/* Animated Color Mesh */}
         <div
            className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
            style={{
               background: `linear-gradient(135deg, ${project.color}, transparent)`
            }}
         />

         <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

         {/* Abstract Project Identifier */}
         <div className="absolute inset-12 border-2 border-[var(--text)]/5 rounded-[40px] flex items-center justify-center opacity-10 group-hover:opacity-40 transition-all duration-700">
            <span className="text-[140px] md:text-[220px] font-display font-black italic text-[var(--text)] pointer-events-none uppercase">{project.name[0]}</span>
         </div>

         {/* Floating ID Badge */}
         <div className="absolute top-10 right-10 z-20">
            <div
               className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-3xl text-[var(--bg)] shadow-2xl border-4 border-[var(--text)] rotate-12 group-hover:rotate-[372deg] transition-all duration-1000"
               style={{ backgroundColor: project.color }}
            >
               {project.name[0]}
            </div>
         </div>

         {/* Center Viewing Reveal (Glassy) */}
         <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-90 group-hover:scale-100">
            <div className="bg-[var(--bg)]/20 backdrop-blur-3xl border-2 border-[var(--text)]/10 px-10 py-4 rounded-full font-display font-black text-[var(--text)] text-xl uppercase italic tracking-widest rotate-[-5deg]">VIEW_PROJECT_SRV</div>
         </div>
      </motion.div>
   );
}
