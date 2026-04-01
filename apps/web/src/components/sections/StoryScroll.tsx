"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const BLOCKS = [
   {
      step: "01",
      title: "Draft your vision",
      headline: { part1: "Post your project.", part2: "Define your stack." },
      body: "From rust-based protocols to simple React frontends, we help you articulate your project for potential teammates."
   },
   {
      step: "02",
      title: "Scout the talent",
      headline: { part1: "Find your", part2: "co-founders." },
      body: "Browse verified builders with real project history. No LinkedIn fluff, just world-class code."
   },
   {
      step: "03",
      title: "Build in public",
      headline: { part1: "Ship early.", part2: "Get noticed." },
      body: "Share daily progress. Let the community boost your work and attract high-tier collaborators."
   },
   {
      step: "04",
      title: "Scale together",
      headline: { part1: "From project", part2: "to startup." },
      body: "The teams formed here are the CEOs and CTOs of tomorrow. Start small, ship big."
   }
];

export function StoryScroll() {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
   });

   const [activeIndex, setActiveIndex] = useState(0);

   useEffect(() => {
      return scrollYProgress.on("change", (latest) => {
         const index = Math.min(Math.floor(latest * 4), 3);
         setActiveIndex(index);
      });
   }, [scrollYProgress]);

   return (
      <section ref={containerRef} className="relative h-[300vh] bg-[var(--bg)] z-10 m-0 p-0 transition-colors duration-500">
         <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20">

            {/* Left Side: STICKY MOCKUP */}
            <div className="lg:col-span-5 hidden lg:block">
               <div className="sticky top-0 h-screen flex items-center justify-center">
                  {/* Background glow (Dynamic) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--purple)]/5 blur-[120px] rounded-full pointer-events-none" />

                  {/* The Frame */}
                  <motion.div
                     initial={{ rotate: -5, opacity: 0 }}
                     whileInView={{ rotate: -2, opacity: 1 }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="relative w-full aspect-[4/3] bg-[var(--bg-card)] rounded-[40px] border-8 border-[var(--text)] shadow-[40px_40px_0_var(--border)] overflow-hidden transition-all duration-700 p-0 transform-gpu group hover:rotate-0"
                  >
                     {/* Header */}
                     <div className="h-14 bg-[var(--bg-card)] border-b-2 border-[var(--text)] flex items-center px-6 gap-3">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
                           <div className="w-3 h-3 rounded-full bg-[#FFE135]" />
                           <div className="w-3 h-3 rounded-full bg-[#00FF94]" />
                        </div>
                     </div>

                     {/* Content Overlay */}
                     <div className="absolute inset-0 top-14 bg-[var(--bg)] overflow-hidden">
                        <AnimatePresence mode="wait">
                           <motion.div
                              key={activeIndex}
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 1.05, y: -20 }}
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full p-8"
                           >
                              {activeIndex === 0 && <UIPanel1 />}
                              {activeIndex === 1 && <UIPanel2 />}
                              {activeIndex === 2 && <UIPanel3 />}
                              {activeIndex === 3 && <UIPanel4 />}
                           </motion.div>
                        </AnimatePresence>
                     </div>
                  </motion.div>
               </div>
            </div>

            {/* Right Side: SCROLLING TEXT */}
            <div className="lg:col-span-12 xl:col-span-7">
               {BLOCKS.map((block, i) => (
                  <div key={i} className={cn("min-h-screen flex flex-col justify-center", i === 0 && "justify-start pt-20")}>
                     <motion.div
                        initial={{ opacity: 0.1, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.6 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl lg:pl-12"
                     >
                        <div className="text-[12px] font-mono font-bold tracking-[6px] text-[var(--purple)] mb-10 uppercase italic">
                           STEP {block.step} / {block.title}
                        </div>

                        <h2 className="text-[42px] md:text-[64px] font-display font-extrabold leading-[0.9] mb-8 tracking-[-0.03em] flex flex-col overflow-hidden">
                           <motion.span
                              initial={{ y: "100%" }}
                              whileInView={{ y: 0 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              className="text-[var(--text)] italic block"
                           >
                              {block.headline.part1}
                           </motion.span>
                           <motion.span
                              initial={{ y: "100%" }}
                              whileInView={{ y: 0 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                              className="text-[var(--purple)] block"
                           >
                              {block.headline.part2}
                           </motion.span>
                        </h2>

                        <p className="text-[20px] text-[var(--text-muted)] max-w-[480px] leading-[1.6] font-medium border-l-4 border-[var(--border)] pl-8 mb-12 italic uppercase tracking-tighter">
                           {block.body}
                        </p>
                     </motion.div>
                  </div>
               ))}
            </div>
         </div>

         {/* Background Ghost Text (Rescaled) */}
         <div className="absolute inset-x-0 bottom-20 pointer-events-none opacity-[0.02] flex justify-center overflow-hidden">
            <span className="text-[140px] font-display font-extrabold text-[var(--text)] leading-none whitespace-nowrap italic uppercase">
               BUILD IN PUBLIC BUILD IN PUBLIC
            </span>
         </div>
      </section>
   );
}

// UI Panel Layouts (Theme-aware versions)
const UIPanel1 = () => (
   <div className="flex flex-col gap-6">
      <div className="bg-[var(--purple)]/10 border-2 border-[var(--purple)] p-6 rounded-3xl">
         <h4 className="text-[var(--purple)] font-mono font-black text-xs uppercase mb-4">Project: Skynet.ai</h4>
         <div className="flex flex-wrap gap-2">
            {["RUST", "WASM", "ZURB"].map(t => (
               <span key={t} className="bg-[var(--text)]/5 border border-[var(--border)] px-3 py-1.5 rounded-lg text-[var(--text)] font-mono text-[9px] font-bold">{t}</span>
            ))}
         </div>
      </div>
      <div className="flex gap-4">
         <div className="flex-1 bg-[var(--text)]/5 border border-[var(--border)] h-32 rounded-3xl animate-pulse" />
         <div className="w-20 bg-[#00FF94]/10 border-2 border-[#00FF94] h-32 rounded-3xl" />
      </div>
   </div>
);

const UIPanel2 = () => (
   <div className="grid grid-cols-2 gap-4 h-full">
      {[
         { initial: "K", color: "#6C63FF" },
         { initial: "A", color: "#00D4FF" },
         { initial: "M", color: "#00FF94" },
         { initial: "S", color: "#FFE135" }
      ].map((u, i) => (
         <div key={i} className="bg-[var(--text)]/5 border border-[var(--border)] p-5 rounded-3xl flex flex-col items-center gap-3 hover:bg-[var(--text)]/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black italic shadow-lg" style={{ backgroundColor: u.color }}>{u.initial}</div>
            <div className="h-2 w-12 bg-[var(--text-muted)] opacity-20 rounded-full" />
         </div>
      ))}
   </div>
);

const UIPanel3 = () => (
   <div className="bg-[var(--text)]/5 border border-[var(--border)] p-6 rounded-[32px] h-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-full bg-[var(--purple)]" />
         <div className="h-3 w-20 bg-[var(--text-muted)] opacity-20 rounded-full" />
      </div>
      <div className="h-4 w-full bg-[var(--text)]/10 rounded-full" />
      <div className="h-4 w-3/4 bg-[var(--text)]/10 rounded-full" />
      <div className="mt-auto flex justify-between items-center">
         <div className="w-24 h-11 bg-[var(--purple)] rounded-full flex items-center justify-center text-[10px] font-black text-white italic tracking-widest border-4 border-[var(--bg)]">BOOST</div>
         <div className="text-[11px] font-mono font-black text-[#FFE135] italic">1,240 ★</div>
      </div>
   </div>
);

const UIPanel4 = () => (
   <div className="flex flex-col gap-5 h-full relative">
      <div className="self-end bg-[var(--purple)] p-5 rounded-3xl rounded-tr-none text-[11px] font-bold italic border-4 border-[var(--bg)] shadow-xl max-w-[80%] text-white">How do we optimize WASM?</div>
      <div className="self-start bg-[#00FF94] p-5 rounded-3xl rounded-tl-none text-[11px] font-black italic self-end text-black border-4 border-[var(--bg)] shadow-xl max-w-[80%]">Check the new docs!</div>
      <div className="absolute bottom-2 right-2 w-14 h-14 bg-[#FFE135] rounded-full border-4 border-[var(--bg)] flex items-center justify-center font-display font-black text-2xl rotate-12 shadow-2xl text-black">★</div>
   </div>
);
