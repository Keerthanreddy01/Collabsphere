"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { GradientButton } from "@/components/ui/GradientButton";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={containerRef} className="relative py-48 bg-[#0A0A0F] overflow-hidden grid-texture">
       {/* Background Grid Texture with subtle opacity */}
       <div className="absolute inset-0 pointer-events-none opacity-20 grid-texture" />

       <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
             <span className="text-[13px] font-mono font-bold tracking-[4px] text-[#6C63FF] uppercase">
                READY TO BUILD?
             </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }} 
            className="text-[64px] md:text-[96px] font-display font-extrabold flex flex-col leading-[0.9] tracking-tight italic mb-16"
          >
             <span className="text-white">Find your</span>
             <span className="text-[#6C63FF]">dream team.</span>
          </motion.h2>
          
          <motion.p 
               initial={{ opacity: 0 }}
               animate={isInView ? { opacity: 1 } : {}}
               transition={{ duration: 1, delay: 0.3 }} 
               className="text-[18px] text-[#5A5A6E] font-medium mb-20 max-w-lg mx-auto leading-relaxed"
          >
             Join 2,400+ builders already on Collabsphere. No noise, just builders building the future.
          </motion.p>
          
          <div className="flex flex-col items-center gap-12">
             <GradientButton 
               variant="primary" 
               size="xl" 
               className="h-[72px] px-16 bg-[#6C63FF] hover:bg-[#8B85FF] font-display font-extrabold uppercase italic tracking-wider text-[18px] rounded-full shadow-[0_12px_40px_rgba(108,99,255,0.4)] transition-all hover:scale-[1.04]"
             >
               Start Building Free →
             </GradientButton>
             
             <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="text-[12px] font-mono font-bold text-[#565668] tracking-[2px] uppercase flex items-center gap-3"
             >
                NO CREDIT CARD <span className="w-1 h-1 bg-white/20 rounded-full" /> 
                NO NOISE <span className="w-1 h-1 bg-white/20 rounded-full" /> 
                JUST BUILDERS.
             </motion.p>
          </div>
       </div>

       {/* Massive Airloop Wordmark (Bottom) */}
       <motion.div 
         className="absolute bottom-0 left-0 right-0 h-fit flex justify-center pointer-events-none select-none -z-0 translate-y-[20%]"
         style={{ y: wordmarkY }}
       >
          <span className="text-[140px] md:text-[180px] font-display font-extrabold text-[#6C63FF]/5 uppercase tracking-[-0.04em] whitespace-nowrap">
             COLLABSPHERE COLLABSPHERE COLLABSPHERE
          </span>
       </motion.div>

       {/* Decorative glows */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#6C63FF]/5 blur-[150px] rounded-full -z-10 animate-pulse pointer-events-none" />
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00D4FF]/5 blur-[120px] rounded-[100%] -z-10 pointer-events-none" />
    </section>
  );
}
