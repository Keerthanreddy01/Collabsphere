"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    ExternalLink,
    Code,
    Terminal,
    Github,
    Globe,
    MessageCircle,
    CheckCircle2,
    Plus,
    ArrowUpRight,
    TrendingUp,
    Clock,
    Send,
    Sparkles,
    Rocket
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Mock data
const project = {
    id: "1",
    title: "NexGen E-Commerce",
    description: "Building the next generation of e-commerce with AI-driven recommendations and decentralized payments. We aim to replace centralized marketplaces with high-performance Web3 solutions that bridge traditional shopping with crypto reality.",
    ownerId: "u1",
    ownerName: "Sarah Chen",
    techStack: ["Next.js", "Solana", "TailwindCSS", "OpenAI", "PostgreSQL", "Docker"],
    rolesNeeded: [
        { id: "r1", role: "Rust Smart Contract Dev", description: "Design high throughput on-chain logic.", filled: false, level: "Advanced" },
        { id: "r2", role: "Product Designer", description: "Design a luxury shopping experience.", filled: false, level: "Intermediate" },
        { id: "r3", role: "UI Engineer", description: "Implement high-fidelity Figma designs.", filled: true, level: "Beginner" }
    ],
    status: "building",
    difficulty: "advanced",
    teamSize: 3,
    maxTeamSize: 6,
    upvotes: 128,
    viewCount: 2400,
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    bannerColor: "from-violet-600/80 to-indigo-600/80",
    team: [
        { id: "u1", name: "Sarah Chen", role: "Founder / Fullstack", avatar: "https://avatar.vercel.sh/sarah", skills: ["React", "Rust"] },
        { id: "u2", name: "Alex Miller", role: "Backend Architect", avatar: "https://avatar.vercel.sh/alex", skills: ["Node.js", "Go"] },
        { id: "u3", name: "Elena Gilbert", role: "Designer", avatar: "https://avatar.vercel.sh/elena", skills: ["Figma"] }
    ],
    updates: [
        { id: "up1", author: "Sarah Chen", content: "Just finished the authentication flow using Solana accounts! The DX is looking incredible.", time: "2h ago", likes: 12 },
        { id: "up2", author: "Alex Miller", content: "Database schema is locked in. PostgreSQL instance is live on AWS. We are ready for scale.", time: "1d ago", likes: 24 }
    ]
};

