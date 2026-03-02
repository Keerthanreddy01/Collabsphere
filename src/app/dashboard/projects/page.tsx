"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Plus, Star, Users, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const projects = [
    { name: "Nexus Chat", desc: "Real-time messaging platform with E2E encryption.", tech: ["Next.js", "Socket.io", "Redis"], status: "In Development", statusColor: "text-green-400 bg-green-400/10 border-green-400/20", members: 4, stars: 14, progress: 62 },
    { name: "EcoTrack", desc: "Carbon footprint tracking mobile app.", tech: ["React Native", "Firebase"], status: "Beta Testing", statusColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", members: 3, stars: 31, progress: 84 },
    { name: "Fintech Wiz", desc: "Portfolio analytics for crypto and equity markets.", tech: ["Rust", "PostgreSQL"], status: "Planning", statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20", members: 2, stars: 7, progress: 23 },
    { name: "CodeFlow IDE", desc: "Browser-based collaborative code editor.", tech: ["Monaco", "WebSockets", "Docker"], status: "Concept", statusColor: "text-muted-foreground bg-white/5 border-white/10", members: 1, stars: 0, progress: 8 },
];

export default function ProjectsPage() {
    return (
        <div className="space-y-8 pb-24">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter italic">My Projects</h1>
                    <p className="text-muted-foreground text-sm mt-1">{projects.length} projects · {projects.filter(p => p.status !== "Concept").length} active</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-wider rounded-xl h-10 gap-2 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                    <Plus className="w-4 h-4" /> New Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="glass-card rounded-3xl border border-white/8 p-6 hover:border-white/15 transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Rocket className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-white group-hover:text-primary transition-colors">{proj.name}</h3>
                                    <Badge className={cn("text-[9px] font-black uppercase tracking-wider border px-2 py-0.5 rounded-full mt-1", proj.statusColor)}>{proj.status}</Badge>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{proj.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.tech.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/8">{t}</span>)}
                        </div>
                        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                            <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${proj.progress}%` }} />
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground">{proj.progress}%</span>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Users className="w-3 h-3" />{proj.members}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Star className="w-3 h-3" />{proj.stars}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
