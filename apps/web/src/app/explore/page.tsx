"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, SlidersHorizontal, ChevronDown, Rocket, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/firestore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// Dummy data for initial display
const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        title: "NexGen E-Commerce",
        description: "Building the next generation of e-commerce with AI-driven recommendations and decentralized payments.",
        ownerId: "u1",
        techStack: ["Next.js", "Solana", "Tailwind", "OpenAI"],
        rolesNeeded: [
            { role: "Rust Dev", description: "Smart contract dev", filled: false },
            { role: "Product Designer", description: "UI/UX lead", filled: false }
        ],
        status: "building",
        difficulty: "advanced",
        teamSize: 3,
        maxTeamSize: 6,
        upvotes: ["u1", "u2", "u3", "u4", "u5"],
        viewCount: 1500,
        createdAt: { seconds: 1709280000, nanoseconds: 0 } as any,
        githubUrl: "#",
        demoUrl: "#",
        bannerColor: "bg-gradient-to-r from-violet-600 to-indigo-600",
    },
    {
        id: "2",
        title: "EcoTrack Mobile App",
        description: "Help people track their carbon footprint in real-time. Native experience with maps and community challenges.",
        ownerId: "u2",
        techStack: ["React Native", "Firebase", "Node.js", "Google Maps"],
        rolesNeeded: [
            { role: "iOS Dev", description: "Swift enthusiast", filled: false },
            { role: "Backend Expert", description: "Firebase specialist", filled: false }
        ],
        status: "needs-help",
        difficulty: "intermediate",
        teamSize: 2,
        maxTeamSize: 4,
        upvotes: ["u2", "u3"],
        viewCount: 890,
        createdAt: { seconds: 1709180000, nanoseconds: 0 } as any,
        githubUrl: "#",
        demoUrl: "#",
        bannerColor: "bg-gradient-to-r from-emerald-600 to-teal-600",
    },
    {
        id: "3",
        title: "Artsy AI Generative Hub",
        description: "A platform for artists to collaborate with AI and each other. Built in public with a focus on creative communities.",
        ownerId: "u3",
        techStack: ["React", "Python", "FastAPI", "StabilityAI"],
        rolesNeeded: [
            { role: "Frontend Dev", description: "Responsive layouts expert", filled: false },
            { role: "Prompt Engineer", description: "AI specialist", filled: false }
        ],
        status: "planning",
        difficulty: "beginner",
        teamSize: 1,
        maxTeamSize: 3,
        upvotes: ["u3", "u4", "u5", "u6", "u7", "u8"],
        viewCount: 2200,
        createdAt: { seconds: 1709080000, nanoseconds: 0 } as any,
        githubUrl: "#",
        demoUrl: "#",
        bannerColor: "bg-gradient-to-r from-orange-600 to-amber-600",
    }
];

export default function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Navbar />

            <main className="flex-1 pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/5 w-fit mb-4">
                                <Compass className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Explore Projects</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                                Discover Your Next <br />
                                <span className="text-gradient">Big Collaboration.</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-white">2,481 Projects</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest">Active & Open</span>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Rocket className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Sticky Filter Bar */}
                    <div className="sticky top-24 z-40 mb-12">
                        <div className="p-2 rounded-2xl md:rounded-full glass border border-white/5 shadow-2xl backdrop-blur-3xl flex flex-col md:flex-row items-center gap-4">
                            <div className="relative w-full md:flex-1">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by project name or tech stack..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-14 pl-14 pr-6 rounded-full border-none bg-white/5 focus-visible:ring-1 focus-visible:ring-primary/50 text-white placeholder:text-muted-foreground/50 transition-all font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0 px-2 md:px-0">
                                <Select defaultValue="all">
                                    <SelectTrigger className="h-14 md:w-40 rounded-full border-none bg-white/5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
                                        <SelectValue placeholder="TECH STACK" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111] border-white/10 text-white">
                                        <SelectItem value="all">ALL STACKS</SelectItem>
                                        <SelectItem value="react">REACT</SelectItem>
                                        <SelectItem value="nextjs">NEXT.JS</SelectItem>
                                        <SelectItem value="rust">RUST</SelectItem>
                                        <SelectItem value="python">PYTHON</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select defaultValue="all">
                                    <SelectTrigger className="h-14 md:w-40 rounded-full border-none bg-white/5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
                                        <SelectValue placeholder="ROLE NEEDED" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111] border-white/10 text-white">
                                        <SelectItem value="all">ALL ROLES</SelectItem>
                                        <SelectItem value="dev">FRONTEND</SelectItem>
                                        <SelectItem value="backend">BACKEND</SelectItem>
                                        <SelectItem value="designer">DESIGNER</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="ghost" size="icon" className="h-14 w-14 shrink-0 rounded-full bg-white/5 border border-white/5 hover:bg-white/10">
                                    <SlidersHorizontal className="w-5 h-5 text-white" />
                                </Button>

                                <Button className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                                    Filter <Filter className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
                            ))
                        ) : (
                            MOCK_PROJECTS.map((project, i) => (
                                <ProjectCard key={project.id} project={project} index={i} />
                            ))
                        )}
                    </div>

                    {/* Empty State / Bottom Info */}
                    {!loading && MOCK_PROJECTS.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-6">
                                <Rocket className="w-10 h-10 text-muted-foreground opacity-20" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">NO PROJECTS FOUND</h3>
                            <p className="text-muted-foreground font-medium max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
