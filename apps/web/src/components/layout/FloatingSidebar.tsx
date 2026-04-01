"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const SOCIALS = [
  { icon: Github, href: "https://github.com/Keerthanreddy01/Collabsphere" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
];

export function FloatingSidebar() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress for the vertical bar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 1]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed left-0 top-0 bottom-0 w-24 z-[100] hidden xl:flex flex-col items-center justify-between py-12 pointer-events-none"
    >
      {/* 1. TOP STICKER (LOCATION/YEAR) */}
      <div className="rotate-[-90deg] origin-center -translate-y-4">
         <span className={cn(
            "text-[10px] whitespace-nowrap font-mono font-black uppercase tracking-[0.4em] transition-colors duration-500",
            theme === "dark" ? "text-white/40" : "text-black/40"
         )}>
            EST. 2026 // SYD-DXB
         </span>
      </div>

      {/* 2. CENTER CONTENT: SOCIALS + PROGRESS (POINTER EVENTS ON) */}
      <div className="flex flex-col items-center gap-12 pointer-events-auto">
        
        {/* SOCIAL LINKS (REDESIGNED) */}
        <div className="flex flex-col gap-8 items-center">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              whileHover={{ scale: 1.2, x: 8, color: "var(--purple)" }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                 "transition-all duration-500",
                 theme === "dark" 
                   ? "text-white/40 hover:text-white" 
                   : "text-black/40 hover:text-black"
              )}
            >
              <social.icon size={20} strokeWidth={1.5} />
            </motion.a>
          ))}
        </div>

        {/* PRO-ARCHITECTURAL PROGRESS BAR */}
        <div className="relative group flex items-center justify-center">
           <div className={cn(
              "w-[1px] h-32 transition-colors duration-500",
              theme === "dark" ? "bg-white/10" : "bg-black/10"
           )} />
           <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-[var(--purple)] to-[var(--cyan)] shadow-[0_0_10px_var(--purple)] opacity-100"
           />
           
           {/* Section Checkpoint Dots (Purely Decorative Junk) */}
           <div className="absolute top-0 w-1 h-1 bg-[var(--purple)] rounded-full -translate-y-1/2" />
           <div className="absolute bottom-0 w-1 h-1 bg-[var(--cyan)] rounded-full translate-y-1/2" />
        </div>

        {/* INDICATOR TEXT (Snappier Visibility) */}
        <div className="rotate-[-90deg] origin-center translate-y-8">
           <span className={cn(
              "text-[9px] whitespace-nowrap font-mono font-black uppercase tracking-[0.5em] transition-all duration-500",
              theme === "dark" ? "text-white/60" : "text-black/60"
           )}>
              SCROLL DEPTH
           </span>
        </div>
      </div>

      {/* 3. BOTTOM STICKER (STATUS) */}
      <div className="rotate-[-90deg] origin-center translate-y-4">
         <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className={cn(
               "text-[10px] whitespace-nowrap font-mono font-black uppercase tracking-[0.3em] transition-colors duration-500",
               theme === "dark" ? "text-white/40" : "text-black/40"
            )}>
               SYSTEM_ACTIVE
            </span>
         </div>
      </div>

    </motion.div>
  );
}
