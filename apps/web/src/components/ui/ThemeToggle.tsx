"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative group px-1">
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 overflow-hidden",
          theme === "dark" 
            ? "bg-white text-black" 
            : "bg-black text-white"
        )}
      >
        {/* WORLD CLASS MINIMALIST MORPH */}
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ y: 30, opacity: 0, rotate: -20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -30, opacity: 0, rotate: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative z-10"
            >
              <Moon size={20} strokeWidth={2.5} className="fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 30, opacity: 0, rotate: -20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -30, opacity: 0, rotate: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative z-10"
            >
              <Sun size={20} strokeWidth={2.5} className="fill-current" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIQUID SHADE OVERLAY (SUBTLE) */}
        <motion.div 
           initial={false}
           animate={{ 
             y: theme === "dark" ? "0%" : "100%" 
           }}
           className="absolute inset-0 bg-transparent z-0"
        />
      </motion.button>

      {/* MINIMALIST BADGE TOOLTIP (BOTTOM-POSITIONED) */}
      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-2 group-hover:translate-y-0">
         <div className={cn(
            "px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase italic shadow-2xl border whitespace-nowrap",
            theme === "dark" ? "bg-white text-black border-black/5" : "bg-black text-white border-white/5"
         )}>
            {theme === "dark" ? "LIGHT" : "DARK"} MODE
         </div>
      </div>
    </div>
  );
}
