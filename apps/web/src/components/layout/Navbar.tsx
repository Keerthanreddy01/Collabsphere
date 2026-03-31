"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Star } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.95)"]
  );
  
  const navLinks = [
    { name: "Features", href: "#" },
    { name: "Community", href: "#", isNew: true },
    { name: "Docs", href: "#" },
  ];

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-[100] h-24 flex items-center transition-all duration-500 border-b border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        
        {/* LOGO - CLEAN 3D EFFECT (NO GLITCHY DROP-SHADOW) */}
        <Link href="/" className="flex items-center gap-3 group relative perspective-1000">
           <motion.div 
             whileHover={{ scale: 1.05 }}
             className="relative flex items-center"
           >
              {/* Back Layer (The Shadow) */}
              <span className="absolute top-[4px] left-[4px] text-[26px] font-display font-black tracking-tighter text-[#6C63FF] uppercase italic leading-none select-none opacity-50 group-hover:text-white transition-colors">
                 COLLABSPHERE
              </span>
              
              {/* Front Layer */}
              <span className="relative text-[26px] font-display font-black tracking-tighter text-white uppercase italic leading-none">
                 COLLAB<span className="text-[#6C63FF] group-hover:text-[#FFE135] transition-colors">SPHERE</span>
              </span>

              {/* The "Eye" Dot */}
              <div className="absolute -top-1 -left-5 w-3.5 h-3.5 bg-[#00FF94] rounded-full border-4 border-[#0A0A0F] shadow-[0_0_15px_#00FF94]" />
           </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-14">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative flex items-center"
              >
                <motion.span 
                  whileHover={{ y: -2 }}
                  className="text-[11px] font-mono font-black tracking-[4px] text-white uppercase italic transition-colors hover:text-[#FFE135]"
                >
                  {link.name}
                </motion.span>
                {link.isNew && (
                  <motion.span 
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-[#FF6B35] text-white text-[7px] font-mono font-black italic px-2 py-0.5 rounded-md border-2 border-[#0A0A0F] absolute -top-4 -right-10 whitespace-nowrap shadow-xl"
                  >
                     NEW!
                  </motion.span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-10 border-l border-white/10 pl-10">
            <Link
              href="https://github.com"
              target="_blank"
              className="group flex flex-col items-end"
            >
              <div className="flex items-center gap-1.5">
                 <Star size={14} className="text-[#FFE135] fill-[#FFE135]" />
                 <span className="text-[11px] font-mono font-black text-white italic group-hover:text-[#FFE135]">1.2K</span>
              </div>
              <span className="text-[7px] font-mono font-bold text-white/30 uppercase tracking-widest">STARS</span>
            </Link>

            {/* WORLD CLASS CTA BUTTON */}
            <motion.button 
              whileHover={{ 
                translateX: 4,
                translateY: 4,
                boxShadow: "none"
              }}
              whileTap={{ scale: 0.95 }}
              className="h-[56px] px-10 bg-white border-4 border-[#0A0A0F] rounded-full text-[#0A0A0F] font-display font-black text-[13px] italic uppercase tracking-wider shadow-[8px_8px_0_#6C63FF] transition-all flex items-center justify-center gap-3 group/btn"
            >
               START BUILDING <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-12 h-12 bg-[#111118] border-4 border-[#0A0A0F] rounded-2xl flex items-center justify-center text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute inset-0 top-24 h-screen bg-[#0A0A0F] z-[99] p-8 flex flex-col items-center justify-center gap-12"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={link.href}
                className="text-6xl font-display font-black text-white italic uppercase tracking-tighter hover:text-[#6C63FF] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.button 
            className="w-full h-20 bg-[#6C63FF] border-8 border-[#0A0A0F] rounded-[40px] text-white font-display font-black text-xl italic shadow-[15px_15px_0_#0A0A0F]"
          >
             START BUILDING
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
}
