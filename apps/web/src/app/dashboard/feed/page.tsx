"use client";

import React from "react";
import { CreatePost } from "@/components/features/dashboard/CreatePost";
import { FeedItem } from "@/components/features/dashboard/FeedItem";
import { RightSidebar } from "@/components/features/dashboard/RightSidebar";
import { ChevronDown, Filter, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeedPage() {
    const [view, setView] = React.useState("following");

    const activities = [
        { author: { name: "Sarah Chen", avatar: "https://avatar.vercel.sh/sarah", role: "Frontend Dev" }, content: "Integrated the new libp2p pubsub mechanism for better message propagation. The latency dropped by 40% in our stress tests.", timestamp: "5m ago", project: { name: "Nexus Chat", tag: "building" }, stats: { votes: 124, comments: 18 } },
        { author: { name: "Marcus Vane", avatar: "https://avatar.vercel.sh/marcus", role: "Solidity Engineer" }, content: "Added support for multi-sig vault contracts in the checkout flow. Security audit starting next week.", timestamp: "2h ago", project: { name: "DecentralShop", tag: "building" }, stats: { votes: 84, comments: 32 } },
        { author: { name: "Elena Rodriguez", avatar: "https://avatar.vercel.sh/elena", role: "UI/UX Designer" }, content: "Published the new design system for CollabSphere. Focused on extreme productivity and GitHub's UI philosophy.", timestamp: "4h ago", project: { name: "CollabSphere", tag: "building" }, stats: { votes: 256, comments: 45 } },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1012px] mx-auto">
            {/* Main Feed Column */}
            <div className="flex-1 space-y-6">
                {/* Refined Header */}
                <div className="flex flex-col gap-1 pb-4 border-b border-[#30363d]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[16px] font-semibold text-[#e6edf3]">Feed</h1>
                            <div className="flex bg-[#161b22] border border-[#30363d] rounded-[6px] p-[2px]">
                                <button
                                    onClick={() => setView("following")}
                                    className={cn(
                                        "px-3 py-1 text-[12px] font-medium rounded-[4px] transition-all",
                                        view === "following" ? "bg-[#21262d] text-[#e6edf3] shadow-sm" : "text-[#7d8590] hover:text-[#e6edf3]"
                                    )}
                                >
                                    Following
                                </button>
                                <button
                                    onClick={() => setView("all")}
                                    className={cn(
                                        "px-3 py-1 text-[12px] font-medium rounded-[4px] transition-all",
                                        view === "all" ? "bg-[#21262d] text-[#e6edf3] shadow-sm" : "text-[#7d8590] hover:text-[#e6edf3]"
                                    )}
                                >
                                    All
                                </button>
                            </div>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-[#30363d] rounded-[6px] text-[12px] font-semibold text-[#e6edf3] hover:bg-[#1c2128] transition-all">
                            <Filter size={14} className="text-[#7d8590]" />
                            <span>Filters</span>
                            <ChevronDown size={14} className="text-[#484f58]" />
                        </button>
                    </div>
                    <p className="text-[#7d8590] text-[14px]">Updates from projects and builders you follow</p>
                </div>

                <CreatePost />

                {/* Feed Items Container */}
                <div className="flex flex-col border-t border-[#30363d]">
                    {activities.map((activity, i) => (
                        <FeedItem key={i} {...activity} />
                    ))}
                </div>

                {/* Load More Section */}
                <div className="py-8 flex flex-col items-center border-t border-[#30363d]">
                    <button className="w-full py-2 bg-transparent border border-[#30363d] rounded-[6px] text-[13px] font-semibold text-[#58a6ff] hover:bg-[#1c2128] transition-all">
                        Load more activity...
                    </button>
                    <p className="mt-4 text-[12px] text-[#484f58]">
                        You&apos;ve reached the end for now. Build something new!
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-[296px] shrink-0 space-y-6">
                <RightSidebar />

                {/* Suggested Projects Section (Additional to RightSidebar if needed, or update RightSidebar) */}
                <div className="space-y-3">
                    <h3 className="text-[12px] font-semibold text-[#7d8590] uppercase tracking-wide px-1">Suggested Projects</h3>
                    <div className="surface overflow-hidden divide-y divide-[#30363d]">
                        {[
                            { name: "rust-analyzer", desc: "Rust compiler front-end", stars: "12k" },
                            { name: "next-auth", desc: "Authentication for Next.js", stars: "8k" },
                            { name: "swr", desc: "React Hooks for fetching", stars: "26k" }
                        ].map((proj, i) => (
                            <div key={i} className="p-3 hover:bg-[#1c2128] cursor-pointer transition-colors group">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-[13px] font-semibold text-[#58a6ff] group-hover:underline">{proj.name}</span>
                                    <span className="text-[11px] text-[#7d8590]">★ {proj.stars}</span>
                                </div>
                                <p className="text-[11px] text-[#7d8590] line-clamp-1">{proj.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button className="text-[12px] text-[#58a6ff] hover:underline font-medium px-1">Explore more →</button>
                </div>
            </div>
        </div>
    );
}
