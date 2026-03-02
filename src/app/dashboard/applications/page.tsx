"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, XCircle, Clock, Star, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const applications = [
    { project: "MetaVerse Hub", role: "3D Artist", status: "pending", time: "2h ago", founder: "Marco Rossi", founderAvatar: "marco-rossi", stars: 42 },
    { project: "Artsy AI", role: "Frontend Dev", status: "accepted", time: "1d ago", founder: "Elena Gilbert", founderAvatar: "elena-gilbert", stars: 128 },
    { project: "Solaris", role: "DevOps Engineer", status: "rejected", time: "3d ago", founder: "David Kim", founderAvatar: "david-kim", stars: 67 },
    { project: "CodeFlow IDE", role: "TypeScript Dev", status: "pending", time: "5h ago", founder: "Sarah Chen", founderAvatar: "sarah-chen", stars: 89 },
    { project: "HealthPal", role: "React Native Dev", status: "accepted", time: "1w ago", founder: "Jake Miller", founderAvatar: "jake-miller", stars: 210 },
];

const statusConfig = {
    pending: { label: "Pending Review", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: Clock },
    accepted: { label: "Accepted", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle2 },
    rejected: { label: "Not Selected", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: XCircle },
};

export default function ApplicationsPage() {
    const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
    const filtered = filter === "all" ? applications : applications.filter(a => a.status === filter);

    return (
        <div className="space-y-8 pb-24">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter italic">Applications</h1>
                    <p className="text-muted-foreground text-sm mt-1">Track your project applications</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {(["all", "pending", "accepted", "rejected"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-xl border transition-all",
                                filter === f
                                    ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                                    : "text-muted-foreground border-white/10 hover:border-white/20 hover:text-white"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {filtered.map((app, i) => {
                    const s = statusConfig[app.status as keyof typeof statusConfig];
                    const SIcon = s.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="glass-card rounded-2xl border border-white/8 px-5 py-4 hover:border-white/15 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Send className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="text-sm font-black text-white">{app.project}</h4>
                                        <span className="text-muted-foreground text-xs">·</span>
                                        <span className="text-xs text-muted-foreground">{app.role}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-4 h-4">
                                            <AvatarImage src={`https://avatar.vercel.sh/${app.founderAvatar}`} />
                                            <AvatarFallback className="text-[6px]">{app.founder[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-[10px] text-muted-foreground">{app.founder}</span>
                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                            <Star className="w-2.5 h-2.5" />{app.stars}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-muted-foreground">{app.time}</span>
                                    <Badge className={cn("text-[9px] font-black uppercase tracking-wider border px-3 py-1 rounded-full flex items-center gap-1.5", s.color)}>
                                        <SIcon className="w-3 h-3" /> {s.label}
                                    </Badge>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
