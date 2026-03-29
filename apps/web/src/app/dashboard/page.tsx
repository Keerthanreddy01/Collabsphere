"use client";

import React, { useState } from "react";
import {
    Search,
    Book,
    Star,
    Users,
    GitBranch,
    ChevronDown,
} from "lucide-react";
import { GitHubAvatar } from "@/components/features/dashboard/GitHubAvatar";
import { CreatePost } from "@/components/features/dashboard/CreatePost";
import { RightSidebar } from "@/components/features/dashboard/RightSidebar";
import { ActivityHeatmap } from "@/components/features/dashboard/ActivityHeatmap";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useFeed } from "@/hooks/useFeed";

const stats = [
    { label: "Projects", value: "4", change: "+1", positive: true },
    { label: "Applications", value: "12", change: "+3", positive: true },
    { label: "Collab Requests", value: "8", change: "+2", positive: true },
    { label: "Profile Views", value: "256", change: "+12%", positive: true },
];

const pinnedProjects = [
    {
        name: "nexus-chat",
        description: "A decentralized real-time chat application built with Next.js and Web3 protocols.",
        status: "Building",
        tech: "TypeScript",
        color: "#3178c6",
        stars: 24,
        members: 3
    },
    {
        name: "eco-track",
        description: "IoT-powered environmental tracking dashboard for smart cities.",
        status: "Needs Help",
        tech: "Python",
        color: "#3572A5",
        stars: 12,
        members: 5
    }
];

export default function DashboardOverview() {
    const { user } = useAuth();
    const { updates, loading: feedLoading } = useFeed(5);

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1012px] mx-auto">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
                {/* Simple Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#30363d]">
                    <h1 className="text-[16px] font-semibold text-[#e6edf3]">Overview</h1>
                    <span className="text-[12px] text-[#7d8590]">
                        Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                </div>

                {/* Contribution Heatmap */}
                <div className="space-y-4">
                    <h2 className="text-[14px] font-semibold text-[#e6edf3]">Activity in the last 6 months</h2>
                    <ActivityHeatmap />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-[6px] p-4">
                            <p className="text-[12px] text-[#7d8590] mb-1">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[24px] font-semibold text-[#e6edf3]">{stat.value}</span>
                                <span className={cn(
                                    "text-[12px] font-medium",
                                    stat.positive ? "text-[#3fb950]" : "text-[#f85149]"
                                )}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pinned Projects Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[14px] font-semibold text-[#e6edf3]">Pinned Projects</h2>
                        <button className="text-[12px] text-[#58a6ff] hover:underline transition-all">Customize your pins →</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pinnedProjects.map((p, i) => (
                            <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-[6px] p-4 group hover:bg-[#1c2128] transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Book className="w-4 h-4 text-[#7d8590]" size={16} />
                                        <h3 className="text-[14px] font-semibold text-[#58a6ff] hover:underline cursor-pointer">{p.name}</h3>
                                    </div>
                                    <span className={cn(
                                        "text-[12px] px-2 py-0.5 rounded-[6px] border font-medium border-[#30363d]",
                                        p.status === "Building" && "text-[#3fb950] bg-transparent",
                                        p.status === "Needs Help" && "text-[#f85149] bg-transparent",
                                    )}>
                                        {p.status}
                                    </span>
                                </div>
                                <p className="text-[13px] text-[#7d8590] line-clamp-2 mb-4 leading-relaxed">
                                    {p.description}
                                </p>
                                <div className="flex items-center gap-4 text-[12px] text-[#7d8590]">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                                        <span>{p.tech}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5" size={14} />
                                        <span>{p.stars}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5" size={14} />
                                        <span>{p.members}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed Title */}
                <div className="pt-4">
                    <h2 className="text-[14px] font-semibold text-[#e6edf3] mb-4">Recent Activity</h2>
                    <div className="surface p-0 divide-y divide-[#30363d]">
                        {feedLoading ? (
                            <div className="p-8 text-center text-[12px] text-[#7d8590]">Loading activity...</div>
                        ) : updates.length === 0 ? (
                            <div className="p-8 text-center text-[12px] text-[#7d8590]">No recent activity</div>
                        ) : (
                            updates.map((activity, i) => (
                                <div key={activity.id} className="p-4 hover:bg-[#1c2128] transition-colors border-l-[3px] border-l-[#21262d] hover:border-l-[#58a6ff]">
                                    <div className="flex items-center gap-2 text-[13px] mb-1">
                                        <GitHubAvatar name={activity.authorName || 'User'} src={`https://avatar.vercel.sh/${activity.authorId}`} size={24} />
                                        <span className="font-semibold text-[#e6edf3]">{activity.authorName || 'User'}</span>
                                        <span className="text-[#7d8590]">posted an update to</span>
                                        <span className="text-[#58a6ff] hover:underline cursor-pointer">{activity.projectName || 'Project'}</span>
                                        <span className="text-[#7d8590]">· {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Just now'}</span>
                                    </div>
                                    <p className="text-[13px] text-[#7d8590] truncate pl-8">
                                        {activity.content}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-[296px] shrink-0">
                <RightSidebar />
            </div>
        </div>
    );
}
