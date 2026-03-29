"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Code, Design, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
    { name: "CodeFlow", tech: ["Svelte", "Golang", "Wasm"], role: "Needs UI/UX", color: "from-blue-600", members: 3 },
    { name: "EcoTrack", tech: ["React Native", "Firebase", "Leaflet"], role: "Needs Contributor", color: "from-green-600", members: 5 },
    { name: "Nexus Chat", tech: ["Next.js", "Socket.io", "Redis"], role: "Needs Backend", color: "from-purple-600", members: 2 },
    { name: "MetaVerse Hub", tech: ["Unity", "C#", "Three.js"], role: "Needs 3D Artist", color: "from-red-600", members: 4 },
    { name: "Artsy AI", tech: ["Python", "PyTorch", "Tailwind"], role: "Needs Prompt Eng", color: "from-orange-600", members: 6 },
    { name: "Fintech Wiz", tech: ["Rust", "PostgreSQL", "Docker"], role: "Needs Security", color: "from-cyan-600", members: 3 },
    { name: "HealthPal", tech: ["SwiftUI", "CoreML", "iCloud"], role: "Needs Designer", color: "from-pink-600", members: 2 },
    { name: "Solaris", tech: ["Vue", "Node.js", "AWS"], role: "Needs DevOps", color: "from-amber-600", members: 4 },
];

export const ProjectMarquee = () => {
    return (
        <section className="py-24 bg-black overflow-hidden relative">
            {/* Background noise texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none noise-overlay" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter"
                >
                    Live Projects <br />
                    <span className="text-secondary">Needs Your Help.</span>
                </motion.h2>
            </div>

            <div className="flex flex-col gap-8 relative">
                <MarqueeRow items={projects.slice(0, 4)} direction="left" />
                <MarqueeRow items={projects.slice(4)} direction="right" />
            </div>
        </section>
    );
};

const MarqueeRow = ({ items, direction }: { items: typeof projects; direction: "left" | "right" }) => {
    const rowItems = [...items, ...items, ...items]; // Triple for continuous loop

    return (
        <div className="flex overflow-hidden select-none marquee-container group">
            <motion.div
                animate={{
                    x: direction === "left" ? [0, -100 * items.length + "%"] : [-100 * items.length + "%", 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
                className="flex gap-8 px-4 py-8 marquee-scroll group-hover:[animation-play-state:paused]"
                style={{ width: `${items.length * 3 * 350}px` }} // Approximate card width
            >
                {rowItems.map((project, i) => (
                    <div
                        key={i}
                        className="w-[320px] shrink-0 p-1 group/card rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 transition-transform duration-500 hover:scale-[1.02]"
                    >
                        <div className="bg-[#111] p-6 rounded-[calc(1.5rem-2px)] h-[220px] flex flex-col justify-between overflow-hidden relative">
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${project.color} to-transparent blur-3xl opacity-20 pointer-events-none`} />

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xl font-bold text-white tracking-tight">{project.name}</h4>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(j => (
                                            <Avatar key={j} className="w-6 h-6 border-2 border-[#111]">
                                                <AvatarImage src={`https://avatar.vercel.sh/${project.name}${j}`} />
                                                <AvatarFallback>B</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {project.members > 3 && (
                                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white font-bold border-2 border-[#111]">
                                                +{project.members - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-full border border-white/5 bg-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                                <Badge variant="secondary" className="bg-white/5 text-white border-white/10 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                                    {project.role}
                                </Badge>
                                <div className="text-primary group-hover/card:translate-x-1 transition-transform">
                                    <Code className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
