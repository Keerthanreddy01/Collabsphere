"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const NAV_LINKS = [
  { name: "FEATURES", href: "#" },
  { name: "COMMUNITY", href: "#" },
  { name: "DOCS", href: "#", isNew: true },
];

export function Navbar() {
  const { scrollY } = useScroll();
  
  // Transition background on scroll
  const bgOpacity = useTransform(scrollY, [0, 50], [0.7, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 50], [20, 25]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0.08, 0.12]);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-[100] w-full flex justify-center px-4 pointer-events-none"
    >
      <motion.div 
        style={{ 
          backgroundColor: useTransform(bgOpacity, v => `rgba(10, 10, 10, ${v})`),
          backdropFilter: useTransform(blurAmount, v => `blur(${v}px)`),
          borderColor: useTransform(borderOpacity, v => `rgba(255, 255, 255, ${v})`)
        }}
        className="flex items-center justify-between w-full max-w-3xl h-16 rounded-full border px-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto"
      >
        {/* LOGO: LEFT */}
        <Link href="/" className="flex items-center group relative overflow-hidden">
           <span className="text-[18px] font-display font-black tracking-tighter text-white uppercase italic leading-none group-hover:text-[#6C63FF] transition-colors">
              COLLAB<span className="text-[#6C63FF] group-hover:text-white">SPHERE</span>
           </span>
        </Link>

        {/* LINKS: CENTER */}
        <nav className="hidden md:flex items-center gap-10">
           {NAV_LINKS.map((link) => (
             <Link
               key={link.name}
               href={link.href}
               className="relative group flex items-center"
             >
               <motion.span
                 whileHover={{ 
                    color: "#ffffff", 
                    textShadow: "0 0 12px rgba(108,99,255,0.8)" 
                 }}
                 className="text-[10px] font-mono font-black tracking-[3px] text-white/60 uppercase transition-colors"
               >
                 {link.name}
               </motion.span>
               
               {/* Tiny Pulsing Orange Dot for New Items */}
               {link.isNew && (
                 <motion.div 
                   animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute -top-1.5 -right-3 w-1.5 h-1.5 bg-[#FF6B35] rounded-full shadow-[0_0_8px_#FF6B35]"
                 />
               )}
             </Link>
           ))}
        </nav>

        {/* ACTIONS: RIGHT */}
        <div className="flex items-center gap-8">
           {/* Stars Ghost Item */}
           <div className="hidden md:flex items-center gap-1.5 cursor-default group">
              <Star size={10} className="text-[#FFE135] fill-[#FFE135]/20 group-hover:fill-[#FFE135] transition-all" />
              <span className="text-[10px] font-mono font-bold text-white/30 group-hover:text-white transition-colors">1.2K</span>
           </div>

           {/* START BUILDING: GRADIENT BORDER STYLE */}
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="relative group/btn"
           >
             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#ff6b35] p-[1.5px] opacity-80 group-hover/btn:opacity-100 transition-opacity" />
             <div className="relative h-10 px-6 rounded-full bg-[#0d0d0d] flex items-center justify-center">
                <span className="text-[10px] font-display font-black text-white italic uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                   START BUILDING →
                </span>
             </div>
           </motion.button>
        </div>

      </motion.div>
    </motion.header>
  );
}
