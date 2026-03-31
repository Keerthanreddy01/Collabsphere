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

  // Balanced scroll range that ensures the word "COLLABSPHERE" stays more centered
  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["5%", "-40%"]);

  return (
    <section ref={containerRef} className="relative pt-40 pb-20 bg-[#6C63FF] overflow-hidden dot-texture">
       {/* Background dot texture */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.2] bg-white/10 dot-texture" />
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-40">
             <div className="lg:col-span-2 space-y-8">
                <h3 className="text-5xl font-display font-extrabold text-white italic uppercase tracking-tighter">Collab<span className="opacity-40">sphere</span></h3>
                <div className="flex gap-4 max-w-md bg-white p-2 rounded-[24px] border-4 border-[#0A0A0F] shadow-[12px_12px_0_#0A0A0F]">
                   <input 
                     type="email" 
                     placeholder="Enter your email" 
                     className="flex-1 bg-transparent border-none outline-none px-6 text-[#0A0A0F] font-mono font-bold placeholder:text-[#0A0A0F]/40"
                   />
                   <button className="bg-[#6C63FF] text-white px-8 py-3 rounded-2xl font-display font-black italic uppercase text-xs border-4 border-[#0A0A0F] active:scale-95 transition-all">
                      Subscribe
                   </button>
                </div>
                <p className="text-white/60 font-mono font-bold text-[10px] uppercase tracking-widest italic">© 2026 Collabsphere. Built by developers, for developers.</p>
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
                <h4 className="text-[12px] font-mono font-black text-white italic uppercase tracking-[4px]">Connect</h4>
                <div className="flex flex-col gap-4">
                   {["Twitter", "GitHub", "Discord", "LinkedIn"].map(item => (
                     <button key={item} className="text-left text-white font-display font-extrabold italic uppercase hover:text-[#00FF94] transition-colors">
                        {item}
                     </button>
                   ))}
                </div>
             </div>
          </div>

          {/* THE MASSIVE COLLABSPHERE WORDMARK (MATCHING SCREENSHOT 4) */}
          <div className="relative h-[300px] md:h-[400px] flex items-center group mb-20">
             <motion.div 
               style={{ x: wordmarkX }}
               className="flex whitespace-nowrap pointer-events-none select-none opacity-[0.12] transition-colors duration-1000 group-hover:opacity-20"
             >
                <h2 className="text-[180px] md:text-[340px] font-display font-black text-white leading-none tracking-[-0.07em] italic uppercase">
                   COLLABSPHERE COLLABSPHERE
                </h2>
             </motion.div>

             {/* Overlapping Playful Stickers */}
             <div className="absolute inset-0 flex items-center justify-center gap-12 md:gap-24">
                {/* Join the Community Flower */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-36 h-36 md:w-64 md:h-64 bg-[#FF6B35] border-[8px] md:border-[13px] border-[#0A0A0F] rounded-full flex items-center justify-center rotate-[-12deg] shadow-[20px_20px_0_rgba(10,10,15,0.4)] cursor-pointer transition-all duration-500 z-20"
                >
                   <span className="text-[14px] md:text-[32px] font-display font-black text-[#0A0A0F] uppercase italic leading-tight text-center">
                      Join the<br/>Community
                   </span>
                </motion.div>

                {/* Email Blob / Link */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00FF94] border-[8px] md:border-[13px] border-[#0A0A0F] px-10 md:px-20 py-5 md:py-10 rounded-full md:rounded-[50px] shadow-[20px_20px_0_rgba(10,10,15,0.4)] rotate-[4deg] cursor-pointer transition-all duration-500 z-10"
                >
                   <span className="text-[20px] md:text-[46px] font-display font-black text-[#0A0A0F] uppercase italic leading-none">
                      hi@collabsphere.dev
                   </span>
                </motion.div>
             </div>
          </div>
       </div>

       {/* Horizontal Marquee Ticker */}
       <div className="mt-20 border-y-8 border-[#0A0A0F] bg-white overflow-hidden py-6">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 whitespace-nowrap items-center"
          >
             {[1,2,3,4,5].map(i => (
               <div key={i} className="flex items-center gap-12 px-6">
                  <span className="text-3xl font-display font-black text-[#0A0A0F] italic uppercase tracking-tighter">BUILD IN PUBLIC</span>
                  <div className="w-12 h-12 bg-[#6C63FF] rounded-full border-4 border-[#0A0A0F] shadow-[4px_4px_0_#0A0A0F]" />
                  <span className="text-3xl font-display font-black text-[#6C63FF] italic uppercase tracking-tighter">SHIP TOGETHER</span>
                  <div className="w-12 h-12 bg-[#FF6B35] rounded-full border-4 border-[#0A0A0F] shadow-[4px_4px_0_#0A0A0F]" />
               </div>
             ))}
          </motion.div>
       </div>
    </section>
  );
}
