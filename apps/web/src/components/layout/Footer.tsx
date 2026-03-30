"use client";

import React from "react";
import Link from "next/link";
import { Rocket, Github, Twitter, Linkedin, Heart } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-[#f9f9f9] dark:bg-[#050505] border-t border-[hsl(var(--border))] py-20 px-6 lg:px-12 relative z-[1]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16 md:gap-24">
                <div className="flex flex-col gap-8 max-w-sm">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center relative shadow-lg shadow-primary/20">
                            <Rocket className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-foreground dark:text-white uppercase">
                            Collab<span className="text-primary">Sphere</span>
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-base leading-relaxed font-medium">
                        The platform for the next generation of builders. Connect, build, and ship faster together. 
                        Let&apos;s build the future of software in public.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="https://github.com/Keerthanreddy01/Collabsphere" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-6 h-6" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="w-6 h-6" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24 w-full md:w-auto">
                    <div className="flex flex-col gap-6">
                        <h4 className="font-black text-xs text-foreground uppercase tracking-[0.2em]">Explore</h4>
                        <div className="flex flex-col gap-4">
                            <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Projects</Link>
                            <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Hackathons</Link>
                            <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Builders</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h4 className="font-black text-xs text-foreground uppercase tracking-[0.2em]">Platform</h4>
                        <div className="flex flex-col gap-4">
                            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
                            <Link href="/feed" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Feed</Link>
                            <Link href="/profile" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Profile</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h4 className="font-black text-xs text-foreground uppercase tracking-[0.2em]">Resources</h4>
                        <div className="flex flex-col gap-4">
                            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Terms</Link>
                            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-[hsl(var(--border))] mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-bold uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} CollabSphere. Built for Builders.
                </p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2">
                    Shipped with <Heart className="w-3.5 h-3.5 text-primary fill-current" /> by CollabSphere Team
                </p>
            </div>
        </footer>
    );
};
