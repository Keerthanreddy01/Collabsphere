"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/shared/GlowButton";
import { Sparkles, Rocket, Zap, Heart, Globe, Send } from "lucide-react";

export const CTASection = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 noise-overlay" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="p-[2px] rounded-[3rem] bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-mask overflow-hidden relative shadow-[0_0_50px_rgba(124,58,237,0.2)]">
                    <div className="bg-[#0d0d0d] p-12 md:p-32 rounded-[calc(3rem-2px)] relative overflow-hidden flex flex-col items-center">
                        {/* Animating background blobs inside card */}
                        <div className="absolute -top-[50%] -left-[50%] w-[100%] h-[100%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute -bottom-[50%] -right-[50%] w-[100%] h-[100%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Join 2,400+ builders already on CollabSphere</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10 max-w-4xl uppercase"
                        >
                            Ready To Find Your <span className="text-gradient">Co-Builder?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-lg text-muted-foreground font-medium mb-12 max-w-2xl"
                        >
                            The project you've been dreaming of is one collaborator away. Join CollabSphere today and start building something real with world-class builders.
                        </motion.p>

                        <div className="relative group">
                            <GlowButton className="scale-125 px-12 py-5 text-xl relative z-10" onClick={() => window.location.href = "/register"}>
                                Start Building For Free <Rocket className="w-6 h-6 ml-3" />
                            </GlowButton>

                            {/* Glow pulse animation */}
                            <motion.div
                                className="absolute inset-0 bg-primary/40 blur-[40px] rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.1, 0.4, 0.1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                            />
                        </div>

                        <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-50">
                            {[
                                { icon: Zap, label: "Fast Matching" },
                                { icon: Heart, label: "Community Driven" },
                                { icon: Globe, label: "Global Reach" },
                                { icon: Send, label: "Direct Messing" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/60">
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2rem]">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
