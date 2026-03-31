"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Create your builder profile",
    body: "Connect your GitHub, define your roles, and showcase your best work."
  },
  {
    number: "02",
    title: "Launch or browse projects",
    body: "Post your vision or find an existing team that needs your specific expertise."
  },
  {
    number: "03",
    title: "Apply, connect, and ship",
    body: "Join a room, coordinate in real-time, and ship world-class software."
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
    <section ref={containerRef} className="relative py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="mb-32 flex flex-col items-start">
           <motion.h2 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={isInView ? { opacity: 1, scale: 1 } : {}}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }} 
             className="text-[48px] md:text-[72px] font-display font-extrabold flex flex-col leading-[1] tracking-tight italic"
           >
             <span className="text-white">Three steps to</span>
             <span className="text-[#6C63FF]">your dream team.</span>
           </motion.h2>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-24 items-center">
           
           {/* Airloop Dotted Line (Desktop only) */}
           <div className="absolute top-[60px] left-0 right-0 hidden md:block -z-10 h-10">
              <svg width="100%" height="20" viewBox="0 0 1000 20" fill="none" className="overflow-visible">
                 <path 
                   d="M0 10 H1000" 
                   stroke="rgba(108, 99, 255, 0.3)" 
                   strokeWidth="3" 
                   strokeDasharray="8 6" 
                 />
                 <motion.path 
                   d="M0 10 H1000" 
                   stroke="#6C63FF" 
                   strokeWidth="3" 
                   style={{ pathLength }}
                   strokeLinecap="round"
                   strokeDasharray="8 6"
                 />
              </svg>
           </div>

           {STEPS.map((step, i) => (
             <div key={i} className="relative group text-center md:text-left">
                {/* Massive Background Number */}
                <span className="absolute top-[-40px] left-[-20px] text-[120px] font-display font-extrabold text-[#6C63FF]/15 select-none pointer-events-none group-hover:text-[#6C63FF]/30 transition-all duration-500 italic leading-none z-0">
                  {step.number}
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] as any }} 
                  className="relative z-10 pl-6"
                >
                   <h3 className="text-[24px] font-display font-extrabold text-white mb-6 uppercase italic tracking-tight">
                      {step.title}
                   </h3>
                   <p className="text-[16px] font-medium text-[#565668] leading-[1.7] max-w-[280px]">
                      {step.body}
                   </p>
                </motion.div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
