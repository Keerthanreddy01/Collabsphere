"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";

const BLOCKS = [
  {
    title: "Post Your Project",
    headline: "Your idea deserves a real team.",
    body: "Launch your project in minutes. Define your stack, set open roles, and let motivated builders find you.",
    mockup: "create-project"
  },
  {
    title: "Find Your Stack Match",
    headline: "Skill-matched. Motivation-verified.",
    body: "Browse builders by their actual GitHub activity, not just a resume. Every profile shows what they can do.",
    mockup: "builder-profile"
  },
  {
    title: "Build in Public",
    headline: "Progress is the product.",
    body: "Share what you shipped today. Get feedback. Boost others. Build a reputation that compounds.",
    mockup: "feed-post"
  },
  {
    title: "Get Help Instantly",
    headline: "Stuck? A senior dev is one post away.",
    body: "Post your bug, your architecture question, your decision. Experienced devs drop in, help, and move on.",
    mockup: "qa-thread"
  }
];

export function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const step = Math.min(
        Math.floor(latest * BLOCKS.length),
        BLOCKS.length - 1
      );
      if (step !== activeStep) {
        setActiveStep(step);
      }
    });
  }, [scrollYProgress, activeStep]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0A0A0F]">
      <div className="sticky top-0 h-screen w-full flex items-center px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Panel - Fixed Mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[480px] aspect-[16/10] bg-[#1A1A24] rounded-2xl border-4 border-white/10 shadow-2xl overflow-hidden p-1">
              <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              
              <div className="mt-8 h-full bg-[#0A0A0F] p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col gap-4"
                  >
                    {activeStep === 0 && (
                      <div className="space-y-4">
                        <div className="h-8 w-1/2 bg-white/10 rounded-md" />
                        <div className="h-32 w-full bg-primary/10 border border-primary/20 rounded-md flex items-center justify-center">
                          <span className="text-primary font-mono text-xs opacity-50">Project Creation Form</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-6 bg-white/5 rounded-md" />
                          <div className="h-6 bg-white/5 rounded-md" />
                          <div className="h-6 bg-white/5 rounded-md" />
                        </div>
                      </div>
                    )}
                    {activeStep === 1 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-secondary" />
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-1/3 bg-white/20 rounded-md" />
                            <div className="h-3 w-1/2 bg-white/10 rounded-md" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 bg-white/5 rounded-lg p-2 flex flex-col justify-between">
                            <div className="text-[10px] text-white/40">COMMITS</div>
                            <div className="text-2xl font-bold text-white">2.4k</div>
                          </div>
                          <div className="h-24 bg-white/5 rounded-lg p-2 flex flex-col justify-between">
                            <div className="text-[10px] text-white/40">LANGUAGES</div>
                            <div className="text-xs font-bold text-white">TS, RS, PY</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div className="space-y-4">
                        <div className="h-40 w-full bg-white/5 rounded-lg p-4 flex flex-col justify-between border border-white/5">
                          <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary" />
                            <div className="h-3 w-1/4 bg-white/10 rounded-md my-auto" />
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full" />
                          <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                          <div className="flex gap-4">
                            <div className="w-8 h-4 bg-primary/20 rounded-md" />
                            <div className="w-8 h-4 bg-primary/20 rounded-md" />
                          </div>
                        </div>
                      </div>
                    )}
                    {activeStep === 3 && (
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                          <div className="text-xs font-bold text-primary mb-2">@junior_dev asked:</div>
                          <div className="text-sm text-white mb-4">How do I implement infinite scroll with Framer Motion?</div>
                          <div className="p-3 bg-primary/5 border-l-2 border-primary rounded-r-md">
                            <div className="text-[10px] font-bold text-white/50 mb-1">@senior_architect replied:</div>
                            <div className="text-[10px] text-white/70">Use useScroll and useTransform for precise control...</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Panel - Content Blocks */}
          <div className="flex flex-col gap-[80vh] py-[30vh]">
            {BLOCKS.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                className="max-w-md"
              >
                <div className="text-xs font-bold font-mono tracking-widest text-primary mb-4 uppercase">
                  Step 0{i + 1} / {block.title}
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
                  {block.headline}
                </h2>
                <p className="text-xl text-[#8B8B9E] leading-relaxed">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
