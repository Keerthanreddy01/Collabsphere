"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    title: "Builder Profiles",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    description: "Show what you actually build. GitHub stats, tech stack, open-to-collab status."
  },
  {
    title: "Project Incubation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 3-3"></path>
        <path d="m15 12-3-3"></path>
        <path d="m21 3-3 3"></path>
        <path d="m5 16 4-4"></path>
        <path d="m9 21 4-4"></path>
        <path d="M15 15h0"></path>
      </svg>
    ),
    description: "Launch your project. Post open roles. Recruit motivated teammates."
  },
  {
    title: "Build-in-Public Feed",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
    description: "Share progress. Get boosts. Build your reputation one shipped feature at a time."
  },
  {
    title: "Collaboration Rooms",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    description: "Team spaces for chat, assets, and coordination — all in one place."
  },
  {
    title: "Workshops",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    description: "Host or attend technical workshops. Online, offline, or hybrid with RSVP tracking."
  },
  {
    title: "Dev Q&A",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    description: "Post a question. Get a real answer. Senior devs help and move on. No noise."
  }
];

export function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="mb-24 flex flex-col items-start text-left">
           <motion.h2 
             initial={{ opacity: 0, x: -60 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }} 
             className="text-[48px] md:text-[72px] font-display font-extrabold flex flex-col leading-[1] tracking-tight italic mb-8"
           >
             <span className="text-white">Everything a</span>
             <span className="text-[#6C63FF]">builder needs.</span>
           </motion.h2>
           <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }} 
              className="text-[18px] text-[#5A5A6E] font-medium max-w-lg leading-relaxed"
           >
              One platform. Zero friction. Built by developers for developers.
           </motion.p>
        </div>

        {/* Grid of Stamp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {FEATURES.map((feature, i) => (
             <FeatureCard 
               key={feature.title} 
               feature={feature} 
               index={i} 
               isInView={isInView}
             />
           ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ feature, index, isInView }: { feature: any, index: number, isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
      whileHover={{ scale: 1.02 }}
      className="group relative h-full bg-[#111118] border border-[#6C63FF]/12 p-10 rounded-[28px] overflow-hidden transition-all duration-300 hover:border-[#6C63FF]/40 hover:shadow-[0_0_40px_rgba(108,99,255,0.12)]"
    >
       {/* Byooooob Glow Spot */}
       <div className="absolute top-[-40px] right-[-40px] w-[120px] h-[120px] bg-[#6C63FF]/0 transition-all duration-500 rounded-full blur-[60px] group-hover:bg-[#6C63FF]/20" />

       {/* Icon Container */}
       <div className="w-[52px] h-[52px] bg-[#6C63FF]/12 rounded-[14px] flex items-center justify-center text-[#6C63FF] mb-10 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:bg-[#6C63FF] group-hover:text-white">
          {feature.icon}
       </div>

       {/* Optional Badge */}
       {feature.title === "Workshops" && (
          <div className="absolute top-8 right-8 bg-[#00FF94]/10 border border-[#00FF94]/30 px-3 py-1.5 rounded-lg text-[#00FF94] font-mono font-bold text-[9px] tracking-[1px] uppercase">
             UPCOMING
          </div>
       )}

       <h3 className="text-[22px] font-display font-extrabold text-white mb-4 italic uppercase tracking-tighter">
          {feature.title}
       </h3>
       
       <p className="text-[15px] font-medium text-[#5A5A6E] leading-relaxed group-hover:text-[#8B8B9E] transition-colors">
          {feature.description}
       </p>
    </motion.div>
  );
};
