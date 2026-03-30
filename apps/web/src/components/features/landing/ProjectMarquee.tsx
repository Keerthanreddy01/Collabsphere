"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/features/projects/ProjectCard";
import { Rocket, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const featuredProjects = [
    {
        id: "f1",
        title: "CodeFlow AI",
        description: "Open-source visual programming interface for LLM pipelines and autonomous agents.",
        ownerId: "u1",
        techStack: ["Next.js", "Python", "Wasm"],
        rolesNeeded: [
            { role: "Backend Dev", description: "API design", filled: false },
            { role: "UI Designer", description: "Design lead", filled: false }
        ],
        status: "building",
        teamSize: 3,
        maxTeamSize: 6,
        upvotes: ["1", "2", "3", "4", "5"],
    },
    {
        id: "f2",
        title: "EcoTrack",
        description: "Carbon footprint tracking for communities with real-time analytics and challenges.",
        ownerId: "u2",
        techStack: ["React Native", "Firebase"],
        rolesNeeded: [
            { role: "Mobile Dev", description: "iOS/Android", filled: false },
        ],
        status: "needs-help",
        teamSize: 2,
        maxTeamSize: 4,
        upvotes: ["1", "2"],
    },
    {
        id: "f3",
        title: "Nexus Protocol",
        description: "Decentralized identity protocol for cross-chain reputation and governance.",
        ownerId: "u3",
        techStack: ["Rust", "Solidity", "Go"],
        rolesNeeded: [
            { role: "Security Eng", description: "Audit lead", filled: false },
        ],
        status: "planning",
        teamSize: 1,
        maxTeamSize: 3,
        upvotes: ["1", "2", "3", "4", "5", "6", "7"],
    }
];

export const ProjectMarquee = () => {
    return (
        <section className="relative py-32 bg-[#050505] overflow-hidden">
            {/* Background Texture/Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
                 
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6"
                        >
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Crowdsourcing Talent</span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-black text-white leading-[0.85] uppercase tracking-tighter"
                        >
                            Live Projects <br />
                            <span className="text-primary text-shadow-glow">Needs Your Help.</span>
                        </motion.h2>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="pb-2"
                    >
                        <Button asChild className="rounded-full bg-white text-black hover:bg-white/90 text-xs font-black uppercase tracking-widest px-8 h-12 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                            <Link href="/explore">
                                View Full Directory <ArrowUpRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project, i) => (
                        <ProjectCard key={project.id} project={project as any} index={i} />
                    ))}
                </div>

                {/* Scrolling Marquee Background Effect (Visual only) */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none overflow-hidden -z-10">
                    <div className="flex whitespace-nowrap gap-12 text-[15vw] font-black uppercase tracking-tighter animate-marquee">
                        <span>BUILD • SHIP • SCALE • COLLABORATE • ITERATE • LAUNCH • BUILD • SHIP • SCALE • COLLABORATE • ITERATE • LAUNCH • </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
