"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const useCountUp = (target: number, duration: number = 2000, trigger: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
};

export function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "ACTIVE BUILDERS", value: 2400, suffix: "+" },
    { label: "PROJECTS LAUNCHED", value: 180, suffix: "+" },
    { label: "COLLABORATION RATE", value: 94, suffix: "%" },
    { label: "AVG. TEAM FORMED", value: 48, suffix: "hrs" }
  ];

  return (
    <section ref={ref} className="relative py-20 bg-[#111118] border-y border-[#6C63FF]/15">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
        {stats.map((stat, i) => (
          <StatItem 
            key={stat.label} 
            stat={stat} 
            isInView={isInView} 
            index={i} 
            showDivider={i < stats.length - 1} 
          />
        ))}
      </div>
    </section>
  );
}

const StatItem = ({ stat, isInView, index, showDivider }: { stat: any, isInView: boolean, index: number, showDivider: boolean }) => {
  const count = useCountUp(stat.value, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }} 
      className="relative flex flex-col items-center md:items-start"
    >
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-[60px] md:text-[80px] font-mono font-extrabold text-[#6C63FF] leading-none italic tracking-tighter">
          {count.toLocaleString()}
        </span>
        <span className="text-[40px] md:text-[50px] font-display font-extrabold text-[#6C63FF] leading-none italic">
          {stat.suffix}
        </span>
      </div>
      <div className="text-[12px] font-mono font-bold text-[#5A5A6E] tracking-[3px] uppercase">
        {stat.label}
      </div>

      {showDivider && (
        <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-px h-24 bg-[#6C63FF]/15" />
      )}
    </motion.div>
  );
};
