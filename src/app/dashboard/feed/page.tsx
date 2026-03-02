"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, Terminal, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const posts = [
    {
        id: 1,
        author: "Alex Rivera",
        role: "Fullstack Dev · CollabSphere",
        avatar: "alex-rivera",
        time: "12 min ago",
        content: "Just shipped real-time collaboration rooms in Nexus Chat. Socket.io + Redis pub/sub makes this buttery smooth. The latency is under 20ms globally.",
        tag: "Update",
        tagColor: "text-primary bg-primary/10 border-primary/20",
        likes: 47,
        comments: 11,
        liked: false,
    },
    {
        id: 2,
        author: "Sarah Chen",
        role: "Product Designer",
        avatar: "sarah-chen",
        time: "1h ago",
        content: "CollabSphere redesign is live. Glassmorphism + dark mode + electric cyan. Framer Motion for all transitions. Took 3 weeks but worth every pixel.",
        tag: "Design",
        tagColor: "text-secondary bg-secondary/10 border-secondary/20",
        likes: 132,
        comments: 19,
        liked: true,
    },
    {
        id: 3,
        author: "Jake Miller",
        role: "Founder · Fintech Wiz",
        avatar: "jake-miller",
        time: "2h ago",
        content: "Looking for a senior Rust developer to join Fintech Wiz. We're building high-performance portfolio analytics. Equity stake available. DM or apply through the project page.",
        tag: "Hiring",
        tagColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
        likes: 89,
        comments: 24,
        liked: false,
    },
    {
        id: 4,
        author: "Elena Gilbert",
        role: "Full Stack · EcoTrack",
        avatar: "elena-gilbert",
        time: "4h ago",
        content: "EcoTrack just hit beta. 1,200 beta users signed up in 48 hours. Zero marketing spend — purely organic from the CollabSphere community. Building in public works.",
        tag: "Milestone",
        tagColor: "text-green-400 bg-green-400/10 border-green-400/20",
        likes: 218,
        comments: 38,
        liked: false,
    },
    {
        id: 5,
        author: "Marco Rossi",
        role: "iOS Engineer · MetaVerse Hub",
        avatar: "marco-rossi",
        time: "6h ago",
        content: "Hot take: the best way to learn a new technology is to build something real with it, not do courses. CollabSphere gives you exactly that opportunity. Join a project today.",
        tag: "Thought",
        tagColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        likes: 305,
        comments: 67,
        liked: false,
    },
];

export default function FeedPage() {
    const [liked, setLiked] = useState<number[]>(posts.filter(p => p.liked).map(p => p.id));

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-24">
            <div>
                <h1 className="text-4xl font-black text-white tracking-tighter italic">Community Feed</h1>
                <p className="text-muted-foreground text-sm mt-1">Updates from builders in your network</p>
            </div>

            {/* Compose box */}
            <div className="glass-card rounded-3xl border border-white/8 p-5">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-9 h-9 border border-primary/20">
                        <AvatarImage src="https://avatar.vercel.sh/alex-rivera" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm text-muted-foreground border border-white/8 cursor-text hover:border-white/15 transition-colors">
                        Share a project update...
                    </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary text-xs gap-1.5 h-8">
                            <Terminal className="w-3.5 h-3.5" /> Code Snippet
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary text-xs gap-1.5 h-8">
                            <Sparkles className="w-3.5 h-3.5" /> Milestone
                        </Button>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-wider rounded-xl h-8 px-4">
                        Post
                    </Button>
                </div>
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-4">
                {posts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="glass-card rounded-3xl border border-white/8 p-5 hover:border-white/15 transition-all"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <Avatar className="w-9 h-9 border border-white/10 shrink-0">
                                <AvatarImage src={`https://avatar.vercel.sh/${post.avatar}`} />
                                <AvatarFallback className="text-xs">{post.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-black text-white">{post.author}</span>
                                    <span className={cn("text-[9px] font-black uppercase tracking-wider border px-2 py-0.5 rounded-full", post.tagColor)}>{post.tag}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                                    <span>{post.role}</span>
                                    <span>·</span>
                                    <span>{post.time}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{post.content}</p>

                        <div className="flex items-center gap-5 pt-4 border-t border-white/5">
                            <button
                                onClick={() =>
                                    setLiked(prev =>
                                        prev.includes(post.id) ? prev.filter(id => id !== post.id) : [...prev, post.id]
                                    )
                                }
                                className={cn("flex items-center gap-1.5 text-xs font-bold transition-colors", liked.includes(post.id) ? "text-red-400" : "text-muted-foreground hover:text-red-400")}
                            >
                                <Heart className={cn("w-4 h-4", liked.includes(post.id) && "fill-current")} />
                                {post.likes + (liked.includes(post.id) && !post.liked ? 1 : 0)}
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-secondary transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments}
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-white transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                            <button className="ml-auto text-muted-foreground hover:text-white transition-colors">
                                <Bookmark className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
