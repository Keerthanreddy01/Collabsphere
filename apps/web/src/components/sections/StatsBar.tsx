"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { motion } from "framer-motion";

export function StatsBar() {
  const stats = [
    { label: "Active Builders", value: 2400, suffix: "+" },
    { label: "Projects Launched", value: 180, suffix: "+" },
    { label: "Collaboration Rate", value: 94, suffix: "%" },
    { label: "Avg. Team Formed In", value: 48, suffix: "hrs" }
  ];

  return (
    <section className="relative py-24 bg-[#0A0A0F] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-4 tracking-tighter">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm font-bold uppercase tracking-widest text-[#8B8B9E]">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
