"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface GradientButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export function GradientButton({ 
  variant = "primary", 
  size = "md",
  children, 
  className, 
  ...rest 
}: GradientButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none group";
  
  const variants = {
    primary: "bg-primary text-white hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]",
    secondary: "bg-secondary text-[#0A0A0F] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]",
    ghost: "bg-transparent border border-primary/20 text-white hover:bg-primary/10"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
    xl: "px-10 py-5 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
