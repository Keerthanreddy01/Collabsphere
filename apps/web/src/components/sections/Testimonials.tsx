"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "Finally found my backend co-founder here. We shipped our MVP in 6 weeks.",
    author: "Alex K.",
    role: "Full-Stack Developer",
    rotate: -1.5,
    bg: "#6C63FF"
  },
  {
    quote: "Posted a React bug at 11pm. Had 3 responses with working code by midnight. Unreal.",
    author: "Priya M.",
    role: "Frontend Engineer",
    rotate: 0,
    bg: "#00D4FF"
  },
  {
    quote: "Collabsphere is what LinkedIn wishes it was for developers. No noise, just builders.",
    author: "James O.",
    role: "Indie Hacker",
    rotate: 1,
    bg: "#00FF94"
  }
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-[#6C63FF] overflow-hidden dot-texture">
       {/* Background dot texture with white dots at 12% opacity */}
       <div className="absolute inset-0 pointer-events-none opacity-10 bg-white/10 dot-texture" />

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Byooooob Header */}
          <div className="mb-24 flex flex-col items-start text-left">
             <motion.h2 
               initial={{ opacity: 0, x: -60 }}
               animate={isInView ? { opacity: 1, x: 0 } : {}}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }} 
               className="text-[48px] md:text-[72px] font-display font-extrabold flex flex-col leading-[1] tracking-tight uppercase"
             >
               <span className="text-white">WHAT BUILDERS</span>
               <span className="text-[#FFE135] italic">ARE SAYING.</span>
             </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[2000px]">
             {TESTIMONIALS.map((t, i) => (
               <motion.div
                 key={t.author}
                 initial={{ opacity: 0, y: 60 }}
                 animate={isInView ? { opacity: 1, y: 0 } : {}}
                 transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
                 whileHover={{ scale: 1.05, rotate: 0, y: -8 }}
                 className="relative h-full bg-[#f5f4ee] p-12 rounded-[24px] shadow-2xl flex flex-col justify-between group transition-all duration-300"
                 style={{ rotate: `${t.rotate}deg` }}
               >
                  {/* Large Quote Mark */}
                  <span className="absolute top-6 left-8 text-[80px] font-display font-black text-[#6C63FF]/15 leading-none select-none italic">
                     “
                  </span>
                  
                  <p className="text-[20px] font-semibold text-[#0A0A0F] leading-[1.55] italic z-10 mb-12">
                     {t.quote}
                  </p>

                  <div className="space-y-6">
                    <div className="h-px w-full bg-black/10" />
                    <div className="flex items-center gap-4">
                       <div 
                         className="w-11 h-11 rounded-full flex items-center justify-center font-display font-extrabold italic text-white text-base"
                         style={{ backgroundColor: t.bg }}
                       >
                         {t.author[0]}
                       </div>
                       <div>
                          <h4 className="text-[16px] font-display font-extrabold text-[#0A0A0F] italic uppercase">{t.author}</h4>
                          <p className="text-[14px] font-medium text-[#565668]">{t.role}</p>
                       </div>
                    </div>
                  </div>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}
