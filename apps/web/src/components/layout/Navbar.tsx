"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "CASE STUDY", href: "/cases" },
  { name: "SERVICE", href: "/services" },
  { name: "PAGE", href: "/pages", dropdown: true }
];

export function Navbar() {
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Theme-aware dynamic colors
  const bgColorOnDark = "rgba(10, 10, 15, 0.95)";
  const bgColorOnLight = "rgba(245, 245, 240, 0.9)";
  
  const textOnDark = "#FFFFFF";
  const textOnLight = "#0A0A0F";

  const targetBg = theme === "dark" ? bgColorOnDark : bgColorOnLight;
  const targetText = theme === "dark" ? textOnDark : textOnLight;

  // SCROLL-ADAPTIVE TRANSFORMS (SNAPPY TRANSITION)
  const navBg = useTransform(
    scrollY,
    [10, 40],
    [theme === "dark" ? "rgba(10, 10, 15, 0)" : "rgba(245, 245, 240, 0)", targetBg]
  );
  
  const navBorder = useTransform(
    scrollY,
    [10, 40],
    ["rgba(255, 255, 255, 0)", theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"]
  );

  const navBlur = useTransform(scrollY, [10, 40], ["blur(0px)", "blur(24px)"]);
  const textColor = useTransform(scrollY, [10, 40], [targetText, targetText]); // Stay consistent based on current theme

  return (
    <motion.nav
      style={{ 
        borderBottom: `1px solid`,
        borderColor: navBorder,
        backdropFilter: navBlur,
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 h-16 md:h-20 flex items-center justify-between px-6 md:px-12 lg:px-16",
        theme === "dark" ? "bg-[rgba(10,10,15,0.95)]" : "bg-[rgba(245,245,240,0.9)]"
      )}
    >
        
        {/* 1. BRAND LOGO (ELITE REDESIGN) */}
        <Link href="/" className="flex-shrink-0 group relative pr-10">
           <motion.span 
             style={{ color: targetText }}
             className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter transition-colors duration-500 block"
           >
             COLLAB<span className="text-[#6C63FF]">SPHERE</span>
           </motion.span>
           {/* Decorative Pulsing Dot */}
           <motion.div 
             className="absolute top-0 right-6 w-2.5 h-2.5 rounded-full bg-[#FF6B35]"
             animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
             transition={{ duration: 1.5, repeat: Infinity }}
           />
        </Link>

        {/* 2. NAVIGATION LINKS (CENTERED ELITE FLOW) */}
        <div className="hidden lg:flex flex-grow items-center justify-center gap-10 xl:gap-16">
           {NAV_LINKS.map((link) => (
             <Link 
               key={link.name} 
               href={link.href}
               onMouseEnter={() => setIsHovered(link.name)}
               onMouseLeave={() => setIsHovered(null)}
               className="relative py-2 group px-2 whitespace-nowrap"
             >
                <motion.span
                  style={{ color: targetText }}
                  className="text-sm xl:text-base font-black italic uppercase tracking-[0.1em] transition-colors duration-500 block"
                >
                  {link.name}
                  {link.dropdown && (
                    <span className="ml-1.5 text-[8px] inline-block align-middle pb-0.5 opacity-40 group-hover:rotate-180 transition-transform">▼</span>
                  )}
                </motion.span>
                
                {/* Magnetic Underline Animation */}
                <motion.div 
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: isHovered === link.name ? 1 : 0, opacity: isHovered === link.name ? 1 : 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#6C63FF] to-[#FF6B35] origin-left rounded-full transition-all duration-500"
                />
             </Link>
           ))}
        </div>

        {/* 3. AWARD-WINNING ACTION HUB (CONTACT + THEME TOGGLE) */}
        <div className="flex-shrink-0 flex items-center gap-4 md:gap-8 lg:gap-10">
           

           <motion.button 
             whileHover="hover"
             className="hidden sm:flex relative group items-center gap-5 px-10 py-4.5 md:px-12 md:py-5 overflow-hidden rounded-full"
           >
             {/* THE MAGNETIC DEPTH BORDER */}
             <motion.div 
                className={cn(
                  "absolute inset-0 rounded-full border-2 transition-colors duration-500 group-hover:border-white/40",
                  theme === "dark" 
                    ? "border-[#6C63FF]" 
                    : "border-[#0A0A0F]/20"
                )}
             />
             
             {/* THE LIQUID FILL (FLOWS FROM LEFT) */}
             <motion.div 
               variants={{
                 hover: { x: "0%" }
               }}
               initial={{ x: "-100%" }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
               className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] via-[#8B8DFF] to-[#6C63FF] z-0"
             />

             {/* TEXT CONTENT (DYNAMIC THEME SHIFTING) */}
             <motion.span 
               style={{ color: targetText }}
               className="relative z-10 text-xs md:text-sm font-black italic uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500 whitespace-nowrap"
             >
               CONTACT US
             </motion.span>

             {/* THE DYNAMIC 45 DEGREE ARROW HUB */}
             <div className={cn(
                "relative z-10 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all duration-700 group-hover:rotate-[405deg] shadow-[0_0_15px_rgba(10,10,15,0.3)]",
                theme === "dark" 
                   ? "bg-[#FFFFFF] text-[#0A0A0F] group-hover:bg-[#0A0A0F] group-hover:text-white" 
                   : "bg-[#0A0A0F] text-white group-hover:bg-[#FFFFFF] group-hover:text-[#0A0A0F]"
             )}>
               <span className="text-lg md:text-xl font-black mt-[-1px] ml-[1px]">↗</span>
             </div>
           </motion.button>

           {/* THEME TOGGLE ORB (INTEGRATED) */}
           <div className="hidden sm:block">
              <ThemeToggle />
           </div>

           {/* Mobile Menu Trigger (Dynamic Color shift) */}
           <button className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group relative">
              <div 
                 className={cn("w-8 h-1 rounded-full group-hover:w-4 group-hover:-translate-x-1 transition-all duration-500", theme === "dark" ? "bg-white" : "bg-[#0A0A0F]")} 
              />
              <div className="w-8 h-1 bg-[#6C63FF] rounded-full transition-all duration-300" />
              <div className="w-4 h-1 bg-[#FF6B35] rounded-full group-hover:w-7 transition-all duration-500" />
           </button>
        </div>

      {/* SUBTLE PROGRESS LINE ON SCROLL (MESH GRADIENT) */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#6C63FF] via-[#FF6B35] to-[#6C63FF] z-50 origin-left opacity-80"
        style={{ 
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
          backgroundSize: '200% 100%'
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </motion.nav>
  );
}
