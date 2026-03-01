"use client";

import React from "react";
import Link from "next/link";
import { Rocket, Github, Twitter, Linkedin, Heart } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-black/40 backdrop-blur-xl border-t border-white/5 py-12 px-6 lg:px-12 relative z-[1]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
                <div className="flex flex-col gap-6 max-w-sm">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center relative shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                            <Rocket className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-foreground dark:text-white">
                            Collab<span className="text-primary">Sphere</span>
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                        The platform for the next generation of builders. Connect, build, and ship faster together. Let's make something amazing.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/Keerthanreddy01/Collabsphere" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Explore</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link>
                            <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hackathons</Link>
                            <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">Builders</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Platform</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
                            <Link href="/feed" className="text-sm text-muted-foreground hover:text-primary transition-colors">Feed</Link>
                            <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">Profile</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Resources</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    &copy; {new Date().getFullYear()} CollabSphere. Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> by Builders for Builders.
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                    Handcrafted with Next.js, Firebase & Framer Motion
                </p>
            </div>
        </footer>
    );
};
