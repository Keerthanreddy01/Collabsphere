"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "CREATE YOUR PROFILE",
    body: "Connect your GitHub. Define your stack. Showcase your shipped features.",
    color: "#6C63FF"
  },
  {
    number: "02",
    title: "LAUNCH PROJECTS",
    body: "Post your vision or find an existing team that needs your specific expertise.",
    color: "#00D4FF"
  },
  {
    number: "03",
    title: "CONNECT & SHIP",
    body: "Join a room, coordinate in real-time, and ship world-class software together.",
    color: "#00FF94"
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
    <section ref={containerRef} className="relative py-64 bg-[#0A0A0F] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C63FF]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-48 flex flex-col items-center text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={isInView ? { opacity: 1, scale: 1 } : {}}
             className="mb-8 bg-[#6C63FF] text-white px-6 py-2.5 font-mono font-black text-xs uppercase italic rotate-[-1.5deg] rounded-xl shadow-2xl border-4 border-[#0A0A0F]"
           >
              PROCESS PROTOCOL
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
             className="text-[64px] md:text-[110px] font-display font-extrabold flex flex-col leading-[0.82] tracking-[-0.05em] italic uppercase"
           >
             <span className="text-white">THREE STEPS TO</span>
             <span className="text-[#6C63FF]">YOUR DREAM TEAM.</span>
           </motion.h2>
        </div>

        {/* Steps Horizontal Stack */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-24 items-start pt-20">
           
           {/* Animated Dotted Path (Desktop only) */}
           <div className="absolute top-[80px] left-0 right-0 hidden md:block -z-10 h-10 px-24">
              <svg width="100%" height="20" viewBox="0 0 1000 20" fill="none" className="overflow-visible">
                 <path 
                   d="M0 10 H1000" 
                   stroke="rgba(108, 99, 255, 0.2)" 
                   strokeWidth="6" 
                   strokeDasharray="16 12" 
                 />
                 <motion.path 
                   d="M0 10 H1000" 
                   stroke="#6C63FF" 
                   strokeWidth="6" 
                   style={{ pathLength }}
                   strokeLinecap="round"
                   strokeDasharray="16 12"
                 />
              </svg>
           </div>

           {STEPS.map((step, i) => (
             <div key={i} className="relative group">
                {/* PUPPET STRING */}
                <motion.div 
                    initial={{ height: 0 }}
                    animate={isInView ? { height: 160 } : {}}
                    transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                    className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-1 bg-[#6C63FF]/30 z-0 origin-top"
                >
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#6C63FF] rounded-full border-4 border-[#0A0A0F]" />
                </motion.div>

                {/* THE STEP CARD */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 100 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotate: [0, 1, -1, 0]
                  } : {}}
                  transition={{ 
                    y: { duration: 1, delay: i * 0.2 + 0.3, ease: [0.16, 1, 0.3, 1] },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                  }} 
                  className="relative z-10 bg-[#111118] border-8 border-[#0A0A0F] p-12 rounded-[48px] shadow-[20px_20px_0_rgba(10,10,15,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-500"
                >
                   {/* Number Circle */}
                   <div 
                     className="w-18 h-18 bg-[#0A0A0F] text-white border-4 border-[#6C63FF] rounded-2xl flex items-center justify-center font-display font-black text-2xl mb-12 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                     style={{ borderColor: step.color }}
                   >
                     {i + 1}
                   </div>

                   <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-6 uppercase italic tracking-tighter leading-none group-hover:text-[#6C63FF] transition-all">
                      {step.title}
                   </h3>
                   <p className="text-[18px] font-medium text-[#565668] leading-[1.6] uppercase italic group-hover:text-[#8B8B9E] transition-all">
                      {step.body}
                   </p>

                   {/* Background Number Ghost */}
                   <span className="absolute bottom-4 right-8 text-[120px] font-display font-black text-white/[0.03] select-none pointer-events-none tracking-tighter italic">
                     {step.number}
                   </span>
                </motion.div>
             </div>
           ))}
        </div>
      </div>

      {/* Background massive ghost text */}
      <div className="absolute inset-x-0 bottom-10 pointer-events-none opacity-[0.03] flex justify-center overflow-hidden translate-y-1/2">
         <span className="text-[300px] font-display font-extrabold text-white leading-none whitespace-nowrap italic uppercase">
           THE PROCESS THE PROCESS THE PROCESS
         </span>
      </div>
    </section>
  );
}
