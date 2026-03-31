"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const BLOCKS = [
  {
    step: "01",
    title: "POST YOUR PROJECT",
    headline: { part1: "Your idea deserves", part2: "a real team." },
    body: "Launch your project in minutes. Define your stack, set open roles, and let motivated builders find you."
  },
  {
    step: "02",
    title: "FIND YOUR MATCH",
    headline: { part1: "Skill-matched.", part2: "Motivation-verified." },
    body: "Browse builders by their actual GitHub activity, not just a resume."
  },
  {
    step: "03",
    title: "BUILD IN PUBLIC",
    headline: { part1: "Progress is", part2: "the product." },
    body: "Share what you shipped today. Get feedback. Boost others."
  },
  {
    step: "04",
    title: "GET HELP INSTANTLY",
    headline: { part1: "Stuck? A senior dev", part2: "is one post away." },
    body: "Post your bug, your architecture question, your decision."
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
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    });
  }, [scrollYProgress, activeIndex]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0A0A0F]">
      <div className="sticky top-0 h-screen w-full flex items-center px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative h-full items-center">
          
          {/* Left Panel - Sticky Browser Mockup (45%) */}
          <div className="lg:col-span-5 hidden lg:flex h-full items-center justify-center relative">
            <div className="relative w-[520px] aspect-[16/10] bg-[#111118] rounded-[24px] border border-[#6C63FF]/30 shadow-[0_0_80px_rgba(108,99,255,0.15)] overflow-hidden scale-105 rotate-[-1deg] transition-expo hover:rotate-0 p-1">
              
              {/* Browser Chrome */}
              <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-5 gap-2 relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#FF6B35]/50 shadow-[0_0_10px_rgba(255,107,53,0.3)]" />
                <div className="w-3 h-3 rounded-full bg-[#FFE135]/50 shadow-[0_0_10px_rgba(255,225,53,0.3)]" />
                <div className="w-3 h-3 rounded-full bg-[#00FF94]/50 shadow-[0_0_10px_rgba(0,255,148,0.3)]" />
              </div>
              
              {/* Screen Content */}
              <div className="absolute inset-x-1 bottom-1 top-11 bg-[#0A0A0F] font-sans">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full p-8"
                  >
                    {activeIndex === 0 && <Screen1 />}
                    {activeIndex === 1 && <Screen2 />}
                    {activeIndex === 2 && <Screen3 />}
                    {activeIndex === 3 && <Screen4 />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Panel - Scrollable Content Blocks (55%) */}
          <div className="lg:col-span-7 h-full relative overflow-visible">
            {BLOCKS.map((block, i) => (
              <ContentBlock 
                key={i} 
                block={block} 
                isActive={activeIndex === i}
                index={i} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ContentBlock = ({ block, isActive, index }: { block: typeof BLOCKS[0], isActive: boolean, index: number }) => {
  return (
    <div className="h-screen flex flex-col justify-center lg:pl-24 transition-all duration-700">
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.1, y: isActive ? 0 : 40 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <motion.div 
           animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
           className="text-[11px] font-mono font-bold tracking-[4px] text-[#6C63FF] mb-6 uppercase"
        >
          STEP {block.step} / {block.title}
        </motion.div>
        
        <h2 className="text-[64px] font-display font-bold leading-[1] mb-10 tracking-tight italic flex flex-col">
          <span className="text-white">{block.headline.part1}</span>
          <span className="text-[#6C63FF]">{block.headline.part2}</span>
        </h2>
        
        <p className="text-[18px] text-[#8B8B9E] max-w-[460px] leading-[1.7] font-medium mb-10">
          {block.body}
        </p>

        <div className="flex gap-3">
           <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[12px] font-mono font-bold text-white/50">React</div>
           <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[12px] font-mono font-bold text-white/50">TypeScript</div>
        </div>
      </motion.div>
    </div>
  );
};

// Mini UI screen components for the mockup
const Screen1 = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <div className="h-4 w-[60px] bg-white/5 rounded-full" />
      <div className="h-10 w-full bg-white/10 rounded-xl" />
    </div>
    <div className="h-32 w-full bg-[#6C63FF]/10 border border-[#6C63FF]/30 rounded-2xl flex items-center justify-center">
       <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#6C63FF] flex items-center justify-center font-display text-white">S</div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6C63FF]">Project Details Form</div>
       </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
             <div className="w-6 h-6 rounded-lg bg-[#00FF94]/20 flex items-center justify-center text-[10px] text-[#00FF94]">✓</div>
             <div className="h-2 w-16 bg-white/20 rounded-full" />
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="w-6 h-6 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center text-[10px] text-[#6C63FF]">2</div>
              <div className="h-2 w-16 bg-white/20 rounded-full" />
        </div>
    </div>
  </div>
);

const Screen2 = () => (
  <div className="space-y-8">
    <div className="flex items-center gap-4">
       <div className="w-16 h-16 rounded-full bg-[#00FF94] shadow-[0_0_20px_rgba(0,255,148,0.2)]" />
       <div className="space-y-3">
          <div className="h-4 w-[120px] bg-white/20 rounded-full" />
          <div className="h-3 w-[80px] bg-white/10 rounded-full" />
       </div>
    </div>
    <div className="h-px bg-white/5" />
    <div className="grid grid-cols-2 gap-6">
       {[
         { l: "Commits", v: "2.4k", c: "#6C63FF" },
         { l: "Languages", v: "TS, RS, PY", c: "#00D4FF" }
       ].map(s => (
         <div key={s.l} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest">{s.l}</div>
            <div className="text-[18px] font-display font-extrabold text-white uppercase italic">{s.v}</div>
            <div className={`h-1.5 w-full bg-[${s.c}]/10 rounded-full`} />
         </div>
       ))}
    </div>
  </div>
);

const Screen3 = () => (
   <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 space-y-5">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF63A5]" />
            <div>
               <div className="h-3 w-20 bg-white/30 rounded-full mb-1.5" />
               <div className="h-2.5 w-12 bg-white/10 rounded-full" />
            </div>
         </div>
         <p className="text-[14px] leading-relaxed text-white/70 italic px-2">
            Just shipped dark mode for Skynet.ai 🚀. The new GSAP transitions feel insane.
         </p>
         <div className="flex gap-4 px-2 pt-2">
            <div className="flex items-center gap-2 text-[10px] text-[#6C63FF] font-bold">
               <div className="w-5 h-5 rounded-full bg-[#6C63FF]/20 flex items-center justify-center">✦</div> 482
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#00FF94] font-bold">
               <div className="w-5 h-5 rounded-full bg-[#00FF94]/20 flex items-center justify-center">⚑</div> 12k
            </div>
         </div>
      </div>
   </div>
);

const Screen4 = () => (
   <div className="space-y-6 pt-4">
      <div className="bg-white/5 border-l-4 border-[#6C63FF] p-6 rounded-r-2xl">
         <div className="text-[10px] font-mono font-bold text-[#6C63FF] mb-2 uppercase tracking-tight">@junior_dev asked:</div>
         <p className="text-[13px] text-white/90 italic font-medium leading-relaxed">
            How do I implement infinite scroll with Framer Motion?
         </p>
      </div>
      <div className="bg-[#6C63FF]/10 border-l-4 border-white/30 p-6 rounded-r-2xl translate-x-4">
         <div className="text-[10px] font-mono font-bold text-[#00FF94] mb-2 uppercase tracking-tight">@senior_architect replied:</div>
         <div className="bg-[#0A0A0F] rounded-lg p-3 mb-3 border border-white/5">
            <div className="h-2 w-full bg-[#6C63FF]/40 rounded-full mb-2" />
            <div className="h-2 w-3/4 bg-[#6C63FF]/20 rounded-full" />
         </div>
         <p className="text-[11px] text-[#8B8B9E] font-medium uppercase tracking-[2px] italic">Marked as solved</p>
      </div>
   </div>
);
