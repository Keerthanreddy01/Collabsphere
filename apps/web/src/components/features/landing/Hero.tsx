"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowButton } from "@/components/shared/GlowButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Rocket, ArrowDown, Users, Ship, Sparkles } from "lucide-react";

export const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Orbs */}
            <div className="absolute inset-0 z-[-2] pointer-events-none md:flex items-center justify-center overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        translateY: [0, 50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-primary/20 rounded-[40%_60%_70%_30%] blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                        translateY: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] bg-secondary/20 rounded-[60%_40%_30%_70%] blur-[100px]"
                />
            </div>

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 z-[-1] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Main Content */}
            <motion.div
                style={{ y: y1 }}
                className="relative z-10 max-w-7xl mx-auto px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Trusted by 2,400+ builders worldwide
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9]"
                >
                    Find Your People. <br />
                    <span className="text-gradient">Build Something Real.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-medium"
                >
                    CollabSphere connects developers, designers & builders
                    to collaborate on projects that matter. Stop building alone.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <GlowButton onClick={() => window.location.href = "/register"}>
                        Start Building <Rocket className="w-5 h-5 ml-2" />
                    </GlowButton>
                    <GlowButton variant="ghost" className="rounded-full px-8" onClick={() => window.location.href = "/explore"}>
                        Explore Projects
                    </GlowButton>
                </motion.div>
            </motion.div>

            {/* Stats Below */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 px-6 max-w-5xl mx-auto"
            >
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3 text-4xl md:text-5xl font-black text-white mb-1">
                        <Users className="w-8 h-8 text-primary" />
                        <AnimatedCounter value={2400} suffix="+" />
                    </div>
                    <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs">
                        Skilled Builders
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3 text-4xl md:text-5xl font-black text-white mb-1">
                        <Sparkles className="w-8 h-8 text-secondary" />
                        <AnimatedCounter value={890} suffix="+" />
                    </div>
                    <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs">
                        Open Projects
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3 text-4xl md:text-5xl font-black text-white mb-1">
                        <Ship className="w-8 h-8 text-primary" />
                        <AnimatedCounter value={140} suffix="+" />
                    </div>
                    <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs">
                        Shipped Products
                    </p>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth"
                    });
                }}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Scroll</span>
                <ArrowDown className="w-4 h-4 text-primary" />
            </motion.div>
        </section>
    );
};
