"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------------------------------------
// BYOOOOOOB / GSAP HYBRID ASSETS (High-End Creative)
// ------------------------------------------------------------------------------------------------

const TalentSticker = ({ name, role, color, className = "", delay = 0 }: { name: string, role: string, color: string, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
    animate={{ 
       opacity: 1, 
       scale: 1, 
       rotate: [0, 5, -5, 0],
       y: [0, -15, 15, 0]
    }}
    transition={{ 
      duration: 1.2, 
      delay, 
      ease: [0.16, 1, 0.3, 1],
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className={cn("absolute z-40 pointer-events-auto cursor-pointer group", className)}
  >
    <div className="relative p-2 bg-white border-[6px] border-[#0A0A0F] rounded-[32px] shadow-[12px_12px_0_#0A0A0F] group-hover:translate-x-2组 group-hover:translate-y-2 group-hover:shadow-none transition-all">
       <div className="w-24 h-32 rounded-[24px] bg-gray-200 overflow-hidden mb-3 border-2 border-[#0A0A0F]" style={{ backgroundColor: color }}>
          <div className="w-full h-full flex items-center justify-center text-white font-display font-black text-4xl italic opacity-40">{name[0]}</div>
       </div>
       <div className="px-2 text-center pb-2">
          <h5 className="text-[10px] font-display font-black text-[#0A0A0F] uppercase leading-none mb-1">{name}</h5>
          <p className="text-[7px] font-mono font-bold text-[#0A0A0F]/50 uppercase tracking-[1px]">{role}</p>
       </div>
       {/* Sticker Badge */}
       <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FFE135] border-3 border-[#0A0A0F] rounded-full flex items-center justify-center text-[10px] font-black rotate-12">★</div>
    </div>
  </motion.div>
);

const FloatingIcon = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
    transition={{ duration: 1, delay, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
    className={cn("absolute z-30 pointer-events-none opacity-40", className)}
  >
    {children}
  </motion.div>
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-64 pb-32 overflow-visible bg-[#F8F9FA]"
    >
      {/* Visual Background: Minimal Grid (Byoooooob Style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(#0A0A0F 1px, transparent 1px), linear-gradient(90deg, #0A0A0F 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10 w-full flex flex-col items-center">
        
        {/* CENTER TYPOGRAPHY: (GSAP / BYOOOOOOB STYLE) */}
        <div className="relative mb-24 text-center">
          <h1 className="flex flex-col gap-0 md:gap-2">
            
            <motion.div 
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="text-[64px] md:text-[110px] lg:text-[145px] font-display font-black text-[#0A0A0F] leading-[0.85] tracking-[-0.06em] flex items-center justify-center gap-10 flex-wrap"
            >
               BUILD YOUR <span className="text-[#6C63FF]">DREAM</span>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
               className="text-[64px] md:text-[110px] lg:text-[145px] font-display font-black text-[#0A0A0F] leading-[0.85] tracking-[-0.06em] flex items-center justify-center gap-10 flex-wrap"
            >
               TEAM <span className="font-serif italic text-white bg-[#0A0A0F] px-8 lg:px-14 py-2 lg:py-6 rounded-[40px] lg:rounded-[80px] -rotate-2 -mt-4">/with</span>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="text-[64px] md:text-[110px] lg:text-[145px] font-display font-black text-[#6C63FF] leading-[0.85] tracking-[-0.06em] uppercase flex items-center justify-center gap-10 flex-wrap"
            >
               ELITE BUILDERS
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-[18px] lg:text-[22px] font-mono font-bold text-[#0A0A0F]/60 uppercase tracking-[2px] max-w-2xl mx-auto italic"
          >
            Find the perfect team for your business goals. <br />
            No noise, just <span className="text-[#0A0A0F] font-black underline decoration-4 decoration-[#6C63FF]">verified production history.</span>
          </motion.p>
        </div>

        {/* Global CTA Vision Group */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-10 relative w-full mb-32"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <GradientButton className="h-[84px] px-20 bg-[#0A0A0F] text-white hover:bg-[#6C63FF] font-display font-black uppercase italic tracking-[6px] text-[20px] rounded-full border-4 border-[#0A0A0F] shadow-[16px_16px_0_rgba(108,99,255,0.4)] transition-all duration-500 hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
               GET A QUOTE →
            </GradientButton>
          </div>
        </motion.div>

        {/* FLOATING TALENT STICKERS (BYOOOOOOB STYLE) */}
        <TalentSticker name="AMELIA_W" role="UI DESIGNER" color="#FF6B35" className="top-20 left-[5%] lg:left-[8%]" delay={1} />
        <TalentSticker name="S. RIVERS" role="RUST ARCHITECT" color="#6C63FF" className="top-[50%] left-[-2%] lg:left-[5%]" delay={1.2} />
        <TalentSticker name="MIA_KH" role="DESSIGN LEAD" color="#00FF94" className="bottom-20 left-[10%] lg:left-[15%]" delay={1.4} />
        
        <TalentSticker name="MAX_P" role="WASM GURU" color="#00D4FF" className="top-40 right-[1%] lg:right-[10%]" delay={1.3} />
        <TalentSticker name="LIAM_T" role="BACKEND" color="#FFE135" className="bottom-[40%] right-[-2%] lg:right-[5%]" delay={1.5} />
        <TalentSticker name="SYNE_K" role="FOUNDER" color="#0A0A0F" className="bottom-0 right-[15%] lg:right-[20%]" delay={1.7} />

        {/* GRAPHIC ASSETS (BYOOOOOOB / GSAP) */}
        <FloatingIcon className="top-[10%] right-[30%]" delay={0.5}>
           <div className="w-20 h-20 bg-[#FF6B35] rounded-full border-4 border-[#0A0A0F] shadow-xl flex items-center justify-center font-display font-black text-white text-3xl">★</div>
        </FloatingIcon>
        <FloatingIcon className="bottom-[15%] left-[25%]" delay={0.7}>
           <div className="w-16 h-16 border-4 border-[#0A0A0F] rounded-[24px] rotate-12 flex items-center justify-center p-2">
              <div className="w-full h-full bg-[#00FF94] rounded-full" />
           </div>
        </FloatingIcon>
        <FloatingIcon className="top-[55%] right-[25%]" delay={0.9}>
           <div className="w-24 h-12 bg-[#FFE135] border-4 border-[#0A0A0F] rounded-full flex items-center justify-center font-mono font-black italic text-[10px] tracking-widest text-[#0A0A0F] rotate-[-12deg]">PROTOCOL</div>
        </FloatingIcon>

      </div>
    </section>
  );
}
