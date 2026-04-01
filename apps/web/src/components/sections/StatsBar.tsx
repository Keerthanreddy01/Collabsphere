"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Active Builders", value: 2400, suffix: "+", color: "var(--purple)", rotate: -4 },
  { label: "Projects Launched", value: 180, suffix: "+", color: "var(--green)", rotate: 2 },
  { label: "Collaboration Rate", value: 94, suffix: "%", color: "var(--yellow)", rotate: -2 },
  { label: "Avg. Team Formed", value: 48, suffix: "hrs", color: "var(--cyan)", rotate: 4 }
];

export function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef} 
      className="relative py-80 bg-[var(--bg)] border-t-[8px] border-[var(--bg)] overflow-hidden transition-colors duration-500"
    >
      {/* Background massive ghost wordmark (Dynamic) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
         <span className="text-[300px] md:text-[450px] font-display font-black text-[var(--text)] italic uppercase tracking-tighter whitespace-nowrap rotate-[-5deg]">
            VISION VISION VISION
         </span>
      </div>

      {/* Deep Background Glows (Dynamic) */}
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[var(--purple)]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-[var(--purple-2)]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* World-Class Header (Theme-Synced) */}
        <div className="flex flex-col items-center text-center mb-56 relative">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={isInView ? { opacity: 1, scale: 1 } : {}}
             className="mb-10 bg-[var(--text)] text-[var(--bg)] px-8 py-3 font-mono font-black text-sm uppercase italic rotate-2 rounded-2xl shadow-2xl border-4 border-[var(--text)]"
           >
              GLOBAL METRICS
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 40 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
             className="text-[72px] md:text-[140px] font-display font-black flex flex-col leading-[0.8] tracking-[-0.06em] italic uppercase"
           >
              <span className="text-[var(--text)]">BUILT THROUGH</span>
              <span className="text-[var(--purple)]">DEEP VISION.</span>
           </motion.h2>

           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-32 md:right-0 w-48 h-48 bg-[var(--bg-card)] backdrop-blur-3xl border-4 border-[var(--border)] rounded-[40px] hidden md:flex items-center justify-center p-8 rotate-12 shadow-2xl"
           >
              <div className="w-full h-full bg-[var(--purple)] rounded-3xl flex items-center justify-center font-display font-black text-4xl text-white">★</div>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 perspective-2000">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index, isInView }: { stat: any, index: number, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 150, rotateX: 45 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        rotateX: 0,
        rotateZ: stat.rotate 
      } : {}}
      transition={{ duration: 1.5, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -30, rotateZ: 0, scale: 1.08, transition: { duration: 0.4 } }}
      className="relative group h-[420px] bg-[var(--bg-card)] border-[10px] border-[var(--text)] p-12 rounded-[64px] flex flex-col justify-between overflow-hidden shadow-[40px_40px_0_var(--purple)]/10 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-700"
    >
       <div 
         className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-[0.08] group-hover:scale-[10] transition-all duration-1000 blur-3xl pointer-events-none"
         style={{ background: stat.color }}
       />

       <motion.div 
          initial={{ height: 0 }}
          animate={isInView ? { height: 200 } : {}}
          transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-2 bg-[var(--text)]/10 origin-top z-0"
       >
          <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-8 h-8 bg-[var(--bg)] rounded-full border-4 border-[var(--text)]/20 flex items-center justify-center">
             <div className="w-2 h-2 bg-[var(--text)]/40 rounded-full" />
          </div>
       </motion.div>

       <div className="relative z-10 flex flex-col h-full justify-between items-center text-center pt-8">
          <div className="space-y-4">
             <div className="flex items-baseline justify-center gap-1 group-hover:scale-110 transition-transform duration-700">
                <span className="text-[72px] md:text-[96px] font-display font-black text-[var(--text)] italic leading-none tracking-[-0.08em]">
                   <CountUp value={stat.value} isInView={isInView} delay={index * 0.2 + 0.8} />
                </span>
                <span className="text-4xl font-display font-black italic leading-none" style={{ color: stat.color }}>{stat.suffix}</span>
             </div>
             <div className="h-3 w-32 bg-[var(--bg)] mx-auto rounded-full overflow-hidden border-2 border-[var(--text)]/5">
                <motion.div 
                   initial={{ x: "-100%" }}
                   animate={isInView ? { x: "0%" } : {}}
                   transition={{ duration: 2.5, delay: index * 0.2 + 0.8, ease: "easeOut" }}
                   className="h-full w-full opacity-80"
                   style={{ background: stat.color }}
                 />
              </div>
           </div>

           <div className="space-y-6">
              <p className="text-[14px] font-mono font-black text-[var(--text-muted)] uppercase tracking-[6px] group-hover:text-[var(--text)] transition-colors duration-500">
                {stat.label}
              </p>
              <div 
                className="w-16 h-16 rounded-3xl flex items-center justify-center font-display font-black text-2xl italic shadow-2xl group-hover:rotate-[360deg] transition-all duration-1000 border-6 border-[var(--bg)] mx-auto"
                style={{ background: stat.color, color: "var(--bg)" }}
              >
                 ★
              </div>
           </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-[var(--text)]/20 to-transparent rounded-full border-2 border-[var(--text)]/10 mt-6 backdrop-blur-md flex items-center justify-center">
           <div className="w-1.5 h-1.5 bg-[var(--text)]/40 rounded-full shadow-[0_0_5px_var(--text)]" />
        </div>
     </motion.div>
   );
 }

 function CountUp({ value, isInView, delay }: { value: number, isInView: boolean, delay: number }) {
   const [current, setCurrent] = useState(0);
   const startTimeRef = useRef<number | null>(null);
 
   useEffect(() => {
     if (!isInView) return;
 
     const animate = (timestamp: number) => {
       if (!startTimeRef.current) startTimeRef.current = timestamp;
       const elapsed = timestamp - startTimeRef.current - (delay * 1000);
       
       if (elapsed < 0) {
         requestAnimationFrame(animate);
         return;
       }
 
       const duration = 2500;
       const progress = Math.min(elapsed / duration, 1);
       const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
       
       setCurrent(Math.floor(easeOutExpo(progress) * value));
 
       if (progress < 1) {
         requestAnimationFrame(animate);
       }
     };
 
     requestAnimationFrame(animate);
   }, [isInView, value, delay]);
 
   return <span>{current.toLocaleString()}</span>;
 }
