"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Code2, GitPullRequest, Star, Zap, Terminal } from "lucide-react";

export const GitHubStats = ({ username }: { username: string }) => {
    // Mock data for display
    const stats = [
        { label: "Repos", value: "32", icon: Code2, color: "text-primary" },
        { label: "Followers", value: "156", icon: Github, color: "text-white" },
        { label: "Stars", value: "482", icon: Star, color: "text-secondary" },
        { label: "PRs", value: "118", icon: GitPullRequest, color: "text-secondary" }
    ];

    const languages = [
        { name: "TypeScript", percent: 45, color: "bg-blue-500" },
        { name: "Rust", percent: 30, color: "bg-orange-500" },
        { name: "Go", percent: 15, color: "bg-cyan-500" },
        { name: "Other", percent: 10, color: "bg-zinc-500" }
    ];

    return (
        <div className="bg-[#111] p-10 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-10">
                <div className="flex flex-col">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white italic">GitHub Intelligence</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Real-time sync from public repo</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    <Github className="w-6 h-6 text-white" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
                {stats.map((s, i) => (
                    <div key={i} className="bg-black/30 p-6 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <s.icon className={cn("w-4 h-4", s.color)} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</span>
                        </div>
                        <p className="text-2xl font-black text-white italic">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Top Languages</span>
                    <Zap className="w-3 h-3 text-secondary animate-pulse" />
                </div>
                <div className="flex h-3 w-full rounded-full overflow-hidden bg-white/5">
                    {languages.map((l, i) => (
                        <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${l.percent}%` }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className={cn(l.color, "h-full")}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap gap-4">
                    {languages.map((l, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className={cn("w-2 h-2 rounded-full", l.color)} />
                            <span className="text-[9px] font-bold text-white uppercase">{l.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-2">
                <Terminal className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Active Streak: 42 Days</span>
            </div>
        </div>
    );
};

// Simple CN helper for this file if not imported
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
