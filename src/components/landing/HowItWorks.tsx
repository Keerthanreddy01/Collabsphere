"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Rocket, Users, Globe, Terminal, Sparkles, Send, Ship } from "lucide-react";
// GlassCard removed — styles applied inline via glass-card utility

const steps = [
    {
        number: "01",
        title: "Post Your Project",
        description: "Share your vision, the tech stack you're using, and the roles you need filled. Whether it's a weekend hack or a startup MVP.",
        icon: Terminal,
        color: "from-primary/20",
        accent: "text-primary",
        mockup: (
            <div className="w-full h-full bg-black/60 rounded-xl border border-white/10 p-4 font-mono text-xs overflow-hidden relative">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.4 h-2.4 rounded-full bg-red-400" />
                    <div className="w-2.4 h-2.4 rounded-full bg-yellow-400" />
                    <div className="w-2.4 h-2.4 rounded-full bg-green-400" />
                </div>
                <div className="space-y-3">
                    <div className="h-4 w-[80%] bg-primary/20 rounded animate-pulse" />
                    <div className="h-4 w-[60%] bg-white/10 rounded" />
                    <div className="h-20 w-full bg-white/5 rounded p-2 text-[10px] text-muted-foreground whitespace-pre">
                        {`> name: "CollabSphere"\n> tech: ["Next.js", "Firebase", "Framer"]\n> status: "Needs React Dev"`}
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div className="h-6 w-20 bg-primary/30 rounded-full border border-primary/40" />
                        <div className="h-6 w-20 bg-white/10 rounded-full border border-white/20" />
                    </div>
                </div>
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-4 right-4 text-primary opacity-20"
                >
                    <Rocket className="w-20 h-20" />
                </motion.div>
            </div>
        )
    },
    {
        number: "02",
        title: "Match With Builders",
        description: "Connect with developers, designers, and entrepreneurs from around the globe who share your passion for building in public.",
        icon: Users,
        color: "from-secondary/20",
        accent: "text-secondary",
        mockup: (
            <div className="w-full h-full bg-black/60 rounded-xl border border-white/10 p-4 overflow-hidden relative grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5 shadow-lg group-hover:border-secondary/30"
                    >
                        <div className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                            <Users className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="h-2 w-12 bg-white/20 rounded" />
                        <div className="h-2 w-8 bg-white/10 rounded" />
                    </motion.div>
                ))}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-secondary/10 blur-xl z-[-1]"
                />
            </div>
        )
    },
    {
        number: "03",
        title: "Ship Together",
        description: "Launch your project, build your portfolio, and grow together. Build in public and get feedback from a community of real builders.",
        icon: Ship,
        color: "from-primary/20",
        accent: "text-primary",
        mockup: (
            <div className="w-full h-full bg-black/60 rounded-xl border border-white/10 p-4 overflow-hidden relative flex flex-col items-center justify-center gap-4">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [-5, 5, -5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-primary drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                >
                    <Send className="w-24 h-24" />
                </motion.div>
                <div className="text-center">
                    <p className="text-sm font-bold text-white mb-1">Project Launched!</p>
                    <div className="flex gap-2 justify-center">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
];

export const HowItWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative w-full bg-[#0d0d0d]" style={{ position: "relative" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row min-h-[300vh]">

                {/* Sticky Left Panel */}
                <div className="md:w-1/2 h-screen sticky top-0 flex flex-col justify-center pointer-events-none">
                    <div className="relative">
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0.1, 1, 0.1, 0.1]) }}
                            className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[20vw] font-black text-primary/5 select-none"
                        >
                            01
                        </motion.div>
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0.1, 1, 0.1]) }}
                            className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[20vw] font-black text-secondary/5 select-none"
                        >
                            02
                        </motion.div>
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 0.1, 1]) }}
                            className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[20vw] font-black text-primary/5 select-none"
                        >
                            03
                        </motion.div>

                        <motion.div className="relative z-10 max-w-sm">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
                            >
                                Build Smarter <br />
                                Together.
                            </motion.h2>
                            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                                Three simple steps to transition from an idea to a shipped product with the perfect team.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Content Cards */}
                <div className="md:w-1/2 py-24 flex flex-col gap-[50vh]">
                    {steps.map((step, index) => (
                        <StepCard key={step.number} step={step} index={index} />
                    ))}
                    {/* Extra spacer at bottom */}
                    <div className="h-[20vh]" />
                </div>
            </div>
        </section>
    );
};

const StepCard = ({ step, index }: { step: typeof steps[0], index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 70%", "end 30%"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.5]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className="relative w-full aspect-square md:aspect-auto md:h-[600px] flex flex-col justify-between" // position:relative is already set via "relative" class
        >
            <div className="bg-gradient-to-br from-white/10 to-transparent p-1 rounded-3xl border border-white/5 shadow-2xl h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center p-8 bg-[#111] rounded-[calc(1.5rem-2px)] m-0.5 overflow-hidden">
                    {step.mockup}
                </div>
                <div className="p-8 pb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} border border-white/5 flex items-center justify-center`}>
                            <step.icon className={`w-6 h-6 ${step.accent}`} />
                        </div>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">Step {step.number}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-sm">
                        {step.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
