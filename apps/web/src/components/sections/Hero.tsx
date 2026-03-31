"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PillBadge } from "@/components/ui/PillBadge";
import { GradientButton } from "@/components/ui/GradientButton";
import React, { useRef } from "react";

const Sticker = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    animate={{
      rotate: [0, 5, -5, 0],
      y: [0, -10, 10, 0]
    }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute z-30 pointer-events-none select-none ${className}`}
  >
    {children}
  </motion.div>
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

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
    hidden: { opacity: 0, y: 80, rotate: 2 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
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
      className="relative min-h-screen flex items-center justify-center pt-24 dot-texture overflow-hidden bg-[#0A0A0F]"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#6C63FF]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00D4FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full h-full lg:min-h-[85vh]">

        {/* Left Column - The Massive Creative Type */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col justify-center py-20 relative">

          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-[#111118] border border-white/10 px-6 py-2 rounded-full inline-flex items-center gap-3 shadow-xl">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00FF94] pulse-dot" />
                <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#8B8B9E]">
                Open Beta · Build v0.1.0
              </span>
            </div>
          </motion.div>

          {/* HEADLINE: CRASHING, MIXED TYPE */}
          <div className="relative mb-14">
            <motion.h1
              initial="hidden"
              animate="visible"
              className="text-[80px] md:text-[130px] font-display font-extrabold leading-[0.88] tracking-[-0.05em] flex flex-col"
            >
              <motion.span variants={lineVariants} custom={0} className="text-white relative flex items-baseline">
                WHERE <span className="text-[#6C63FF] italic ml-4">BUILDERS</span>
                <Sticker className="-top-12 left-[20%] delay-150">
                  <div className="w-16 h-16 bg-[#FFE135] text-[#0A0A0F] flex items-center justify-center font-display font-black text-2xl rotate-12 rounded-xl shadow-2xl">★</div>
                </Sticker>
              </motion.span>

              <motion.span variants={lineVariants} custom={1} className="text-white flex items-center group">
                FIND THEIR
                <span className="hidden md:inline-flex mx-6 w-[140px] h-[70px] bg-[#6C63FF] rounded-full items-center justify-center overflow-hidden rotate-[-3deg] group-hover:rotate-0 transition-all duration-500">
                  <span className="text-white font-mono text-3xl font-bold italic">&lt;/&gt;</span>
                </span>
                PEOPLE.
              </motion.span>

              <motion.span variants={lineVariants} custom={2} className="relative">
                <span className="text-[#00D4FF] italic">READY</span>
                <span className="text-white"> TO </span>
                <span className="text-[#6C63FF]">SHIP.</span>

                <Sticker className="bottom-0 -right-12 delay-500">
                  <div className="bg-[#00FF94] text-[#0A0A0F] px-4 py-2 font-mono font-black text-xs rotate-[-12deg] rounded-lg shadow-2xl border-2 border-[#0A0A0F]">v0.1 RELEASE</div>
                </Sticker>
              </motion.span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center gap-10 mb-16"
          >
            <p className="text-[20px] text-[#8B8B9E] max-w-[340px] font-medium leading-relaxed italic border-l-2 border-[#6C63FF] pl-6 py-2">
              Recruit your backend genius. Find your UI master. Ship in public.
            </p>

            <div className="flex flex-wrap gap-4">
              <GradientButton variant="primary" className="h-[64px] px-10 bg-[#6C63FF] hover:bg-[#8B85FF] font-display font-extrabold uppercase italic tracking-wider text-[18px] rounded-full shadow-[0_12px_40px_rgba(108,99,255,0.4)] transition-all">
                Get Started →
              </GradientButton>
              <button className="h-[64px] px-10 border-2 border-white text-white font-display font-extrabold uppercase italic tracking-wider text-[18px] rounded-full hover:bg-white hover:text-[#0A0A0F] transition-all">
                Join Discord
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Interactive Stamp Card */}
        <div className="lg:col-span-12 xl:col-span-4 relative flex items-center justify-center lg:justify-end py-16 xl:py-0">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[400px] perspective-1000"
          >
            <div
              className="bg-[#F5F4EE] border-4 border-[#0A0A0F] p-8 rounded-[32px] shadow-[20px_20px_0_#6C63FF] transition-all duration-300 hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
              style={{ transform: "translateZ(50px)" }}
            >
              {/* Stamp Style Profile */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 bg-[#6C63FF] rounded-2xl flex items-center justify-center font-display font-black text-3xl text-white rotate-[-6deg] group-hover:rotate-0 transition-all border-4 border-[#0A0A0F]">
                    JD
                  </div>
                  <div className="bg-[#FFE135] border-4 border-[#0A0A0F] px-4 py-1 font-mono font-black text-[10px] uppercase rotate-6">
                    VERIFIED
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-extrabold text-[#0A0A0F] italic uppercase">J. DOE</h3>
                  <p className="text-xs font-mono font-bold text-[#5A5A6E] tracking-[1px] uppercase">Senior Rust Architect</p>
                </div>

                <div className="h-px w-full bg-[#0A0A0F]/10" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#00FF94] rounded-full" />
                    <span className="text-xs font-mono font-bold text-[#0A0A0F]">AVAIL: 12H / WK</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["RUST", "WASM", "GO"].map(t => (
                      <span key={t} className="bg-[#0A0A0F] text-white px-3 py-1 rounded-lg text-[10px] font-mono font-black italic">{t}</span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-[#0A0A0F] py-4 rounded-xl font-display font-extrabold text-white uppercase italic text-sm transition-all hover:bg-[#6C63FF]">
                  Invite to Project
                </button>
              </div>
            </div>

            {/* Decorative Stick-ons */}
            <div className="absolute -top-10 -right-6 w-24 h-24 bg-[#00D4FF] border-4 border-[#0A0A0F] rounded-full flex items-center justify-center -rotate-12 z-20 shadow-xl overflow-hidden">
              <span className="text-[10px] font-mono font-black text-[#0A0A0F] text-center leading-tight">OFFERING<br />HELP</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
