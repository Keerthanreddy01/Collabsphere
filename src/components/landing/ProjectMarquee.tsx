"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code2 } from "lucide-react";

const projects = [
    {
        name: "CodeFlow",
        tech: ["Svelte", "Golang", "Wasm"],
        role: "Needs UI/UX",
        color: "from-blue-600/20",
        accent: "border-blue-500/20",
        members: ["codeflow1", "codeflow2", "codeflow3"],
    },
    {
        name: "EcoTrack",
        tech: ["React Native", "Firebase", "Leaflet"],
        role: "Needs Contributor",
        color: "from-green-600/20",
        accent: "border-green-500/20",
        members: ["ecotrack1", "ecotrack2", "ecotrack3", "ecotrack4", "ecotrack5"],
    },
    {
        name: "Nexus Chat",
        tech: ["Next.js", "Socket.io", "Redis"],
        role: "Needs Backend Dev",
        color: "from-purple-600/20",
        accent: "border-purple-500/20",
        members: ["nexus1", "nexus2"],
    },
    {
        name: "MetaVerse Hub",
        tech: ["Unity", "C#", "Three.js"],
        role: "Needs 3D Artist",
        color: "from-red-600/20",
        accent: "border-red-500/20",
        members: ["meta1", "meta2", "meta3", "meta4"],
    },
    {
        name: "Artsy AI",
        tech: ["Python", "PyTorch", "FastAPI"],
        role: "Needs Prompt Eng",
        color: "from-orange-600/20",
        accent: "border-orange-500/20",
        members: ["artsy1", "artsy2", "artsy3", "artsy4", "artsy5", "artsy6"],
    },
    {
        name: "Fintech Wiz",
        tech: ["Rust", "PostgreSQL", "Docker"],
        role: "Needs Security Dev",
        color: "from-cyan-600/20",
        accent: "border-cyan-500/20",
        members: ["fintech1", "fintech2", "fintech3"],
    },
    {
        name: "HealthPal",
        tech: ["SwiftUI", "CoreML", "iCloud"],
        role: "Needs Designer",
        color: "from-pink-600/20",
        accent: "border-pink-500/20",
        members: ["health1", "health2"],
    },
    {
        name: "Solaris",
        tech: ["Vue", "Node.js", "AWS"],
        role: "Needs DevOps Eng",
        color: "from-amber-600/20",
        accent: "border-amber-500/20",
        members: ["solaris1", "solaris2", "solaris3", "solaris4"],
    },
];

export const ProjectMarquee = () => {
    return (
        <section className="py-24 bg-black overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none noise-overlay" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter"
                >
                    Live Projects <br />
                    <span className="text-gradient">Needs Your Help.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="text-muted-foreground font-medium text-sm"
                >
                    Hover any card to pause. Click to apply.
                </motion.p>
            </div>

            <div className="flex flex-col gap-6 relative">
                <MarqueeRow items={projects.slice(0, 4)} direction="left" speed={40} />
                <MarqueeRow items={projects.slice(4)} direction="right" speed={50} />
            </div>
        </section>
    );
};

const MarqueeRow = ({
    items,
    direction,
    speed,
}: {
    items: typeof projects;
    direction: "left" | "right";
    speed: number;
}) => {
    // Duplicate for seamless loop
    const doubled = [...items, ...items];
    const cardWidth = 340; // px
    const gap = 24; // px (gap-6)
    const totalWidth = items.length * (cardWidth + gap);

    return (
        <div
            className="flex overflow-hidden select-none group"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        >
            <motion.div
                animate={{
                    x: direction === "left" ? [0, -totalWidth] : [-totalWidth, 0],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex gap-6 px-3 will-change-transform group-hover:[animation-play-state:paused]"
                style={{ width: `${doubled.length * (cardWidth + gap)}px` }}
            >
                {doubled.map((project, i) => (
                    <div
                        key={`${project.name}-${i}`}
                        className={`w-[340px] shrink-0 rounded-3xl glass-card border ${project.accent} hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                    >
                        <div className={`bg-gradient-to-br ${project.color} to-[#111] p-6 rounded-3xl h-[200px] flex flex-col justify-between overflow-hidden relative`}>
                            {/* Ambient glow */}
                            <div className={`absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br ${project.color} to-transparent blur-2xl opacity-60 pointer-events-none`} />

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-lg font-black text-white tracking-tight">{project.name}</h4>
                                    <div className="flex -space-x-2">
                                        {project.members.slice(0, 3).map((seed, j) => (
                                            <Avatar key={j} className="w-7 h-7 border-2 border-[#111]">
                                                <AvatarImage src={`https://avatar.vercel.sh/${seed}`} />
                                                <AvatarFallback className="text-[8px]">B</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {project.members.length > 3 && (
                                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-white font-black border-2 border-[#111]">
                                                +{project.members.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-full border border-white/8 bg-white/5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/8 pt-3 mt-auto">
                                <Badge
                                    variant="secondary"
                                    className="bg-white/8 text-white border-white/10 text-[9px] font-black uppercase tracking-widest px-3 py-1"
                                >
                                    {project.role}
                                </Badge>
                                <Code2 className="w-4 h-4 text-primary opacity-60" />
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
