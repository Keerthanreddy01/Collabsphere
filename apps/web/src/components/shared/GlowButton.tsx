"use client";

import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
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

    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x * 0.25);
        mouseY.set(y * 0.25);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const variants = {
        primary: "bg-primary text-white border border-primary/20 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)]",
        secondary: "bg-[#050505] text-white border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:bg-white/5",
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
                "relative h-12 px-8 rounded-full font-black uppercase tracking-widest text-[10px] transition-all duration-300 active:scale-95 group overflow-hidden",
                variants[variant],
                className
            )}
        >
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-300">
                {children}
            </span>

            {/* Internal Glow Pulse */}
            <motion.div
                className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
                animate={{
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                }}
            />
        </motion.button>
    );
};
