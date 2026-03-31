"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
    <section ref={containerRef} className="relative h-[400vh] bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Side: STICKY MOCKUP */}
        <div className="lg:col-span-5 hidden lg:block">
           <div className="sticky top-0 h-screen flex items-center justify-center">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF]/5 blur-[120px] rounded-full pointer-events-none" />

              {/* The Frame */}
              <div className="relative w-full aspect-[4/3] bg-[#111118] rounded-[40px] border-8 border-[#0A0A0F] shadow-[40px_40px_0_rgba(108,99,255,0.1)] overflow-hidden rotate-[-2deg] transition-all duration-700 p-0 transform-gpu group hover:rotate-0">
                  {/* Header */}
                  <div className="h-14 bg-[#111118] border-b-2 border-[#0A0A0F] flex items-center px-6 gap-3">
                     <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
                       <div className="w-3 h-3 rounded-full bg-[#FFE135]" />
                       <div className="w-3 h-3 rounded-full bg-[#00FF94]" />
                     </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 top-14 bg-[#0A0A0F] overflow-hidden">
                     <AnimatePresence mode="wait">
                       <motion.div
                         key={activeIndex}
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.05 }}
                         transition={{ duration: 0.5 }}
                         className="h-full p-8"
                       >
                          {activeIndex === 0 && <UIPanel1 />}
                          {activeIndex === 1 && <UIPanel2 />}
                          {activeIndex === 2 && <UIPanel3 />}
                          {activeIndex === 3 && <UIPanel4 />}
                       </motion.div>
                     </AnimatePresence>
                  </div>
              </div>
           </div>
        </div>

        {/* Right Side: SCROLLING TEXT */}
        <div className="lg:col-span-7 py-20 lg:py-0">
           {BLOCKS.map((block, i) => (
             <div key={i} className="min-h-screen flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0.1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.5 }}
                  className="max-w-2xl lg:pl-12"
                >
                    <div className="text-[12px] font-mono font-bold tracking-[6px] text-[#6C63FF] mb-10 uppercase italic">
                      STEP {block.step} / {block.title}
                    </div>
                    
                    <h2 className="text-[54px] md:text-[84px] font-display font-extrabold leading-[0.85] mb-12 tracking-[-0.03em] flex flex-col">
                      <span className="text-white italic">{block.headline.part1}</span>
                      <span className="text-[#6C63FF]">{block.headline.part2}</span>
                    </h2>
                    
                    <p className="text-[20px] text-[#8B8B9E] max-w-[480px] leading-[1.6] font-medium border-l-4 border-white/10 pl-8 mb-12 italic">
                      {block.body}
                    </p>
                </motion.div>
             </div>
           ))}
        </div>
      </div>

      {/* Massive Background Ghost Text (Optional, fixed at bottom of whole section) */}
      <div className="absolute inset-x-0 bottom-20 pointer-events-none opacity-[0.02] flex justify-center overflow-hidden">
         <span className="text-[300px] font-display font-extrabold text-white leading-none whitespace-nowrap italic uppercase">
           BUILD IN PUBLIC BUILD IN PUBLIC
         </span>
      </div>
    </section>
  );
}

// UI Panel Layouts
const UIPanel1 = () => (
  <div className="flex flex-col gap-6">
     <div className="bg-[#6C63FF]/20 border-2 border-[#6C63FF] p-6 rounded-3xl">
        <h4 className="text-[#6C63FF] font-mono font-black text-xs uppercase mb-4">Project: Skynet.ai</h4>
        <div className="flex flex-wrap gap-2">
           {["RUST", "WASM", "ZURB"].map(t => (
             <span key={t} className="bg-white/10 px-3 py-1.5 rounded-lg text-white font-mono text-[9px] font-bold">{t}</span>
           ))}
        </div>
     </div>
     <div className="flex gap-4">
        <div className="flex-1 bg-white/5 border border-white/10 h-32 rounded-3xl animate-pulse" />
        <div className="w-20 bg-[#00FF94]/20 border-2 border-[#00FF94] h-32 rounded-3xl" />
     </div>
  </div>
);

const UIPanel2 = () => (
  <div className="grid grid-cols-2 gap-4 h-full">
     {[1,2,3,4].map(i => (
       <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-3xl flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10" />
          <div className="h-2 w-12 bg-white/20 rounded-full" />
       </div>
     ))}
  </div>
);

const UIPanel3 = () => (
   <div className="bg-white/5 border border-white/10 p-6 rounded-3xl h-full flex flex-col gap-4">
      <div className="h-4 w-full bg-white/10 rounded-full" />
      <div className="h-4 w-3/4 bg-white/10 rounded-full" />
      <div className="mt-auto flex justify-between items-center">
         <div className="w-20 h-10 bg-[#6C63FF] rounded-full" />
         <div className="text-[10px] font-bold text-white/40 italic">BOOSTS: 1,240</div>
      </div>
   </div>
);

const UIPanel4 = () => (
   <div className="flex flex-col gap-4 h-full justify-center">
      <div className="bg-[#6C63FF] p-4 rounded-2xl rounded-tr-none text-[10px] font-bold italic">How do we optimize WASM?</div>
      <div className="bg-[#00FF94] p-4 rounded-2xl rounded-tl-none text-[10px] font-black italic self-end text-black">Check the new docs!</div>
   </div>
);
