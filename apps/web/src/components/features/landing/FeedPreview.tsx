"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Send, Rocket, Sparkles, User, Terminal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const posts = [
    {
        id: 1,
        author: "Alex Rivera",
        role: "Fullstack Dev",
        content: "Just integrated Framer Motion with Next.js 14! The scroll animations are looking so smooth. Building in public is a game changer. 🚀",
        likes: 42,
        comments: 8,
        avatar: "https://avatar.vercel.sh/alex"
    },
    {
        id: 2,
        author: "Sarah Chen",
        role: "Product Designer",
        content: "CollabSphere is going to be big. Just finished the UI for the dashboard. Glassmorphism + Dark Mode + Electric Cyan. ✨",
        likes: 128,
        comments: 15,
        avatar: "https://avatar.vercel.sh/sarah"
    },
    {
        id: 3,
        author: "Jake Miller",
        role: "Founder",
        content: "Looking for a Rust developer to help optimize the backend. High performance real-time engine in the works. DM if interested! 📦",
        likes: 89,
        comments: 24,
        avatar: "https://avatar.vercel.sh/jake"
    }
];

export const FeedPreview = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % posts.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 w-full bg-[#0d0d0d] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                {/* Left Side: Content */}
                <div className="max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-8"
                    >
                        <Rocket className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Build In Public</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8"
                    >
                        Share Your Progress. <br />
                        <span className="text-gradient">Get Real Feedback.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-muted-foreground font-medium mb-12"
                    >
                        The "Feed" is the heart of CollabSphere. Post updates, share wins, and ask for help. Every project member sees your contribution instantly.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {[
                            { icon: Heart, label: "Community Support", text: "Electric reactions." },
                            { icon: MessageCircle, label: "Live Debates", text: "Project specific threads." },
                            { icon: Share2, label: "Viral Growth", text: "Share to X effortlessly." },
                            { icon: Sparkles, label: "Member Perks", text: "Top builders get perks." }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 group hover:border-primary/30 transition-colors">
                                <item.icon className="w-6 h-6 text-primary mb-4" />
                                <h4 className="text-sm font-bold text-white mb-2">{item.label}</h4>
                                <p className="text-xs text-muted-foreground">{item.text}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Side: Phone Mockup */}
                <div className="relative flex justify-center perspective-[2000px]">
                    <motion.div
                        initial={{ rotateY: 30, rotateX: 15, scale: 0.8 }}
                        whileInView={{ rotateY: -15, rotateX: 10, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-[300px] h-[600px] bg-black rounded-[45px] border-[10px] border-[#1a1a1a] shadow-2xl relative overflow-hidden"
                    >
                        {/* Speaker / Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20" />

                        {/* Content Area */}
                        <div className="w-full h-full bg-[#0d0d0d] pt-12 p-4 flex flex-col gap-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-black text-white italic">FEED</span>
                                <Send className="w-4 h-4 text-primary" />
                            </div>

                            {/* Simulated Posts */}
                            <div className="space-y-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/10"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={posts[activeStep].avatar} />
                                            </Avatar>
                                            <div>
                                                <p className="text-xs font-bold text-white">{posts[activeStep].author}</p>
                                                <p className="text-[10px] text-muted-foreground">{posts[activeStep].role}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-white leading-relaxed mb-6">
                                            {posts[activeStep].content}
                                        </p>
                                        <div className="flex items-center gap-6 text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Heart className="w-3 h-3 hover:text-red-500 transition-colors" />
                                                <span className="text-[10px]">{posts[activeStep].likes}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MessageCircle className="w-3 h-3" />
                                                <span className="text-[10px]">{posts[activeStep].comments}</span>
                                            </div>
                                            <Share2 className="w-3 h-3 ml-auto" />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Fake typing effect indicators below */}
                                <div className="bg-[#111] opacity-40 rounded-2xl p-4 border border-white/5 h-24 flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/5" />
                                        <div className="h-2 w-20 bg-white/10 rounded" />
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded" />
                                    <div className="h-2 w-2/3 bg-white/5 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Reaction Emojis Exploding */}
                        <EmojiExplosion />
                    </motion.div>

                    {/* Decorative elements behind phone */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[150px] z-[-1]" />
                </div>
            </div>
        </section>
    );
};

const EmojiExplosion = () => {
    const [emojis, setEmojis] = useState<{ id: number, x: number, y: number, icon: string }[]>([]);
    const icons = ["🚀", "🔥", "✨", "❤️", "⚡", "👏"];

    useEffect(() => {
        const timer = setInterval(() => {
            const newEmoji = {
                id: Date.now(),
                x: Math.random() * 200 - 100,
                y: 600,
                icon: icons[Math.floor(Math.random() * icons.length)]
            };
            setEmojis(prev => [...prev.slice(-10), newEmoji]);
        }, 800);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            <AnimatePresence>
                {emojis.map(emoji => (
                    <motion.div
                        key={emoji.id}
                        initial={{ opacity: 0, y: 500, x: 150 + emoji.x, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 0], y: -100, x: 150 + emoji.x * 2, scale: [0.5, 1.5, 1] }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="absolute text-2xl"
                    >
                        {emoji.icon}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
