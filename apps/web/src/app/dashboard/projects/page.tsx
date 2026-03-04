"use client";

import React from "react";
import {
    Plus,
    Search,
    ChevronDown,
} from "lucide-react";

export default function MyProjectsPage() {
    const projects = [
        { name: "nexus-chat", status: "Building", description: "Decentralized real-time chat with Web3auth", tech: "TypeScript", color: "#3178c6", stars: 24, members: 3, updated: "2 days ago" },
        { name: "eco-track", status: "Needs Help", description: "Environmental monitoring system for smart cities", tech: "Python", color: "#3572A5", stars: 12, members: 5, updated: "Mar 1, 2026" },
        { name: "solana-pay-adapter", status: "Launched", description: "Merchant adapter for Solana Pay on Shopify", tech: "Rust", color: "#dea584", stars: 156, members: 2, updated: "Feb 15, 2026" },
        { name: "ai-code-reviewer", status: "Planning", description: "LLM-based automated code reviewer for pull requests", tech: "TypeScript", color: "#3178c6", stars: 8, members: 1, updated: "1h ago" },
    ];

    return (
        <div className="max-w-[1012px] mx-auto space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#30363d]">
                <h1 className="text-[16px] font-semibold text-[#e6edf3]">My Projects</h1>
                <button className="px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-[6px] text-[12px] font-semibold text-[#e6edf3] hover:bg-[#30363d] transition-all flex items-center gap-1.5 shadow-sm">
                    <Plus size={16} />
                    <span>New Project</span>
                </button>
            </div>

            {/* GitHub style search and filters */}
            <div className="flex flex-col md:flex-row gap-2 pb-4 border-b border-[#30363d]">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d8590]" />
                    <input
                        type="text"
                        placeholder="Find a project..."
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-[6px] py-1.5 pl-9 pr-3 text-[14px] text-[#e6edf3] placeholder:text-[#484f58] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-transparent border border-[#30363d] rounded-[6px] text-[12px] font-semibold text-[#e6edf3] hover:bg-[#1c2128] hover:border-[#8b949e] transition-all flex items-center gap-2">
                        <span>Type</span>
                        <ChevronDown size={14} className="text-[#484f58]" />
                    </button>
                    <button className="px-3 py-1.5 bg-transparent border border-[#30363d] rounded-[6px] text-[12px] font-semibold text-[#e6edf3] hover:bg-[#1c2128] hover:border-[#8b949e] transition-all flex items-center gap-2">
                        <span>Sort</span>
                        <ChevronDown size={14} className="text-[#484f58]" />
                    </button>
                </div>
            </div>

            {/* Project List */}
            <div className="divide-y divide-[#30363d]">
                {projects.map((p, i) => (
                    <div key={i} className="py-6 flex flex-col gap-1.5 group hover:bg-[#161b22]/30 px-3 rounded-[6px] transition-colors border-l-[3px] border-l-transparent hover:border-l-[#58a6ff]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="text-[18px] font-semibold text-[#58a6ff] hover:underline cursor-pointer">{p.name}</h3>
                                <span className={cn(
                                    "text-[12px] px-2 py-0.5 rounded-[6px] border font-medium border-[#30363d]",
                                    p.status === "Building" && "text-[#3fb950] bg-transparent",
                                    p.status === "Needs Help" && "text-[#f85149] bg-transparent",
                                    p.status === "Launched" && "text-[#58a6ff] bg-transparent",
                                    p.status === "Planning" && "text-[#7d8590] bg-transparent",
                                )}>
                                    {p.status}
                                </span>
                            </div>
                            <span className="text-[12px] text-[#7d8590]">{p.updated}</span>
                        </div>
                        <p className="text-[14px] text-[#7d8590] max-w-2xl leading-relaxed">{p.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-[12px] text-[#7d8590]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                                <span>{p.tech}</span>
                            </div>
                            {p.stars > 0 && <div className="flex items-center gap-1"><span>★</span><span>{p.stars}</span></div>}
                            <div className="flex items-center gap-1"><span>👥</span><span>{p.members}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
