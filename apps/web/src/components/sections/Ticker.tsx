"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface TickerItem {
  type: "card";
  color: string;
  label: string;
}

interface TickerRowProps {
  items: (string | TickerItem)[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

const TickerRow = ({
  items,
  className,
  speed = 70,
  reverse = false
}: TickerRowProps) => {
  // Duplicate items twice for seamless horizontal looping
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className={cn("flex items-center overflow-hidden whitespace-nowrap py-8 will-change-transform cursor-pointer transition-all duration-700", className)}
    >
      <motion.div
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"]
        }}
        transition={{
          duration: isHovered ? speed * 1.5 : speed,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex w-fit items-center"
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center mx-20">
            <span
              className={cn(
                "text-[32px] md:text-5xl font-black italic uppercase transition-all duration-700 select-none leading-none",
                isHovered ? "opacity-100 tracking-[-0.01em]" : "opacity-90 tracking-[-0.04em]"
              )}
            >
              {typeof item === "string" ? item : item.label}
            </span>

            {/* Pulsing Node Separation (Glowing Dot) */}
            <div className="mx-20 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  scale: isHovered ? [1.1, 1.4, 1.1] : [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 rounded-full shadow-[0_0_15px_currentColor]"
                style={{
                  backgroundColor: typeof item === "string" ? "#6C63FF" : item.color,
                  color: typeof item === "string" ? "#6C63FF" : item.color
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export function TickerSection() {
  const row1Items = [
    "Find Your Teammates",
    { type: "card" as const, color: "#6C63FF", label: "AURA BUILD" },
    "Build in Public",
    "Ship Faster",
    { type: "card" as const, color: "#FF6B35", label: "BOLT STACK" },
    "Open Source",
    "Developer Network",
    { type: "card" as const, color: "#00FF94", label: "ZEN UI" },
    "Collaboration Rooms"
  ];

  const row2Items = [
    "POST YOUR PROJECT",
    { type: "card" as const, color: "#0A0A0F", label: "CODEBASE" },
    "FIND YOUR STACK",
    "BUILD IN PUBLIC",
    "SHIP TOGETHER",
    { type: "card" as const, color: "#FFE135", label: "INTERFACE" },
    "OPEN SOURCE FIRST",
    "DEVELOPER NETWORK"
  ];

  return (
    <div className="relative w-full py-24 -mt-24 z-10 bg-[#0A0A0F] overflow-visible">

      {/* 1. OPTION 1 (BEST): SMOOTH FADE OVERLAY (140px) — TICKER EMERGES FROM HERO */}
      <div className="absolute top-0 left-0 right-0 h-[140px] pointer-events-none z-[40]">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[#0A0A0F]/70 to-[#0A0A0F]" />
      </div>

      {/* 2. CINEMATIC EDGE MASK (20% FADE) */}
      <div className="absolute inset-0 z-20 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
        }}
      />

      {/* 3. RADIAL GLOW (DEPTH) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-[#6C63FF]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 4. PRO-LEVEL DYNAMIC HIGHWAY (0.3deg TILT) */}
      <div className="relative flex flex-col gap-10 z-10">

        {/* ROW 1: DARK LEFTWARD (75s) */}
        <div className="rotate-[0.3deg] overflow-visible">
          <TickerRow
            items={row1Items}
            className="bg-[#0b0b0b] text-white border-y border-white/5"
            speed={75}
          />
        </div>

        {/* ROW 2: BLUE RIGHTWARD (60s) */}
        <div className="-rotate-[0.3deg] overflow-visible">
          <TickerRow
            items={row2Items}
            className="bg-[#6C63FF] text-black shadow-2xl"
            speed={60}
            reverse
          />
        </div>

      </div>

    </div>
  );
}
