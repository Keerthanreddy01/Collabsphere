"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PillBadgeProps {
  children: React.ReactNode;
  className?: string;
  dotClassName?: string;
  animateDot?: boolean;
}

export function PillBadge({ 
  children, 
  className, 
  dotClassName,
  animateDot = true 
}: PillBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full",
      "bg-primary/10 border border-primary/20 backdrop-blur-sm",
      "text-xs font-mono font-medium text-primary",
      className
    )}>
      {animateDot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot",
          dotClassName
        )} />
      )}
      {children}
    </div>
  );
}
