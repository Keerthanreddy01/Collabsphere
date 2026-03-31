"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function CTASection() {
   const containerRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(containerRef, { once: true, margin: "-100px" });

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
   });

   // Smooth wordmark movement
   const wordmarkX = useTransform(scrollYProgress, [0, 1], [-500, 500]);

   return (
      <section ref={containerRef} className="relative pt-64 pb-32 bg-[#2B59FF] border-t-[8px] border-[#0A0A0F] overflow-hidden">
         
         {/* Heavy Airloop Dot Pattern (Sharp Border restore) */}
         <div className="absolute inset-0 opacity-20" 
              style={{ 
                backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
                backgroundSize: '40px 40px' 
              }} 
         />

         <div className="max-w-7xl mx-auto px-6 relative z-10">

            {/* Newsletter Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-80 items-center">
               
               {/* Massive Text Area */}
               <div className="lg:col-span-12 xl:col-span-7 space-y-12">
                  <motion.h3 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[72px] md:text-[140px] font-display font-black text-white italic uppercase tracking-[-0.08em] leading-[0.78]"
                  >
                     READY TO <br/><span className="text-[#B6FF33]">SHIP?</span>
                  </motion.h3>
                  
                  <div className="flex flex-col md:flex-row gap-6 max-w-2xl mt-12 group">
                     <div className="flex-1 bg-white p-2 rounded-[32px] border-4 border-[#0A0A0F] shadow-[16px_16px_0_#0A0A0F] transition-all hover:translate-x-4 hover:translate-y-4 hover:shadow-none duration-500">
                        <input
                           type="email"
                           placeholder="Enter your email"
                           className="w-full bg-transparent border-none outline-none px-8 py-5 text-[#0A0A0F] font-mono font-black placeholder:text-[#0A0A0F]/20 text-lg"
                        />
                     </div>
                     <button className="bg-[#B6FF33] text-[#0A0A0F] px-14 py-6 rounded-[32px] font-display font-black italic uppercase text-xl border-4 border-[#0A0A0F] shadow-[16px_16px_0_#0A0A0F] hover:translate-x-4 hover:translate-y-4 hover:shadow-none transition-all duration-500">
                        JOIN →
                     </button>
                  </div>
               </div>

               {/* REFILLED LINKS AREA */}
               <div className="lg:col-span-12 xl:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12 text-left relative">
                  <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-white/[0.03] border-4 border-white/5 rounded-full flex items-center justify-center font-display font-black text-[200px] text-white/[0.05] italic rotate-[20deg] select-none pointer-events-none">★</div>

                  <div className="space-y-8">
                     <h4 className="text-white font-display font-black text-2xl uppercase italic tracking-tighter">Resources</h4>
                     <ul className="space-y-4">
                        {["GitHub REPO", "NPM SDK", "DOCS (BETA)", "API STATUS"].map(item => (
                           <li key={item}><button className="text-white/60 font-display font-black text-xs hover:text-[#B6FF33] transition-colors uppercase italic tracking-widest">{item}</button></li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-8">
                     <h4 className="text-white font-display font-black text-2xl uppercase italic tracking-tighter">Ecosystem</h4>
                     <ul className="space-y-4">
                        {["Featured", "Community", "Showcase", "Licenses"].map(item => (
                           <li key={item}><button className="text-white/60 font-display font-black text-xs hover:text-[#B6FF33] transition-colors uppercase italic tracking-widest">{item}</button></li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-8 hidden md:block">
                     <h4 className="text-white font-display font-black text-2xl uppercase italic tracking-tighter">Follow</h4>
                     <ul className="space-y-4">
                        {["Twitter / X", "Instagram", "Discord", "LinkedIn"].map(item => (
                           <li key={item}><button className="text-white/60 font-display font-black text-xs hover:text-[#B6FF33] transition-colors uppercase italic tracking-widest">{item}</button></li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            {/* THE MASSIVE COLLABSPHERE WORDMARK */}
            <div className="relative mb-32 h-[450px] md:h-[600px] flex items-center justify-center overflow-visible">
               <motion.div
                  style={{ x: wordmarkX }}
                  className="flex whitespace-nowrap pointer-events-none select-none w-full justify-center"
               >
                  <h2 className="text-[200px] md:text-[450px] font-display font-black text-white leading-none tracking-[-0.08em] italic uppercase">
                     COLLABSPHERE
                  </h2>
               </motion.div>

               {/* HI-FIDELITY ORGANIC STICKERS */}
               <div className="absolute inset-x-0 bottom-[-10%] flex items-center justify-center gap-4 md:gap-32 w-full">
                  
                  {/* Flower Sticker */}
                  <motion.div
                     whileHover={{ scale: 1.1, rotate: -5 }}
                     className="relative w-56 h-56 md:w-96 md:h-96 flex items-center justify-center rotate-[-12deg] cursor-pointer group"
                  >
                     <div className="absolute inset-0 bg-[#FF7E5F] rounded-[40%_60%_70%_40%_/_40%_40%_60%_60%] border-[8px] md:border-[20px] border-[#0A0A0F] shadow-[40px_40px_0_#0A0A0F] group-hover:rotate-12 transition-all duration-700" />
                     <span className="relative z-10 text-xl md:text-6xl font-display font-black text-[#0A0A0F] uppercase italic leading-tight text-center">
                        LETS<br />TALK
                     </span>
                     <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A0A0F] border-4 border-white/20" />
                  </motion.div>

                  {/* Blob/Bone Sticker */}
                  <motion.div
                     whileHover={{ scale: 1.05, rotate: 5 }}
                     className="relative bg-[#B6FF33] border-[8px] md:border-[20px] border-[#0A0A0F] px-10 md:px-32 py-10 md:py-24 rounded-[100px_40px_120px_60px] shadow-[40px_40px_0_#0A0A0F] rotate-[6deg] cursor-pointer group"
                  >
                     <span className="text-xl md:text-6xl font-display font-black text-[#0A0A0F] uppercase italic leading-none">
                        HI@COLLAB.TECH
                     </span>
                     <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full bg-[#0A0A0F] border-4 border-white/20" />
                  </motion.div>
               </div>
            </div>

            {/* Footer Bottom */}
            <div className="pt-20 border-t-8 border-[#0A0A0F] flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="flex items-center gap-8">
                  <p className="text-[14px] font-mono font-black text-white/50 uppercase tracking-[6px]">© 2026 THE GALAXY CORP.</p>
               </div>
               <div className="flex gap-12 font-mono text-[10px] font-black text-[#B6FF33] underline underline-offset-4 decoration-2">
                  <button className="hover:text-white transition-colors">PRIVACY POLICY</button>
                  <button className="hover:text-white transition-colors">TERMS OF SERVICE</button>
               </div>
            </div>
         </div>
      </section>
   );
}