export default function ProjectDetail() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Navbar />

            <main className="flex-1 pb-32">
                {/* Dynamic Hero Banner */}
                <div className={cn("w-full h-[500px] relative overflow-hidden", `bg-gradient-to-br ${project.bannerColor}`)}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm group-hover:bg-black/20 transition-all pointer-events-none" />
                    <div className="absolute inset-0 noise-overlay opacity-10" />

                    {/* Float orbs behind content */}
                    <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/20 blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 blur-[120px] animate-pulse" />

                    <div className="max-w-7xl mx-auto h-full px-6 lg:px-12 relative z-10 flex flex-col justify-end pb-16">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <Badge className="bg-black/60 backdrop-blur-md text-primary font-black uppercase tracking-widest border-primary/20 h-8 px-4">
                                    {project.status.toUpperCase()}
                                </Badge>
                                <Badge className="bg-white/10 backdrop-blur-md text-white font-black uppercase tracking-widest border-white/10 h-8 px-4">
                                    {project.difficulty.toUpperCase()}
                                </Badge>
                                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-muted-foreground ml-auto">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Active 2h ago</span>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-6 italic">
                                {project.title}
                            </h1>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-12 border-t border-white/10 pt-10">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-14 h-14 border-2 border-primary/50 p-0.5">
                                            <AvatarImage src={project.team[0].avatar} />
                                            <AvatarFallback>S</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1 italic">Project Lead</span>
                                            <span className="text-xl font-bold text-white transition-colors hover:text-primary cursor-pointer">{project.ownerName}</span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-px h-10 bg-white/10" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1 italic">Team Size</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-white uppercase">{project.teamSize} / {project.maxTeamSize}</span>
                                            <span className="text-[10px] uppercase font-black text-primary tracking-widest">Growing</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_0_30px_rgba(124,58,237,0.4)] px-8 h-14">
                                        <a href={`#apply`} className="flex items-center gap-2">Apply To Join <Send className="w-4 h-4 ml-1" /></a>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full bg-white/5 border border-white/5 hover:bg-white/10">
                                        <Github className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-[-3rem] relative z-20">
                    <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
                        <TabsList className="bg-[#111] border border-white/10 h-20 p-2 rounded-[2rem] shadow-2xl flex items-center gap-2 w-fit mb-12">
                            {["Overview", "Team", "Updates", "Rooms"].map((tab) => (
                                <TabsTrigger
                                    key={tab.toLowerCase()}
                                    value={tab.toLowerCase()}
                                    className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl text-sm font-black uppercase tracking-wider transition-all"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="overview" className="mt-0">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-12">
                                    <section>
                                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <Sparkles className="w-6 h-6 text-primary" />
                                            The Mission
                                        </h2>
                                        <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-10">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div className="p-8 rounded-3xl bg-[#111] border border-white/5 relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                                                <Code className="w-8 h-8 text-primary mb-6" />
                                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 italic">Architecture</p>
                                                <p className="text-lg font-bold text-white">Fullstack JS/Rust</p>
                                            </div>
                                            <div className="p-8 rounded-3xl bg-[#111] border border-white/5 relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
                                                <Terminal className="w-8 h-8 text-secondary mb-6" />
                                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 italic">Infrastructure</p>
                                                <p className="text-lg font-bold text-white">Verbal/AWS</p>
                                            </div>
                                            <div className="p-8 rounded-3xl bg-[#111] border border-white/5 relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                                                <TrendingUp className="w-8 h-8 text-primary mb-6" />
                                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 italic">Traction</p>
                                                <p className="text-lg font-bold text-white">MVP Stage</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section id="apply">
                                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <Send className="w-6 h-6 text-primary" />
                                            Open Roles
                                        </h2>
                                        <div className="space-y-6">
                                            {project.rolesNeeded.map((role) => (
                                                <div key={role.id} className={cn(
                                                    "p-8 rounded-3xl border transition-all duration-300 relative group overflow-hidden",
                                                    role.filled ? "bg-black/20 border-white/5 opacity-50" : "bg-[#111] border-white/10 hover:border-primary/30"
                                                )}>
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-4 mb-4">
                                                                <Badge className={cn("text-[9px] font-black tracking-widest uppercase py-1 px-3 border-none", role.filled ? "bg-white/10 text-white" : "bg-primary/20 text-primary")}>
                                                                    {role.filled ? "FILLED" : "OPEN NOW"}
                                                                </Badge>
                                                                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{role.level} LEVEL</span>
                                                            </div>
                                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors italic">{role.role}</h3>
                                                            <p className="text-sm text-muted-foreground font-medium">{role.description}</p>
                                                        </div>
                                                        <div className="shrink-0 flex items-center gap-4">
                                                            {!role.filled && (
                                                                <Button className="rounded-full bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest px-8 h-12">
                                                                    Apply To Role <ArrowUpRight className="w-4 h-4 ml-2" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-12">
                                    {/* Tech Stack Cloud */}
                                    <div className="p-8 rounded-3xl bg-[#111] border border-white/5">
                                        <h3 className="text-sm font-black text-white italic uppercase tracking-widest mb-8">Base Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map(t => (
                                                <Badge key={t} variant="ghost" className="bg-white/5 border border-white/5 text-muted-foreground text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-xl group-hover:text-white transition-colors">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="p-8 rounded-3xl bg-[#111] border border-white/5">
                                        <h3 className="text-sm font-black text-white italic uppercase tracking-widest mb-8">Access Points</h3>
                                        <div className="space-y-4">
                                            <Button asChild variant="ghost" className="w-full justify-between h-14 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold transition-all hover:bg-primary hover:text-white group">
                                                <span className="flex items-center gap-3"><Github className="w-5 h-5" /> View GitHub Repo</span>
                                                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                            </Button>
                                            <Button asChild variant="ghost" className="w-full justify-between h-14 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold transition-all hover:bg-secondary hover:text-white group">
                                                <span className="flex items-center gap-3"><Globe className="w-5 h-5" /> Live Demo URL</span>
                                                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="team">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {project.team.map((member) => (
                                    <div key={member.id} className="bg-[#111] p-10 rounded-3xl border border-white/5 group hover:border-primary/20 transition-all text-center relative overflow-hidden">
                                        <div className="absolute top-4 right-4 text-primary opacity-0 group-hover:opacity-20 transition-opacity">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <Avatar className="w-24 h-24 mx-auto mb-8 border-4 border-primary/20 shadow-2xl group-hover:scale-110 transition-transform">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">{member.name}</h3>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">{member.role}</p>
                                        <div className="flex flex-wrap justify-center gap-2 mb-10">
                                            {member.skills.map(s => (
                                                <span key={s} className="text-[8px] font-black uppercase tracking-widest text-muted-foreground px-2 py-0.5 border border-white/10 rounded-md">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                        <Button variant="ghost" className="w-full rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white h-12">
                                            View Profile <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="updates">
                            <div className="max-w-3xl mx-auto space-y-8">
                                {project.updates.map((update) => (
                                    <div key={update.id} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 relative group transition-all hover:border-white/10 shadow-2xl">
                                        <div className="flex items-center gap-6 mb-8">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={project.team.find(m => m.name === update.author)?.avatar} />
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-lg font-black text-white italic">{update.author}</p>
                                                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{update.time}</span>
                                                </div>
                                                <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-1">Lead Developer</p>
                                            </div>
                                        </div>
                                        <p className="text-lg text-white font-medium leading-relaxed mb-10">
                                            {update.content}
                                        </p>
                                        <div className="flex items-center gap-8">
                                            <button className="flex items-center gap-2 group/btn">
                                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover/btn:bg-primary/20 group-hover/btn:border-primary/30">
                                                    <Rocket className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/btn:text-white">{update.likes} Boosts</span>
                                            </button>
                                            <button className="flex items-center gap-2 group/btn">
                                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover/btn:bg-secondary/20 group-hover/btn:border-secondary/30">
                                                    <MessageCircle className="w-4 h-4 text-muted-foreground group-hover/btn:text-secondary" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/btn:text-white">Write Reply</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="rooms">
                            <div className="flex flex-col items-center justify-center py-32 text-center bg-[#111] rounded-[3rem] border border-white/5 border-dashed">
                                <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-10 animate-bounce">
                                    <Users className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Collaboration Rooms</h3>
                                <p className="text-lg text-muted-foreground font-medium max-w-sm mb-12">
                                    Private real-time rooms for project members to chat, share assets, and launch huddles.
                                </p>
                                <Badge className="bg-primary text-white font-black uppercase tracking-widest px-8 py-2 rounded-full h-10">
                                    FEATURE IN DEVELOPMENT
                                </Badge>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
}
