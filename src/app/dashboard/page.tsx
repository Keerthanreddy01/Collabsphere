"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    Send,
    Eye,
    ChevronRight,
    Github,
    Sparkles,
    SendHorizonal,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    TrendingUp,
    Bell,
    Heart,
    MessageCircle,
    Star,
    GitMerge,
    Zap,
    Clock,
    Users,
    Code2,
    LayoutDashboard,
    Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

// ── Real-looking mock data ──────────────────────────────────────────────
const stats = [
    { label: "Projects Posted", value: "4", icon: Rocket, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", trend: "+1 this month" },
    { label: "Applications Sent", value: "17", icon: Send, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20", trend: "+5 this week" },
    { label: "Profile Views", value: "1.2k", icon: Eye, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", trend: "+18% vs last week" },
    { label: "Collab Requests", value: "9", icon: SendHorizonal, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20", trend: "3 pending" },
];

const activeProjects = [
    {
        name: "Nexus Chat",
        desc: "Real-time messaging platform with end-to-end encryption and collaborative rooms.",
        tech: ["Next.js", "Socket.io", "Redis"],
        role: "You are the founder",
        members: ["alice", "bob", "carol", "dave"],
        status: "In Development",
        statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
        progress: 62,
        stars: 14,
    },
    {
        name: "EcoTrack",
        desc: "Mobile app to help individuals track and offset their carbon footprint in real time.",
        tech: ["React Native", "Firebase"],
        role: "You are a Contributor",
        members: ["eve", "frank", "grace"],
        status: "Beta Testing",
        statusColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
        progress: 84,
        stars: 31,
    },
    {
        name: "Fintech Wiz",
        desc: "High-performance portfolio analytics dashboard for crypto and equity markets.",
        tech: ["Rust", "PostgreSQL", "Docker"],
        role: "You are a Reviewer",
        members: ["henry", "iris"],
        status: "Planning",
        statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        progress: 23,
        stars: 7,
    },
];

const incomingRequests = [
    {
        project: "Nexus Chat",
        user: "Alice Carter",
        avatar: "alice-carter",
        role: "React Developer",
        time: "2h ago",
        githubStars: 320,
        skills: ["React", "TypeScript"],
    },
    {
        project: "Fintech Wiz",
        user: "Bob Wilson",
        avatar: "bob-wilson",
        role: "Rust Engineer",
        time: "5h ago",
        githubStars: 890,
        skills: ["Rust", "PostgreSQL"],
    },
    {
        project: "Nexus Chat",
        user: "Carol Zhang",
        avatar: "carol-zhang",
        role: "UI/UX Designer",
        time: "1d ago",
        githubStars: 145,
        skills: ["Figma", "Tailwind"],
    },
];

const activityFeed = [
    {
        type: "merge",
        icon: GitMerge,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        user: "Bob Wilson",
        avatar: "bob-wilson",
        text: 'merged PR #42 "Add Redis caching layer" into Nexus Chat',
        time: "12 min ago",
    },
    {
        type: "like",
        icon: Heart,
        color: "text-red-400",
        bg: "bg-red-400/10",
        user: "Sarah Chen",
        avatar: "sarah-chen",
        text: "liked your update on EcoTrack v0.8.4 release",
        time: "34 min ago",
    },
    {
        type: "comment",
        icon: MessageCircle,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        user: "Jake Miller",
        avatar: "jake-miller",
        text: 'commented on your post: "This architecture is elegant, nice work!"',
        time: "1h ago",
    },
    {
        type: "star",
        icon: Star,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        user: "Marco Rossi",
        avatar: "marco-rossi",
        text: "starred your project Nexus Chat",
        time: "2h ago",
    },
    {
        type: "apply",
        icon: Zap,
        color: "text-green-400",
        bg: "bg-green-400/10",
        user: "Elena Gilbert",
        avatar: "elena-gilbert",
        text: "applied to join your project Fintech Wiz as a Backend Engineer",
        time: "3h ago",
    },
    {
        type: "collab",
        icon: Users,
        color: "text-primary",
        bg: "bg-primary/10",
        user: "David Kim",
        avatar: "david-kim",
        text: "sent you a collab request: Open to co-founding a new project?",
        time: "5h ago",
    },
];

const recommendedProjects = [
    {
        name: "MetaVerse Hub",
        desc: "Unity + Three.js hybrid spatial experience for remote teams.",
        tech: ["Unity", "Three.js", "WebXR"],
        role: "Needs 3D Artist",
        members: 4,
        color: "from-blue-600/30",
        accent: "text-blue-400",
    },
    {
        name: "Artsy AI",
        desc: "AI-powered creative tool for generating and editing visual art.",
        tech: ["Python", "PyTorch", "FastAPI"],
        role: "Needs Prompt Engineer",
        members: 6,
        color: "from-orange-600/30",
        accent: "text-orange-400",
    },
];

// ── Component ───────────────────────────────────────────────────────────
export default function DashboardOverview() {
    const { user } = useAuth();
    const [greet, setGreet] = useState("Good morning");
    const [accepted, setAccepted] = useState<number[]>([]);
    const [rejected, setRejected] = useState<number[]>([]);

    useEffect(() => {
        const h = new Date().getHours();
        if (h >= 12 && h < 17) setGreet("Good afternoon");
        else if (h >= 17) setGreet("Good evening");
    }, []);

    const firstName = user?.displayName?.split(" ")[0] ?? "Builder";

    return (
        <div className="space-y-10 pb-24">

            {/* ── Welcome Banner ─────────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/8 mb-3">
                        <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Overview</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.85] italic mb-2">
                        {greet},<br />
                        <span className="text-gradient">{firstName}.</span>
                    </h1>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]">
                        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </p>
                </motion.div>

                {/* Quick actions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <Button
                        variant="outline"
                        className="border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 text-xs font-black uppercase tracking-wider rounded-xl h-10 gap-2"
                        onClick={() => (window.location.href = "/explore")}
                    >
                        <Code2 className="w-4 h-4" />
                        Explore
                    </Button>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-wider rounded-xl h-10 gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Button>
                </motion.div>
            </div>

            {/* ── Stats Grid ─────────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={cn(
                            "glass-card rounded-2xl p-5 border flex flex-col gap-3 group hover:border-white/15 transition-all duration-300 relative overflow-hidden",
                            stat.border
                        )}
                    >
                        <div className="flex items-start justify-between">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110", stat.bg, stat.border)}>
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-white italic">{stat.value}</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-0.5">{stat.label}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium">{stat.trend}</p>
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/5 blur-2xl rounded-full pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            {/* ── Main 3-column layout ───────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left + Center: Activity + Projects */}
                <div className="xl:col-span-2 flex flex-col gap-6">

                    {/* Activity Heatmap */}
                    <ActivityHeatmap />

                    {/* Active Projects */}
                    <div className="glass-card rounded-3xl border border-white/8 overflow-hidden">
                        <div className="flex items-center justify-between px-6 pt-6 pb-4">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Active Projects</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Your current collaborations</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white text-xs font-black uppercase tracking-wider gap-1" onClick={() => (window.location.href = "/dashboard/projects")}>
                                All <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                        </div>

                        <div className="divide-y divide-white/5">
                            {activeProjects.map((proj, i) => (
                                <div key={i} className="px-6 py-5 hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <Rocket className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                <h4 className="text-sm font-black text-white group-hover:text-primary transition-colors">{proj.name}</h4>
                                                <Badge className={cn("text-[9px] font-black uppercase tracking-wider border px-2 py-0.5 rounded-full", proj.statusColor)}>
                                                    {proj.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-1">{proj.desc}</p>

                                            {/* Progress bar */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${proj.progress}%` }}
                                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                                                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-black text-muted-foreground">{proj.progress}%</span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex -space-x-1.5">
                                                    {proj.members.slice(0, 4).map((seed, j) => (
                                                        <Avatar key={j} className="w-5 h-5 border-2 border-[#111]">
                                                            <AvatarImage src={`https://avatar.vercel.sh/${seed}`} />
                                                            <AvatarFallback className="text-[7px]">B</AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                    {proj.members.length > 4 && (
                                                        <div className="w-5 h-5 rounded-full bg-white/10 border-2 border-[#111] flex items-center justify-center text-[8px] text-white font-black">
                                                            +{proj.members.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-[10px] text-muted-foreground">{proj.role}</span>
                                                <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                                                    <Star className="w-3 h-3" />
                                                    {proj.stars}
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {proj.tech.map((t) => (
                                                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground font-medium">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Projects */}
                    <div className="glass-card rounded-3xl border border-white/8 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Recommended For You</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Based on your Next.js & TypeScript skills</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white text-xs font-black uppercase tracking-wider gap-1" onClick={() => (window.location.href = "/explore")}>
                                Explore All <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recommendedProjects.map((proj, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "bg-gradient-to-br to-[#111] rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all cursor-pointer group",
                                        proj.color
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-base font-black text-white group-hover:text-primary transition-colors">{proj.name}</h4>
                                        <Badge className="bg-primary/15 text-primary border-primary/20 text-[8px] font-black uppercase tracking-wider">NEW</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{proj.desc}</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-white/8">
                                        <span className={cn("text-[10px] font-black uppercase tracking-wider", proj.accent)}>{proj.role}</span>
                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                            <Users className="w-3 h-3" />
                                            {proj.members} members
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Requests + Activity Feed */}
                <div className="flex flex-col gap-6">

                    {/* Collab Requests */}
                    <div className="glass-card rounded-3xl border border-white/8 overflow-hidden">
                        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Collab Requests</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{incomingRequests.length} pending</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>

                        <div className="divide-y divide-white/5">
                            {incomingRequests.map((req, i) => {
                                const isAccepted = accepted.includes(i);
                                const isRejected = rejected.includes(i);
                                return (
                                    <div key={i} className={cn("px-5 py-4 transition-all", isRejected && "opacity-40")}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <Avatar className="h-9 w-9 border border-white/10">
                                                <AvatarImage src={`https://avatar.vercel.sh/${req.avatar}`} />
                                                <AvatarFallback className="text-xs">{req.user[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-white truncate">{req.user}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{req.role}</p>
                                                    <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                                                        <Star className="w-2.5 h-2.5" />
                                                        {req.githubStars}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[9px] text-muted-foreground shrink-0">{req.time}</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground mb-3">
                                            Wants to join <span className="text-white font-bold">{req.project}</span>
                                        </p>
                                        <div className="flex gap-1.5 mb-3">
                                            {req.skills.map((s) => (
                                                <span key={s} className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                        {isAccepted ? (
                                            <div className="flex items-center gap-2 text-green-400 text-xs font-black uppercase tracking-wider">
                                                <CheckCircle2 className="w-4 h-4" /> Accepted
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-wider rounded-xl h-8 shadow-[0_0_12px_rgba(124,58,237,0.2)]"
                                                    onClick={() => setAccepted((p) => [...p, i])}
                                                    disabled={isRejected}
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Accept
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="w-8 h-8 p-0 rounded-xl border border-white/8 hover:bg-red-400/10 text-muted-foreground hover:text-red-400"
                                                    onClick={() => setRejected((p) => [...p, i])}
                                                    disabled={isRejected}
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-white/5">
                            <Button
                                variant="ghost"
                                className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white rounded-xl h-9 border border-white/5"
                                onClick={() => (window.location.href = "/dashboard/applications")}
                            >
                                View All Applications <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="glass-card rounded-3xl border border-white/8 overflow-hidden">
                        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Activity Feed</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Your network in motion</p>
                            </div>
                            <Bell className="w-4 h-4 text-muted-foreground" />
                        </div>

                        <div className="divide-y divide-white/5 max-h-[420px] overflow-y-auto no-scrollbar">
                            {activityFeed.map((item, i) => (
                                <div key={i} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors flex items-start gap-3">
                                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5", item.bg)}>
                                        <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            <span className="text-white font-bold">{item.user}</span>{" "}
                                            {item.text}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                                            <span className="text-[10px] text-muted-foreground">{item.time}</span>
                                        </div>
                                    </div>
                                    <Avatar className="w-6 h-6 border border-white/10 shrink-0">
                                        <AvatarImage src={`https://avatar.vercel.sh/${item.avatar}`} />
                                        <AvatarFallback className="text-[7px]">{item.user[0]}</AvatarFallback>
                                    </Avatar>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/5">
                            <Button
                                variant="ghost"
                                className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white rounded-xl h-9 border border-white/5"
                                onClick={() => (window.location.href = "/dashboard/feed")}
                            >
                                Open Full Feed <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Activity Summary Card */}
                    <div className="glass-card rounded-3xl border border-white/8 p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-black text-lg italic">+18% Growth</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Profile views this week</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            </div>

            {/* ── Footer ─────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 opacity-30">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    © 2026 CollabSphere — v1.5.0-stable
                </p>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">All Systems Operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Github className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">GitHub Connected</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
