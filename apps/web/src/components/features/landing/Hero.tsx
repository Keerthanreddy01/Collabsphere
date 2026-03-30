"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowButton } from "@/components/shared/GlowButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Rocket, ArrowDown, Users, Ship, Sparkles, Zap, Trophy, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-40 pb-20 bg-[#050505]">
            {/* Background Orbs with smoother gradients */}
            <div className="absolute inset-0 z-[-2] pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 45, 0],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -45, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-secondary/20 rounded-full blur-[120px]"
                />
            </div>

            {/* Premium Grid Pattern with center fade */}
            <div
                className="absolute inset-0 z-[-1] pointer-events-none opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(circle at center, black, transparent 80%)"
                }}
            />

            {/* Main Content */}
            <motion.div
                style={{ y: y1, opacity, scale }}
                className="relative z-10 max-w-7xl mx-auto px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-8 backdrop-blur-xl shadow-2xl"
                >
                    <div className="flex -space-x-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-5 h-5 rounded-full bg-primary/20 border border-black flex items-center justify-center">
                                <Users className="w-2.5 h-2.5 text-primary" />
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                        Trusted by 2,400+ builders worldwide
                    </span>
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85] uppercase"
                >
                    Find Your <span className="text-primary text-shadow-glow">People.</span> <br />
                    <span className="text-gradient">Build Big.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-medium leading-relaxed"
                >
                    CollabSphere connects developers, designers & hackers
                    to collaborate on projects that matter. Stop building in silos.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <GlowButton onClick={() => window.location.href = "/register"} className="h-14 px-10 shadow-primary/20 hover:scale-105 transition-transform duration-500">
                        Start Building <Rocket className="w-5 h-5 ml-2" />
                    </GlowButton>
                    <button 
                        onClick={() => window.location.href = "/explore"}
                        className="h-14 px-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2"
                    >
                        Explore Directory <Zap className="w-4 h-4 text-primary" />
                    </button>
                </motion.div>
            </motion.div>

            {/* Stats Section with Glassmorphism */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-32 max-w-5xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {[
                    { label: "Talented Builders", value: 2400, icon: Users, color: "text-primary" },
                    { label: "Active Hackathons", value: 45, icon: Trophy, color: "text-secondary" },
                    { label: "Open Projects", value: 890, icon: Heart, color: "text-primary" },
                ].map((stat, i) => (
                    <div key={i} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-500 text-center relative overflow-hidden">
                        <div className={`absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700`} />
                        <div className="flex flex-col items-center gap-2 relative z-10">
                            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                            <div className="text-4xl md:text-5xl font-black text-white flex items-center gap-1">
                                <AnimatedCounter value={stat.value} suffix="+" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors duration-500">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary/10 to-primary group-hover:h-16 transition-all duration-500" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary animate-pulse">SCROLL</span>
            </motion.div>
        </section>
    );
};
