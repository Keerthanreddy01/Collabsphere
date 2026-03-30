"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Users, Terminal, Sparkles, Send, Ship, Code, Palette, Search } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Post Your Idea",
        description: "Visionaries, start here. Share your vision, the tech stack you're using, and the specifically defined roles you need filled. Whether it's a weekend hack or a startup MVP.",
        icon: Terminal,
        color: "from-primary/20",
        accent: "text-primary",
        mockup: (
            <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 font-mono text-xs overflow-hidden relative shadow-2xl">
                <div className="flex items-center gap-1.5 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
                <div className="space-y-4">
                    <div className="h-4 w-[90%] bg-primary/20 rounded-md border border-primary/20" />
                    <div className="h-4 w-[70%] bg-white/5 rounded-md" />
                    <div className="space-y-2 pt-4">
                        <div className="h-2 w-full bg-white/5 rounded" />
                        <div className="h-2 w-[80%] bg-white/5 rounded" />
                        <div className="h-2 w-[40%] bg-white/5 rounded" />
                    </div>
                    <div className="flex gap-2 mt-6 pt-6 border-t border-white/5">
                        <div className="h-7 w-24 bg-primary/20 rounded-full border border-primary/30 flex items-center justify-center">
                           <span className="text-[8px] font-bold text-primary tracking-widest uppercase">Public</span>
                        </div>
                        <div className="h-7 w-24 bg-white/5 rounded-full border border-white/10" />
                    </div>
                </div>
            </div>
        )
    },
    {
        number: "02",
        title: "Match With Builders",
        description: "The engine room. Connect with developers, designers, and entrepreneurs from around the globe who share your passion for building in public.",
        icon: Users,
        color: "from-primary/20",
        accent: "text-primary",
        mockup: (
            <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 overflow-hidden relative grid grid-cols-2 gap-4 shadow-2xl">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col items-center justify-center gap-3 bg-white/[0.03] p-4 rounded-xl border border-white/[0.05] relative group"
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative">
                            <Users className="w-6 h-6 text-primary" />
                            {i === 1 && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
                            )}
                        </div>
                        <div className="h-2 w-16 bg-white/10 rounded" />
                        <div className="h-2 w-10 bg-white/5 rounded" />
                    </motion.div>
                ))}
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
            <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 overflow-hidden relative flex flex-col items-center justify-center gap-6 shadow-2xl">
                <div className="relative">
                    <motion.div
                        animate={{ 
                            y: [0, -15, 0],
                            rotate: [-5, 5, -5]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="p-8 rounded-3xl bg-primary/10 border border-primary/20 shadow-[0_0_50px_rgba(34,197,94,0.1)]"
                    >
                        <Ship className="w-20 h-20 text-primary" />
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/20 blur-2xl rounded-full z-[-1]"
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm font-black text-white tracking-widest uppercase mb-2">Build Shipped!</p>
                    <div className="flex gap-1.5 justify-center">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
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
        <section ref={containerRef} className="relative w-full bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row min-h-[300vh]">

                {/* Sticky Left Panel */}
                <div className="md:w-1/2 h-screen sticky top-0 flex flex-col justify-center pointer-events-none">
                    <div className="relative overflow-hidden h-full flex flex-col justify-center">
                        <motion.div
                            style={{ 
                                opacity: useTransform(scrollYProgress, [0, 0.33], [0, 0.05]),
                                scale: useTransform(scrollYProgress, [0, 0.33], [0.8, 1])
                            }}
                            className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[450px] font-black text-primary select-none leading-none tracking-tighter"
                        >
                            01
                        </motion.div>
                        <motion.div
                            style={{ 
                                opacity: useTransform(scrollYProgress, [0.33, 0.66], [0, 0.05]),
                                scale: useTransform(scrollYProgress, [0.33, 0.66], [0.8, 1])
                            }}
                            className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[450px] font-black text-primary select-none leading-none tracking-tighter"
                        >
                            02
                        </motion.div>
                        <motion.div
                            style={{ 
                                opacity: useTransform(scrollYProgress, [0.66, 1], [0, 0.05]),
                                scale: useTransform(scrollYProgress, [0.66, 1], [0.8, 1])
                            }}
                            className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[450px] font-black text-primary select-none leading-none tracking-tighter"
                        >
                            03
                        </motion.div>

                        <motion.div className="relative z-10 max-w-sm ml-4 md:ml-0">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">The Workflow</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-6xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.85]"
                            >
                                Build <br />
                                <span className="text-primary text-shadow-glow">Smarter</span> <br />
                                Together.
                            </motion.h2>
                            <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-[300px]">
                                Your journey from abstract concept to market-ready product, simplified into three core stages.
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

const StepCard = ({ step, index }: { step: any, index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 20%"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className="w-full flex flex-col justify-center min-h-[500px]"
        >
            <div className="group relative bg-[#0a0a0a] p-1 rounded-[2.5rem] border border-white/5 transition-all duration-500 hover:border-primary/30 shadow-2xl">
                <div className="aspect-[4/3] w-full flex items-center justify-center p-8 bg-[#050505] rounded-[calc(2.5rem-4px)] m-0 overflow-hidden relative">
                    {step.mockup}
                    {/* Corner gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                </div>
                <div className="p-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5`}>
                            <step.icon className={`w-7 h-7 text-primary`} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary/60">Stage</span>
                           <span className="text-xl font-black text-white leading-none tracking-tighter">{step.number}</span>
                        </div>
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">{step.title}</h3>
                    <p className="text-muted-foreground font-medium text-base leading-relaxed">
                        {step.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
