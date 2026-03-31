"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { PillBadge } from "@/components/ui/PillBadge";

export function CTASection() {
   const containerRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(containerRef, { once: true, margin: "-100px" });

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
   });

   const wordmarkX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

   return (
      <section ref={containerRef} className="relative pt-40 pb-20 bg-[#6C63FF] overflow-hidden dot-texture">
         {/* Background overlays */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-white/10 dot-texture" />

         <div className="max-w-7xl mx-auto px-6 relative z-10">

            {/* Top Grid: Newsletter / Explore */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
               <div className="lg:col-span-2 space-y-8">
                  <h3 className="text-4xl font-display font-extrabold text-white italic uppercase tracking-tighter">Collab<span className="opacity-40">sphere</span></h3>
                  <div className="flex gap-4 max-w-md bg-white p-2 rounded-[24px] border-4 border-[#0A0A0F] shadow-[10px_10px_0_#0A0A0F]">
                     <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-transparent border-none outline-none px-6 text-[#0A0A0F] font-mono font-bold placeholder:text-[#0A0A0F]/40"
                     />
                     <button className="bg-[#6C63FF] text-white px-8 py-3 rounded-2xl font-display font-black italic uppercase text-xs border-4 border-[#0A0A0F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        Subscribe
                     </button>
                  </div>
                  <p className="text-white/60 font-mono font-bold text-[10px] uppercase tracking-widest">© 2026 Collabsphere. All rights reserved.</p>
               </div>

               <div className="space-y-6">
                  <h4 className="text-[12px] font-mono font-black text-white italic uppercase tracking-[4px]">Explore</h4>
                  <ul className="space-y-4">
                     {["Features", "Community", "Showcase", "Builders"].map(item => (
                        <li key={item}><button className="text-white font-display font-extrabold italic uppercase hover:text-[#FFE135] transition-colors">{item}</button></li>
                     ))}
                  </ul>
               </div>

               <div className="space-y-6">
                  <h4 className="text-[12px] font-mono font-black text-white italic uppercase tracking-[4px]">Follow Us</h4>
                  <div className="flex flex-col gap-4">
                     {["Twitter", "GitHub", "Discord"].map(item => (
                        <button key={item} className="text-left text-white font-display font-extrabold italic uppercase hover:text-[#00FF94] transition-colors flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-white/20" /> {item}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* THE MASSIVE AIRLOOP-STYLE FOOTER WORDMARK */}
            <div className="relative mt-20 group">
               <motion.div
                  style={{ x: wordmarkX }}
                  className="flex whitespace-nowrap pointer-events-none select-none opacity-20"
               >
                  <h2 className="text-[240px] md:text-[340px] font-display font-black text-white leading-none tracking-[-0.06em] italic uppercase">
                     COLLABSPHERE COLLABSPHERE
                  </h2>
               </motion.div>

               {/* Overlapping Stickers (Lets Talk / Email) */}
               <div className="absolute inset-0 flex items-center justify-center gap-8 md:gap-20">
                  {/* Lets Talk Badge */}
                  <motion.div
                     whileHover={{ scale: 1.1, rotate: 0 }}
                     className="w-32 h-32 md:w-56 md:h-56 bg-[#FF6B35] border-[6px] md:border-[12px] border-[#0A0A0F] rounded-full flex items-center justify-center rotate-[-12deg] shadow-2xl cursor-pointer"
                  >
                     <span className="text-[14px] md:text-[28px] font-display font-black text-[#0A0A0F] uppercase italic leading-tight text-center">
                        Join the<br />Community
                     </span>
                  </motion.div>

                  {/* Email Blob */}
                  <motion.div
                     whileHover={{ scale: 1.05, rotate: 0 }}
                     className="bg-[#00FF94] border-[6px] md:border-[12px] border-[#0A0A0F] px-8 md:px-14 py-4 md:py-8 rounded-full md:rounded-[40px] shadow-2xl rotate-[3deg] cursor-pointer"
                  >
                     <span className="text-[18px] md:text-[40px] font-display font-black text-[#0A0A0F] uppercase italic leading-none">
                        hi@collabsphere.dev
                     </span>
                  </motion.div>
               </div>
            </div>
         </div>

         {/* Horizontal Ticker from Airloop */}
         <div className="mt-20 border-y-8 border-[#0A0A0F] bg-white overflow-hidden py-4">
            <motion.div
               animate={{ x: [0, -1000] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="flex gap-20 whitespace-nowrap items-center"
            >
               {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="flex items-center gap-8 px-4">
                     <span className="text-2xl font-display font-black text-[#0A0A0F] italic uppercase tracking-tighter">BUILD IN PUBLIC</span>
                     <div className="w-10 h-10 bg-[#6C63FF] rounded-full border-4 border-[#0A0A0F]" />
                     <span className="text-2xl font-display font-black text-[#6C63FF] italic uppercase tracking-tighter">SHIP TOGETHER</span>
                     <div className="w-10 h-10 bg-[#FF6B35] rounded-full border-4 border-[#0A0A0F]" />
                  </div>
               ))}
            </motion.div>
         </div>
      </section>
   );
}
