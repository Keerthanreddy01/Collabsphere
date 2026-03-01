"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Sparkles } from "lucide-react";

const testimonials = [
    {
        name: "Marco Rossi",
        role: "Senior iOS Engineer",
        image: "https://avatar.vercel.sh/marco",
        quote: "Finding high-quality collaborators was my biggest pain point. CollabSphere solved it in a weekend. Met a designer and we're shipping our app in 2 weeks!",
    },
    {
        name: "Elena Gilbert",
        role: "Student @ Stanford",
        image: "https://avatar.vercel.sh/elena",
        quote: "As a student, I wanted to build something real for my portfolio. I found a project needing a React dev, applied, and now I'm part of a 5-person team building a fintech app.",
    },
    {
        name: "David Kim",
        role: "Founder of ShipIt",
        image: "https://avatar.vercel.sh/david",
        quote: "The 'Build In Public' feed is addictive. It's like Twitter but focused purely on builders and shipping. The vibe here is unmatched.",
    },
    {
        name: "Sophia Martinez",
        role: "UI/UX Designer",
        image: "https://avatar.vercel.sh/sophia",
        quote: "Clean, fast, and inspiring. CollabSphere is the first place I go when I want to start a side project. The community is incredibly talented.",
    },
    {
        name: "James Wilson",
        role: "Fullstack Developer",
        image: "https://avatar.vercel.sh/james",
        quote: "I've been on every developer platform out there. Nothing beats the UI and the focused collaboration experience here. 10/10.",
    },
    {
        name: "Liam O'Connor",
        role: "Rust Enthusiast",
        image: "https://avatar.vercel.sh/liam",
        quote: "Found a team for a hackathon through CollabSphere. We ended up winning first place! The matching algorithm is actually useful.",
    },
];

export const Testimonials = () => {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 blur-[150px] z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Trusted by builders</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8"
                >
                    Loved By The Next <br />
                    <span className="text-gradient">Generation of Creators.</span>
                </motion.h2>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative p-8 rounded-3xl glass backdrop-blur-2xl border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-xl"
                    >
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                            <Quote className="w-6 h-6 text-primary opacity-50" />
                        </div>

                        <p className="text-muted-foreground font-medium text-lg leading-relaxed mb-8 relative z-10">
                            "{t.quote}"
                        </p>

                        <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12 border-2 border-primary/20 p-0.5">
                                <AvatarImage src={t.image} className="rounded-full" />
                                <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-bold text-white text-base tracking-tight">{t.name}</h4>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{t.role}</p>
                            </div>
                        </div>

                        {/* Subtle inner glow on hover */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
