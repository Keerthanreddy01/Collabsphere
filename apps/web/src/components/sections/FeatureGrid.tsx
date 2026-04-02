"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "TEAM MATCHING v4",
    icon: "✦",
    description: "Browse verified builders with real project history. No LinkedIn fluff, just world-class code audits.",
    bg: "var(--purple)",
    span: "col-span-1 md:col-span-2",
    tag: "NEURAL_LINK"
  },
  {
    title: "BUILD IN PUBLIC",
    icon: "⚐",
    description: "Share progress with the community and attract high-tier collaborators in real-time.",
    bg: "var(--green)",
    span: "col-span-1",
    tag: "LIVE_FEED"
  },
  {
    title: "PROJECT INCUBATOR",
    icon: "★",
    description: "The teams formed here are the CEOs of tomorrow. Start small, ship elite-grade software.",
    bg: "var(--yellow)",
    span: "col-span-1",
    tag: "STARTUP_ENGINE"
  },
  {
    title: "COLLAB ROOMS",
    icon: "⚒",
    description: "Private spaces for your core team to coordinate without the noise of fragmented platforms.",
    bg: "var(--cyan)",
    span: "col-span-1 md:col-span-2",
    tag: "CORE_SECURE"
  }
];

export function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-[var(--bg)] grid-pattern transition-colors duration-500 overflow-hidden z-30">

      {/* THE BOUTIQUE GLOW OVERLAY */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[var(--purple)]/5 blur-[300px] rounded-full pointer-events-none animate-pulse" />

      {/* Section Header (Elite Engineering Detail) */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-1.5 h-16 md:h-24 bg-gradient-to-b from-transparent via-[var(--purple)] to-transparent mb-12"
        />
        <div className="text-[14px] font-mono font-black tracking-[10px] text-[var(--purple)] mb-8 uppercase italic">
          CAPABILITY_MATRIX_2026
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-[28px] md:text-[40px] font-display font-extrabold flex flex-col leading-[0.85] tracking-[-0.04em] italic uppercase"
        >
          <span className="text-[var(--text)]">EVERYTHING_A</span>
          <span className="text-[var(--purple)]">BUILDER_NEEDS.</span>
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index, isInView }: { feature: any, index: number, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, skewY: 2 }}
      animate={isInView ? { opacity: 1, y: 0, skewY: 0 } : {}}
      transition={{ duration: 1.2, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] as any }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative h-[460px] bg-[var(--bg-card)] border-[3px] border-[var(--text)] p-7 md:p-9 rounded-[40px] overflow-hidden transition-all duration-700 shadow-[12px_12px_0_var(--text)]/[0.04] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col justify-between",
        feature.span
      )}
    >
      {/* Background Reveal Shape (Elite Fluid Glow) */}
      <div
        className="absolute top-0 right-0 w-80 h-80 -translate-y-1/3 translate-x-1/3 rounded-full opacity-[0.05] group-hover:opacity-[0.18] transition-all duration-1000 group-hover:scale-[6] blur-4xl pointer-events-none"
        style={{ background: feature.bg }}
      />

      <div className="relative z-10 flex flex-col items-start gap-10">

        <div className="flex justify-between items-center w-full">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-16 h-16 rounded-[24px] flex items-center justify-center font-display font-black text-2xl italic shadow-2xl transition-all duration-700 border-[3px] border-[var(--text)]"
            style={{ background: feature.bg, color: "var(--bg)" }}
          >
            {feature.icon}
          </motion.div>
          <div className="font-mono text-[10px] tracking-[6px] text-[var(--text-muted)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--purple)] transition-all">
            {feature.tag}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-[var(--text)] italic leading-none uppercase relative inline-block group-hover:translate-x-3 transition-transform duration-500 tracking-tighter">
            {feature.title}
            <motion.div
              className="absolute -bottom-2 left-0 h-2 bg-[var(--purple)] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
            />
          </h3>
          <p className={cn(
            "text-[clamp(14px,1.5vw,20px)] text-[var(--text-muted)] leading-[1.3] group-hover:text-[var(--text)] transition-colors duration-1000 font-medium italic uppercase tracking-tighter",
            feature.span.includes("col-span-2") ? "max-w-[600px]" : "max-w-[300px]"
          )}>
            {feature.description}
          </p>
        </div>
      </div>

      <motion.div
        whileHover={{ x: 15 }}
        className="group/btn mt-auto self-end flex items-center gap-6 px-10 py-4 bg-[var(--bg)] border-4 border-[var(--text)] rounded-full hover:bg-[var(--purple)] hover:border-[var(--purple)] transition-all duration-500 cursor-pointer shadow-[8px_8px_0_var(--border)] relative z-10"
      >
        <span className="text-[12px] md:text-[14px] font-mono font-black tracking-[4px] uppercase italic text-[var(--text)] group-hover/btn:text-white transition-colors">VERIFY_SYSTEM</span>
        <div className="text-xl text-[var(--text)] group-hover/btn:text-white transition-colors">↗</div>
      </motion.div>

      {/* Alignment Markers */}
      <div className="absolute top-0 right-10 w-px h-12 bg-[var(--text)] opacity-10" />
      <div className="absolute top-10 right-0 w-12 h-px bg-[var(--text)] opacity-10" />
      <div className="absolute bottom-0 left-10 w-px h-12 bg-[var(--text)] opacity-10" />
    </motion.div>
  );
}
