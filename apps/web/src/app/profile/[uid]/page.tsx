"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    MapPin,
    Map,
    Send,
    ExternalLink,
    Globe,
    Sparkles,
    CheckCircle2,
    Plus,
    Users,
    ArrowUpRight,
    Mail,
    Linkedin,
    Twitter,
    Github,
    Compass,
    Zap,
    Clock,
    MessageCircle,
    Heart
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitHubStats } from "@/components/features/profile/GitHubStats";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mock_user = {
    uid: "123",
    name: "Sarah Chen",
    email: "sarah@collabsphere.com",
    avatar: "https://avatar.vercel.sh/sarah",
    bio: "Fullstack Developer & Blockchain Enthusiast. Building high throughput systems on Solana. Always looking for designers who care about luxury UX.",
    skills: ["React", "Rust", "Solana", "PostgreSQL", "Docker", "Figma"],
    role: "Developer",
    openToCollab: true,
    githubUsername: "sarahchen_dev",
    location: "Singapore",
    createdAt: { seconds: 1709280000, nanoseconds: 0 } as any,
    projects: [
        { id: "1", title: "NexGen E-Commerce", techStack: ["Next.js", "Solana"], status: "building" },
        { id: "2", title: "Artsy AI", techStack: ["Python", "React"], status: "launched" }
    ],
    updates: [
        { id: "up1", content: "Just reached 100 stars on my latest Rust library! ✨ Check it out on GitHub.", time: "4h ago", likes: 42, project: "RustEngine" },
        { id: "up2", content: "Switching from Redis to Tiered Storage. The performance gains are insane.", time: "2d ago", likes: 18, project: "NexGen" }
    ]
};

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState("projects");

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Navbar />

            <main className="flex-1 pb-32">
                {/* User Profile Banner */}
                <div className="w-full h-[400px] relative bg-gradient-to-br from-primary via-indigo-950 to-black overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
                    <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />

                    {/* Animating blob orbs */}
                    <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] animate-pulse" />

                    <div className="max-w-7xl mx-auto h-full px-6 lg:px-12 relative z-10 flex flex-col justify-end pb-12">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                                <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
                                    <Avatar className="w-32 h-32 md:w-48 md:h-48 border-[6px] border-[#0a0a0a] shadow-2xl group transition-transform hover:scale-105">
                                        <AvatarImage src={mock_user.avatar} />
                                        <AvatarFallback>{mock_user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                                            <Badge className="bg-primary/20 text-primary font-black uppercase tracking-widest border-primary/20 py-1.5 px-4 h-8 rounded-full">
                                                {mock_user.role.toUpperCase()}
                                            </Badge>
                                            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-green-500 shadow-xl">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_green]" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Open to collab</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-muted-foreground ml-auto">
                                                <MapPin className="w-3 h-3" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{mock_user.location}</span>
                                            </div>
                                        </div>

                                        <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-4 italic">
                                            {mock_user.name}
                                        </h1>
                                        <p className="text-lg text-white/60 font-medium italic">@{mock_user.githubUsername}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_0_30px_rgba(124,58,237,0.4)] px-10 h-14">
                                        Request To Collab <Send className="w-4 h-4 ml-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full bg-white/5 border border-white/5 hover:bg-white/10">
                                        <Github className="w-6 h-6" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full bg-white/5 border border-white/5 hover:bg-white/10">
                                        <Twitter className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Info */}
                    <div className="space-y-12">
                        <section className="bg-[#111] p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                            <h3 className="text-sm font-black text-white italic uppercase tracking-widest mb-8">Executive Summary</h3>
                            <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
                                &quot;{mock_user.bio}&quot;
                            </p>
                        </section>

                        <GitHubStats username={mock_user.githubUsername} />

                        <section className="bg-[#111] p-10 rounded-3xl border border-white/5">
                            <h3 className="text-sm font-black text-white italic uppercase tracking-widest mb-8">Technical Arsenals</h3>
                            <div className="flex flex-wrap gap-2">
                                {mock_user.skills.map(skill => (
                                    <Badge key={skill} variant="ghost" className="bg-white/5 border border-white/5 text-muted-foreground text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-xl group-hover:text-white transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                    <Plus className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Content Tabs */}
                    <div className="lg:col-span-2 space-y-12">
                        <Tabs defaultValue="projects" onValueChange={setActiveTab} className="w-full">
                            <TabsList className="bg-[#111] border border-white/10 h-16 p-2 rounded-2xl shadow-xl flex items-center gap-2 w-fit mb-12">
                                <TabsTrigger value="projects" className="rounded-xl px-10 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest transition-all">PROJECTS</TabsTrigger>
                                <TabsTrigger value="updates" className="rounded-xl px-10 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest transition-all">UPDATES</TabsTrigger>
                                <TabsTrigger value="social" className="rounded-xl px-10 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest transition-all">NETWORK</TabsTrigger>
                            </TabsList>

                            <TabsContent value="projects" className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {mock_user.projects.map((project, i) => (
                                        <div key={i} className="group relative p-8 rounded-[2.5rem] bg-[#111] border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                                    <Rocket className="w-6 h-6 text-primary" />
                                                </div>
                                                <Badge className="bg-primary/20 text-primary border-primary/20 text-[8px] font-black uppercase tracking-widest">OWNER</Badge>
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic group-hover:text-primary transition-colors">{project.title}</h3>
                                            <div className="flex flex-wrap gap-2 mb-10">
                                                {project.techStack.map(t => (
                                                    <span key={t} className="text-[9px] font-black uppercase tracking-widest text-muted-foreground px-2 py-0.5 border border-white/5 rounded-md">{t}</span>
                                                ))}
                                            </div>
                                            <Button variant="ghost" className="w-full justify-between h-14 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white group-hover:bg-primary transition-all">
                                                Analyze Build <ArrowUpRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}

                                    {/* Empty Add/Create New Card */}
                                    <div className="rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-12 group hover:border-primary/30 transition-all cursor-pointer">
                                        <Plus className="w-10 h-10 text-muted-foreground mb-4 group-hover:text-primary group-hover:scale-110 transition-transform" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Launch New Project</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="updates" className="mt-0 space-y-8">
                                {mock_user.updates.map((update, i) => (
                                    <div key={i} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 relative group transition-all hover:border-white/10 shadow-2xl">
                                        <div className="flex items-center gap-6 mb-8">
                                            <Avatar className="w-12 h-12 border-2 border-primary/20">
                                                <AvatarImage src={mock_user.avatar} />
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-lg font-black text-white italic">{mock_user.name}</p>
                                                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{update.time}</span>
                                                </div>
                                                <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-1 italic">Update in {update.project}</p>
                                            </div>
                                        </div>
                                        <p className="text-lg text-white font-medium leading-relaxed mb-10 group-hover:text-white/90">
                                            {update.content}
                                        </p>
                                        <div className="flex items-center gap-8 border-t border-white/5 pt-8">
                                            <div className="flex items-center gap-2 cursor-pointer group/btn">
                                                <Heart className="w-5 h-5 text-muted-foreground group-hover/btn:text-red-500 transition-colors" />
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{update.likes} Boosts</span>
                                            </div>
                                            <div className="flex items-center gap-2 cursor-pointer group/btn">
                                                <MessageCircle className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Connect Thread</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="social">
                                {/* Social Network Placeholder */}
                                <div className="flex flex-col items-center justify-center py-32 text-center bg-[#111] rounded-[3rem] border border-white/5 border-dashed">
                                    <div className="w-24 h-24 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-10 animate-bounce">
                                        <Users className="w-10 h-10 text-secondary" />
                                    </div>
                                    <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">The Sphere Network</h3>
                                    <p className="text-lg text-muted-foreground font-medium max-w-sm">
                                        Real-time connection graph showing how Sarah is connected to other builders. Coming soon.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
