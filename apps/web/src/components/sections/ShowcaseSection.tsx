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
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[var(--bg)] border-t-[8px] border-[var(--border)] z-10 transition-colors duration-500 overflow-hidden">
      
      {/* BOUTIQUE GRID BACKGROUND */}
      <div className="absolute inset-0 grid-pattern opacity-40 z-0 pointer-events-none" />
      
      {/* Sticky Context (The Cinema Stage) */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Massive Backdrop Text (Cinematic Theme-Sync) */}
        <div className="absolute top-20 left-10 md:left-20 z-0">
           <motion.h2 
             initial={{ opacity: 0, x: -100 }}
             whileInView={{ opacity: 0.15, x: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="text-[120px] md:text-[260px] font-display font-black text-[var(--text)] italic uppercase leading-none tracking-[-0.08em] whitespace-nowrap opacity-[0.05]"
           >
              PRODUCING IMPACT.
           </motion.h2>
        </div>

        {/* Carousel Area */}
        <div className="relative z-10 w-full px-10 md:px-20 mt-40">
           <motion.div style={{ x }} className="flex gap-20 w-max">
              {PROJECTS.map((project, i) => (
                <div key={project.name} className="flex flex-col gap-10">
                   <ProjectCard project={project} index={i} />
                   <div className="flex justify-between items-center px-6">
                      <div className="space-y-1">
                         <h4 className="text-2xl font-display font-black text-[var(--text)] italic uppercase tracking-tighter">{project.name}</h4>
                         <p className="text-[10px] font-mono font-black text-[var(--purple)] uppercase tracking-[6px] italic">{project.desc}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-[var(--text-muted)] flex items-center justify-center font-black group-hover:rotate-45 transition-all cursor-pointer">→</div>
                   </div>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Cinematic Styled Viewing Overlay (Theme-Adapting) */}
        <div className="absolute bottom-20 right-20 z-20">
           <button className="group flex items-center gap-8 bg-[var(--text)] border-4 border-[var(--text)] shadow-[16px_16px_0_var(--purple)]/20 px-14 py-6 rounded-[32px] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-500">
              <span className="text-xl font-display font-black text-[var(--bg)] italic uppercase tracking-widest">VIEW ALL_PROJECTS</span>
              <div className="w-8 h-8 bg-[var(--bg)]/20 rounded-full flex items-center justify-center">✦</div>
           </button>
        </div>

        {/* Hardware Detail Footer Overlay */}
        <div className="absolute bottom-10 left-20 opacity-20 font-mono text-[10px] tracking-[4px] uppercase italic text-[var(--text)] flex items-center gap-6">
           <div className="w-6 h-px bg-[var(--text)]" />
           PROJECT SHOWCASE v5.1 PRODUCTION-READY
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, rotate: -1.5, y: -20 }}
      className="relative w-[300px] md:w-[680px] aspect-video bg-[var(--bg-card)] border-[10px] border-[var(--text)] rounded-[64px] overflow-hidden group shadow-[40px_40px_0_var(--border)] transition-all duration-700 cursor-pointer"
    >
       {/* Background Placeholder with Project Color Gradient */}
       <div 
          className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity" 
          style={{ 
             background: `linear-gradient(45deg, ${project.color}, transparent)`
          }} 
       />
       
       <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
       
       {/* Abstract Project Mesh / Pattern */}
       <div className="absolute inset-10 border-2 border-[var(--text)]/5 rounded-[40px] flex items-center justify-center opacity-10 group-hover:opacity-30 transition-all duration-700">
          <span className="text-[120px] font-display font-black italic text-[var(--text)]">{project.name[0]}</span>
       </div>

       {/* Floating Tag Overlay */}
       <div className="absolute top-10 right-10 z-20">
          <div 
             className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl text-[var(--bg)] rotate-12 shadow-2xl border-4 border-[var(--text)]" 
             style={{ backgroundColor: project.color }}
          >
             {project.name[0]}
          </div>
       </div>

       {/* PUPPET STRING HARDWARE DETAIL */}
       <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 w-1 h-[400px] bg-[var(--text)] opacity-10 animate-pulse" />
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-[var(--text)] rounded-full border-2 border-[var(--bg)]/20 flex items-center justify-center shadow-2xl">
          <div className="w-1.5 h-1.5 bg-[var(--bg)]/40 rounded-full" />
       </div>

       {/* Editorial Label Overlay (Glassy) */}
       <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
          <div className="bg-[var(--bg)]/20 backdrop-blur-3xl border-2 border-[var(--text)]/10 px-10 py-4 rounded-full font-display font-black text-[var(--text)] text-xl uppercase italic tracking-widest rotate-[-5deg]">VIEW PROJECT</div>
       </div>
    </motion.div>
  );
}
