"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowButton } from "../shared/GlowButton";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { Rocket, ArrowDown, Users, Ship, Sparkles } from "lucide-react";

export const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
            {/* Background Orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        translateY: [0, 50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-primary/20 rounded-[40%_60%_70%_30%] blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                        translateY: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] bg-secondary/20 rounded-[60%_40%_30%_70%] blur-[100px]"
                />
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Main Content — separate from stats so they don't overlap */}
            <motion.div
                style={{ y: y1 }}
                className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Trusted by 2,400+ builders worldwide
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9] text-balance"
                >
                    Find Your People. <br />
                    <span className="text-gradient">Build Something Real.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-medium leading-relaxed"
                >
                    CollabSphere connects developers, designers & builders
                    to collaborate on projects that matter. Stop building alone.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
                >
                    <GlowButton onClick={() => (window.location.href = "/dashboard")}>
                        Join the Platform <Rocket className="w-5 h-5 ml-2" />
                    </GlowButton>
                    <GlowButton
                        variant="ghost"
                        className="rounded-full px-8"
                        onClick={() => (window.location.href = "/explore")}
                    >
                        Explore Projects
                    </GlowButton>
                </motion.div>

                {/* Stats — below CTAs with clear separation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="w-full max-w-3xl mx-auto grid grid-cols-3 gap-4 md:gap-8"
                >
                    {[
                        { icon: Users, value: 2400, suffix: "+", label: "Skilled Builders", color: "text-primary" },
                        { icon: Sparkles, value: 890, suffix: "+", label: "Open Projects", color: "text-secondary" },
                        { icon: Ship, value: 140, suffix: "+", label: "Shipped Products", color: "text-primary" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="glass-card rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2"
                        >
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            <div className={`text-3xl md:text-4xl font-black text-white`}>
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-muted-foreground font-medium uppercase tracking-[0.15em] text-[9px] md:text-[10px] text-center">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Scroll</span>
                <ArrowDown className="w-4 h-4 text-primary" />
            </motion.div>
        </section>
    );
};
