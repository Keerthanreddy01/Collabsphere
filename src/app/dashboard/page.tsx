"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    Send,
    Users,
    Eye,
    ChevronRight,
    Github,
    Plus,
    Sparkles,
    SendHorizonal,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    TrendingUp,
    Clock,
    LayoutDashboard
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { useAuth } from "@/hooks/useAuth";

const stats = [
    { label: "Projects Posted", value: 4, icon: Rocket, color: "text-primary", bg: "bg-primary/20", border: "border-primary/30" },
    { label: "Applications Sent", value: 12, icon: Send, color: "text-secondary", bg: "bg-secondary/20", border: "border-secondary/30" },
    { label: "Profile Views", value: 256, icon: Eye, color: "text-primary", bg: "bg-primary/20", border: "border-primary/30" },
    { label: "Collab Requests", value: 8, icon: SendHorizonal, color: "text-secondary", bg: "bg-secondary/20", border: "border-secondary/30" },
];

const pendingApps = [
    { project: "Nexus Chat", user: "Alice Carter", role: "React Dev", status: "pending", time: "2h ago" },
    { project: "DecentralShop", user: "Bob Wilson", role: "Rust Engineer", status: "pending", time: "1d ago" },
];

export default function DashboardOverview() {
    const { user } = useAuth();
    const [greet, setGreet] = useState("Good morning");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 12 && hour < 17) setGreet("Good afternoon");
        else if (hour >= 17) setGreet("Good evening");
    }, []);

    return (
        <div className="space-y-12 pb-24">
            {/* Welcome Banner */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-1 lg:px-0">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/5 w-fit mb-4">
                        <LayoutDashboard className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Overview Dashboard</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-4 italic">
                        {greet}, <br />
                        <span className="text-gradient underline decoration-white/10">{user?.displayName?.split(" ")[0] || "BUILDER"} 👋</span>
                    </h1>
                    <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </motion.div>

                {/* Activity Mini Tracker */}
                <div className="flex items-center gap-4 bg-[#111] p-6 rounded-3xl border border-white/5 group relative overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-12 transition-transform">
                        <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <p className="text-white font-black text-xl italic">+12% Activity</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Since last week</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#111] p-8 rounded-3xl border border-white/5 flex flex-col justify-between h-[180px] group hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-lg", stat.bg, stat.border)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <span className="text-4xl font-black text-white italic">{stat.value}+</span>
                        </div>
                        <div className="mt-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white transition-colors">{stat.label}</p>
                        </div>
                        {/* Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                    </motion.div>
                ))}
            </div>

            {/* Activity Heatmap Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ActivityHeatmap />

                    {/* Recommended Projects Carousel/List Slider */}
                    <div className="bg-[#111] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Recommended For You</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Based on React & Next.js skills</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white text-xs font-black uppercase tracking-widest">
                                View All <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: "EcoTrack", tech: "Mobile", role: "Contributor", color: "from-emerald-500" },
                                { name: "MetaHub", tech: "Unity", role: "3D Artist", color: "from-blue-500" }
                            ].map((proj, i) => (
                                <div key={i} className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br to-transparent flex items-center justify-center shadow-lg", proj.color)}>
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <Badge className="bg-primary/20 text-primary border-primary/20 text-[8px] tracking-widest font-black uppercase">NEW</Badge>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{proj.name}</h4>
                                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{proj.tech}</span>
                                        <div className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{proj.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pending Applications Sidebar (Inside Grid) */}
                <div className="space-y-8">
                    <div className="bg-[#111] p-8 rounded-3xl border border-white/5 h-full flex flex-col">
                        <div className="flex flex-col mb-10">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Manage Requests</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Founders seeking your help</p>
                        </div>

                        <div className="space-y-6 flex-1">
                            {pendingApps.map((app, i) => (
                                <div key={i} className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={`https://avatar.vercel.sh/${app.user}`} />
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-bold text-white">{app.user}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{app.role}</p>
                                        </div>
                                        <div className="ml-auto flex flex-col items-end">
                                            <span className="text-[9px] text-muted-foreground font-medium uppercase">{app.time}</span>
                                            <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-tight italic">PENDING</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-white mb-6 group-hover:text-primary transition-colors">Apply: {app.project}</p>
                                    <div className="flex gap-3">
                                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg h-10">
                                            Accept <CheckCircle2 className="w-3 h-3 ml-2" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="w-10 h-10 p-0 rounded-full border border-white/5 hover:bg-red-400/20 text-muted-foreground hover:text-red-400">
                                            <XCircle className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="ghost" className="mt-12 w-full text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-white group border border-white/5 rounded-2xl h-14">
                            View All Applications <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer Section in Dashboard */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-30 px-1 pt-12 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">© 2026 CollabSphere Dashboard</p>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Server: Mumbai (AWS)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">v1.4.2-stable</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
