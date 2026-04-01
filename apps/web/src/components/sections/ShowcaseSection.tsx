"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const PROJECTS = [
  { 
    name: "CYBER CORE", 
    desc: "Next-gen builder dashboard.", 
    img: "/project_1_showcase_1775052734961.png",
    color: "#6C63FF"
  },
  { 
    name: "NOVA PROTOCOL", 
    desc: "Cross-chain networking for devs.", 
    img: "/project_2_showcase_1775052756574.png",
    color: "#FF6B35"
  },
  { 
    name: "ORBITAL APP", 
    desc: "Real-time ship tracking protocol.", 
    img: "/project_3_showcase_1775052778130.png",
    color: "#00FF94"
  }
];

export function ShowcaseSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#0A0A0F] border-t-[8px] border-[#0A0A0F]">
      
      {/* Sticky Context (The Cinema Stage) */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Massive Backdrop Text (Cinery Style) */}
        <div className="absolute top-20 left-10 md:left-20 z-0">
           <motion.h2 
             initial={{ opacity: 0, x: -100 }}
             whileInView={{ opacity: 0.15, x: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="text-[120px] md:text-[260px] font-display font-black text-white italic uppercase leading-none tracking-[-0.08em] whitespace-nowrap"
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
                         <h4 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">{project.name}</h4>
                         <p className="text-[10px] font-mono font-black text-[#6C63FF] uppercase tracking-[6px] italic">{project.desc}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center font-black group-hover:rotate-45 transition-all cursor-pointer">→</div>
                   </div>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Cinery Styled Viewing Overlay */}
        <div className="absolute bottom-20 right-20 z-20">
           <button className="group flex items-center gap-8 bg-[#2B59FF] border-4 border-[#0A0A0F] shadow-[16px_16px_0_#0A0A0F] px-14 py-6 rounded-[32px] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-500">
              <span className="text-xl font-display font-black text-white italic uppercase tracking-widest">VIEW ALL_PROJECTS</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✦</div>
           </button>
        </div>

        {/* Hardware Detail Footer Overlay */}
        <div className="absolute bottom-10 left-20 opacity-20 font-mono text-[10px] tracking-[4px] uppercase italic text-white flex items-center gap-6">
           <div className="w-6 h-px bg-white" />
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
      className="relative w-[300px] md:w-[680px] aspect-video bg-[#111118] border-[10px] border-[#0A0A0F] rounded-[64px] overflow-hidden group shadow-[40px_40px_0_rgba(10,10,15,1)] transition-all duration-700 cursor-pointer"
    >
       <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
       
       <Image 
         src={project.img} 
         alt={project.name} 
         fill
         className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out-expo"
       />

       {/* Floating Tag Overlay */}
       <div className="absolute top-10 right-10 z-20">
          <div 
             className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl text-[#0A0A0F] rotate-12 shadow-2xl border-4 border-[#0A0A0F]" 
             style={{ backgroundColor: project.color }}
          >
             {project.name[0]}
          </div>
       </div>

       {/* PUPPET STRING HARDWARE DETAIL */}
       <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 w-1 h-[400px] bg-white opacity-10 animate-pulse" />
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0A0A0F] rounded-full border-2 border-white/20 flex items-center justify-center shadow-2xl">
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
       </div>

       {/* Editorial Label Overlay (Glassy) */}
       <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
          <div className="bg-white/10 backdrop-blur-3xl border-2 border-white/10 px-10 py-4 rounded-full font-display font-black text-white text-xl uppercase italic tracking-widest rotate-[-5deg]">VIEW PROJECT</div>
       </div>
    </motion.div>
  );
}
