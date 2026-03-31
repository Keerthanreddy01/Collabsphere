"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "Finally found my backend co-founder here. We shipped our MVP in 6 weeks.",
    author: "Alex K.",
    role: "Full-Stack Developer",
    rotate: -3.5,
    bg: "#6C63FF"
  },
  {
    quote: "Posted a React bug at 11pm. Had 3 responses with working code by midnight. Unreal.",
    author: "Priya M.",
    role: "Frontend Engineer",
    rotate: 2.2,
    bg: "#00D4FF"
  },
  {
    quote: "Collabsphere is what LinkedIn wishes it was for developers. No noise, just builders.",
    author: "James O.",
    role: "Indie Hacker",
    rotate: -1,
    bg: "#00FF94"
  }
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-48 bg-[#6C63FF] overflow-hidden dot-texture">
       {/* High-quality background texture overlay */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.14] bg-white/10 dot-texture" />

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Byooooob Signature Header */}
          <div className="mb-32 flex flex-col items-center md:items-start text-center md:text-left">
             <motion.h2 
               initial={{ opacity: 0, x: -60 }}
               animate={isInView ? { opacity: 1, x: 0 } : {}}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }} 
               className="text-[60px] md:text-[110px] font-display font-extrabold flex flex-col leading-[0.82] tracking-[-0.05em] uppercase italic"
             >
               <span className="text-white">KISSIES FROM</span>
               <span className="text-[#FFE135]">OUR PARTNERS.</span>
             </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 perspective-[2000px] items-center">
             {TESTIMONIALS.map((t, i) => (
               <motion.div
                 key={t.author}
                 initial={{ opacity: 0, y: 80, rotate: t.rotate * 2 }}
                 animate={isInView ? { opacity: 1, y: 0, rotate: t.rotate } : {}}
                 transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] as any }}
                 whileHover={{ scale: 1.08, rotate: 0, z: 50 }}
                 className="relative h-full bg-[#f5f4ee] p-12 rounded-[40px] border-8 border-[#0A0A0F] shadow-[30px_30px_0_rgba(10,10,15,0.4)] flex flex-col justify-between group cursor-default transition-all duration-500"
               >
                  {/* Circular Stamp Badge from Screenshot */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#FFE135] border-8 border-[#0A0A0F] rounded-full flex flex-col items-center justify-center rotate-[-12deg] group-hover:rotate-0 transition-transform duration-700 z-20 shadow-2xl overflow-hidden p-2">
                     <span className="text-[10px] font-mono font-black text-[#0A0A0F] text-center leading-[1.1]">DIL KHOL KE BOLIYE</span>
                     <div className="h-px w-full bg-[#0A0A0F]/20 my-1" />
                     <span className="text-[8px] font-mono font-bold text-[#0A0A0F]/60">VERIFIED BUILDER</span>
                  </div>

                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-10 overflow-hidden">
                     <div className="w-12 h-12 bg-[#0A0A0F] rounded-xl flex items-center justify-center font-display font-black text-white italic text-xl group-hover:rotate-[360deg] transition-all duration-700">
                        {t.author[0]}
                     </div>
                     <span className="text-[#0A0A0F] font-display font-black text-xs uppercase tracking-widest border-b-4 border-[#0A0A0F] pb-1">
                        BUILDER FEEDBACK
                     </span>
                  </div>
                  
                  <p className="text-[20px] md:text-[24px] font-extrabold text-[#0A0A0F] leading-[1.5] italic z-10 mb-20 tracking-tighter">
                     “{t.quote}”
                  </p>

                  <div className="flex items-center gap-4 pt-10 border-t-4 border-[#0A0A0F]/5">
                     <div>
                        <h4 className="text-[18px] font-display font-black text-[#0A0A0F] italic uppercase leading-none mb-1">{t.author}</h4>
                        <p className="text-[14px] font-mono font-bold text-[#565668] uppercase tracking-tight">{t.role}</p>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>
       </div>

       {/* Massive Floating Ghost Shapes */}
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
         className="absolute -top-48 -left-48 w-[600px] h-[600px] border-[40px] border-[#FFE135]/10 rounded-full select-none pointer-events-none"
       />
    </section>
  );
}
