"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PillBadge } from "@/components/ui/PillBadge";
import { GradientButton } from "@/components/ui/GradientButton";
import { GlassCard } from "@/components/ui/GlassCard";
import React, { useRef } from "react";

const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute h-10 w-10 z-30 pointer-events-none hidden lg:flex items-center justify-center ${className}`}
  >
    {children}
  </motion.div>
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2 + i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative min-h-screen flex items-center justify-center pt-24 dot-texture overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C63FF]/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Horizontal scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, #FFFFFF 0px, #FFFFFF 1px, transparent 1px, transparent 80px)' }} 
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full h-full lg:min-h-[80vh]">
        {/* Left Column (55%) */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center py-20 relative">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <PillBadge className="bg-[#00FF94]/8 border-[#00FF94]/25 text-[#00FF94] font-mono text-[12px] px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF94] pulse-dot shadow-[0_0_8px_#00FF94]" />
              Now in Open Beta · v0.1.0
            </PillBadge>
          </motion.div>

          {/* GSAP Headline */}
          <div className="relative mb-12">
            <motion.h1 
              initial="hidden"
              animate="visible"
              className="text-[72px] md:text-[100px] font-display font-extrabold flex flex-col leading-[0.92] tracking-[-0.04em]"
            >
              <motion.span variants={lineVariants} custom={0} className="text-[#6C63FF] relative">
                Where
                <FloatingElement className="top-[20%] -left-12 translate-x-[-100%]">
                  <div className="w-5 h-5 rounded-full bg-[#00D4FF] shadow-[0_0_15px_#00D4FF]" />
                </FloatingElement>
              </motion.span>
              <motion.span variants={lineVariants} custom={1} className="text-white">
                Builders
              </motion.span>
              <motion.span variants={lineVariants} custom={2} className="text-white relative">
                Find Their
                <FloatingElement className="-right-12 bottom-0 translate-x-[100%]">
                   <div className="text-[32px] font-mono font-bold text-[#6C63FF]/60 rotate-12">&lt;/&gt;</div>
                </FloatingElement>
              </motion.span>
              <motion.span variants={lineVariants} custom={3} className="text-[#6C63FF] relative">
                People.
                <FloatingElement className="bottom-[10%] right-[30%] delay-300">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00FF94]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00FF94]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00FF94]/30" />
                  </div>
                </FloatingElement>
              </motion.span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-[18px] text-[#8B8B9E] max-w-md font-medium leading-[1.6] mb-12"
          >
            Post your idea. Find your team. Ship together. Collabsphere is the professional network built exclusively for developers and tech builders.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap items-center gap-6 mb-16"
          >
            <GradientButton variant="primary" className="h-[56px] px-10 bg-[#6C63FF] hover:bg-[#8B85FF] font-display font-extrabold uppercase italic tracking-wider text-[16px] shadow-[0_8px_30px_rgba(108,99,255,0.4)] transition-all">
              Start Building →
            </GradientButton>
            <GradientButton variant="ghost" className="h-[56px] px-10 border-[1.5px] border-white/20 hover:border-[#6C63FF] hover:text-[#6C63FF] font-display font-extrabold uppercase italic tracking-wider text-[16px]">
              See How It Works
            </GradientButton>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {[
                { init: "AK", color: "#6C63FF" },
                { init: "PM", color: "#00D4FF" },
                { init: "JO", color: "#00FF94" },
                { init: "SR", color: "#FF6B35" },
                { init: "TK", color: "#FF63A5" }
              ].map((avatar, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full border border-[#0A0A0F] flex items-center justify-center font-mono font-bold text-[11px] text-white"
                  style={{ backgroundColor: avatar.color }}
                >
                  {avatar.init}
                </div>
              ))}
            </div>
            <div className="text-[14px] font-medium text-[#8B8B9E]">
              Join <span className="text-white font-bold">2,400+</span> builders shipping right now
            </div>
          </motion.div>
        </div>

        {/* Right Column (45%) Card Setup */}
        <div className="lg:col-span-12 xl:col-span-5 relative flex items-center justify-center lg:justify-end xl:h-full py-16 xl:py-0">
          <motion.div 
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative perspective-1000 w-full max-w-[480px]"
          >
            {/* Card 1: Project Card (Target View Offset for hover) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative z-20 group"
            >
              <div 
                className="bg-[#111118]/80 backdrop-blur-[20px] border border-[#6C63FF]/25 p-8 rounded-[24px] shadow-[0_0_60px_rgba(108,99,255,0.15)] relative overflow-hidden"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="absolute top-0 right-0 p-6">
                  <div className="bg-[#00FF94]/15 border border-[#00FF94]/30 px-3 py-1.5 rounded-lg text-[#00FF94] font-mono font-bold text-[10px] tracking-tight">
                    2 ROLES OPEN
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-[22px] font-display font-extrabold text-white mb-1 uppercase italic">Skynet.ai</h3>
                  <div className="text-[10px] font-mono font-bold text-[#5A5A6E] tracking-[2px] uppercase">Autonomous Fleet Network</div>
                </div>

                <p className="text-[14px] text-[#8B8B9E] font-medium mb-8 leading-relaxed max-w-[280px]">
                  Building an open-source decentralized protocol for autonomous logistics and delivery.
                </p>

                <div className="flex flex-wrap gap-2.5 mb-10">
                  {["React", "TypeScript", "Rust", "LibP2P"].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/50 font-mono text-[11px] font-bold">
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-[#6C63FF] hover:bg-[#8B85FF] py-4 rounded-2xl font-display font-extrabold italic uppercase tracking-wider text-[14px] transition-expo active:scale-95">
                  Apply to Collaboration
                </button>
              </div>
            </motion.div>

            {/* Card 2: Builder Profile (behind) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: -30, y: -60 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="absolute top-0 left-0 -z-10 w-full"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="bg-[#111118]/80 backdrop-blur-[20px] border border-white/10 p-6 rounded-[24px] shadow-xl">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#00D4FF] flex items-center justify-center font-display font-extrabold italic text-[#0A0A0F] text-xl">
                      KR
                    </div>
                    <div>
                      <h4 className="text-[16px] font-display font-extrabold text-white uppercase italic">Keerthan Reddy</h4>
                      <p className="text-[10px] font-mono text-[#5A5A6E] font-bold tracking-tight uppercase tracking-widest">Architect · @keerthan_dev</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 transition-expo hover:bg-white/10">
                       <div className="text-[18px] font-mono font-extrabold text-[#6C63FF] mb-1 italic">48</div>
                       <div className="text-[9px] font-bold text-[#5A5A6E] tracking-[1px] uppercase">Projects</div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 transition-expo hover:bg-white/10">
                       <div className="text-[18px] font-mono font-extrabold text-[#00D4FF] mb-1 italic">1.2k</div>
                       <div className="text-[9px] font-bold text-[#5A5A6E] tracking-[1px] uppercase">Stars</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative gradients and objects behind cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#6C63FF]/30 blur-[100px] rounded-full -z-20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
