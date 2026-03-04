"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowButton = ({
    children,
    className,
    onClick,
    variant = "primary"
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost" | "glass"
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x * 0.35);
        mouseY.set(y * 0.35);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const variants = {
        primary: "bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]",
        secondary: "bg-secondary text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]",
        ghost: "bg-transparent text-foreground border border-white/10 hover:bg-white/5",
        glass: "glass text-foreground hover:bg-white/10 border-white/20 shadow-xl",
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                x: springX,
                y: springY,
            }}
            className={cn(
                "relative px-8 py-3 rounded-full font-bold transition-all duration-300 active:scale-95 group overflow-hidden",
                variants[variant],
                className
            )}
        >
            <span className="relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                {children}
            </span>

            {/* Glow highlight */}
            <motion.div
                className="absolute inset-0 z-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                }}
            />
        </motion.button>
    );
};
