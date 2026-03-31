"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Create your builder profile",
    body: "Connect your GitHub, define your roles, and showcase your best work."
  },
  {
    number: "02",
    title: "Launch or browse projects",
    body: "Post your vision or find an existing team that needs your specific expertise."
  },
  {
    number: "03",
    title: "Apply, connect, and ship",
    body: "Join a room, coordinate in real-time, and ship world-class software."
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-display font-bold text-center mb-32"
        >
          Three steps to your dream team.
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-24 relative z-10">
          <div className="absolute top-[60px] left-0 right-0 hidden md:block -z-10">
            <svg width="100%" height="20" viewBox="0 0 1000 20" fill="none" className="overflow-visible">
              <path 
                d="M0 10 H1000" 
                stroke="rgba(108, 99, 255, 0.1)" 
                strokeWidth="4" 
                strokeDasharray="12 12" 
              />
              <motion.path 
                d="M0 10 H1000" 
                stroke="#6C63FF" 
                strokeWidth="4" 
                style={{ pathLength }}
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-[#111118] border-2 border-white/10 flex items-center justify-center mx-auto mb-10 group-hover:border-primary transition-all relative">
                <div className="text-4xl font-display font-bold text-primary">{step.number}</div>
                <div className="absolute -inset-4 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 leading-tight">
                {step.title}
              </h3>
              <p className="text-[#8B8B9E] font-medium leading-relaxed max-w-[280px] mx-auto">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
