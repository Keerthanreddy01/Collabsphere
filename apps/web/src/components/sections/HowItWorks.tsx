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
    <section ref={containerRef} className="relative py-48 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-40 flex flex-col items-center text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={isInView ? { opacity: 1, scale: 1 } : {}}
             className="mb-8 bg-[#6C63FF] text-white px-5 py-2 font-mono font-black text-xs uppercase italic rotate-[-2deg] rounded-lg shadow-2xl"
           >
              PROCESS FLOW
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={isInView ? { opacity: 1, scale: 1 } : {}}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }} 
             className="text-[60px] md:text-[100px] font-display font-extrabold flex flex-col leading-[0.85] tracking-[-0.04em] italic uppercase"
           >
             <span className="text-white">THREE STEPS TO</span>
             <span className="text-[#6C63FF]">YOUR DREAM TEAM.</span>
           </motion.h2>
        </div>

        {/* Steps Horizontal Stack */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
           
           {/* Airloop Animated Dotted Path (Desktop only) */}
           <div className="absolute top-[80px] left-0 right-0 hidden md:block -z-10 h-10 px-24">
              <svg width="100%" height="20" viewBox="0 0 1000 20" fill="none" className="overflow-visible">
                 <path 
                   d="M0 10 H1000" 
                   stroke="rgba(108, 99, 255, 0.3)" 
                   strokeWidth="4" 
                   strokeDasharray="12 10" 
                 />
                 <motion.path 
                   d="M0 10 H1000" 
                   stroke="#6C63FF" 
                   strokeWidth="4" 
                   style={{ pathLength }}
                   strokeLinecap="round"
                   strokeDasharray="12 10"
                 />
              </svg>
           </div>

           {STEPS.map((step, i) => (
             <div key={i} className="relative group flex flex-col items-center md:items-start text-center md:text-left pt-12 md:pt-0">
                {/* Massive Decorative Number - Byooooob Ghost Style */}
                <span className="absolute top-[-30px] left-[-30px] text-[180px] font-display font-black text-[#6C63FF]/5 select-none pointer-events-none group-hover:text-[#6C63FF]/20 transition-all duration-700 italic leading-none z-0 rotate-12 group-hover:rotate-0 tracking-tighter">
                  {step.number}
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.0, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] as any }} 
                  className="relative z-10 bg-[#111118]/40 border-l-4 border-[#6C63FF] p-10 rounded-[32px] backdrop-blur-sm group-hover:bg-[#111118]/80 transition-all duration-500 hover:translate-x-3"
                >
                   <div 
                     className="w-14 h-14 bg-[#6C63FF]/10 text-[#6C63FF] border-2 border-[#6C63FF]/30 rounded-2xl flex items-center justify-center font-display font-black text-xl mb-10 transition-all group-hover:bg-[#6C63FF] group-hover:text-white"
                   >
                     {i + 1}
                   </div>
                   <h3 className="text-[26px] md:text-[30px] font-display font-extrabold text-white mb-6 uppercase italic tracking-tighter leading-none">
                      {step.title}
                   </h3>
                   <p className="text-[16px] font-medium text-[#565668] leading-[1.8] max-w-[300px] uppercase italic">
                      {step.body}
                   </p>
                </motion.div>

                {/* Floating Shape Element like Airloop */}
                {i === 1 && (
                  <motion.div 
                    animate={{ rotate: 360, y: [0, -20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-12 -right-8 w-24 h-24 bg-[#00FF94]/20 blur-2xl rounded-full z-0 pointer-events-none"
                  />
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Decorative Blob Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#6C63FF]/5 blur-[150px] rounded-full pointer-events-none translate-x-[-50%]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00D4FF]/5 blur-[150px] rounded-full pointer-events-none translate-x-[50%]" />
    </section>
  );
}
