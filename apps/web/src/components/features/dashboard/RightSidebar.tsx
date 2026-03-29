"use client";

import React from "react";
import {
    ChevronRight,
    X,
} from "lucide-react";
import { GitHubAvatar } from "./GitHubAvatar";

export const RightSidebar = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Collab Requests Section */}
            <div className="space-y-3">
                <h3 className="text-[12px] font-semibold text-[#7d8590] uppercase tracking-[0.08em]">Collab Requests</h3>
                <div className="space-y-2">
                    {[
                        { project: "nexus-chat", user: "alice-carter", role: "React Dev", time: "2h ago" },
                        { project: "decentral-shop", user: "bob-wilson", role: "Rust Engineer", time: "1d ago" },
                    ].map((app, i) => (
                        <div key={i} className="surface p-4 hover:bg-[#1c2128] transition-colors relative group">
                            <button className="absolute top-3 right-3 text-[#7d8590] hover:text-[#f85149] opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-4 h-4" />
                            </button>
                            <div className="flex items-start gap-3 mb-3">
                                <GitHubAvatar name={app.user} src={`https://avatar.vercel.sh/${app.user}`} size={32} />
                                <div className="flex-1 min-w-0 pr-6">
                                    <p className="text-[13px] font-semibold text-[#e6edf3] truncate">@{app.user}</p>
                                    <p className="text-[12px] text-[#7d8590] leading-snug">
                                        wants to join <span className="text-[#e6edf3] font-medium">{app.project}</span> as <span className="text-[#58a6ff]">{app.role}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 px-3 py-[3px] bg-transparent border border-[#30363d] rounded-[6px] text-[12px] font-medium text-[#e6edf3] hover:bg-[#21262d] transition-all">
                                    Review
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="text-[12px] text-[#58a6ff] hover:underline font-medium">View all 12 requests →</button>
            </div>

            {/* Trending Tags Section */}
            <div className="space-y-3">
                <h3 className="text-[12px] font-semibold text-[#7d8590] uppercase tracking-[0.08em]">Trending Tags</h3>
                <div className="surface overflow-hidden divide-y divide-[#30363d]">
                    {[
                        { name: "web3", posts: "1.2k" },
                        { name: "ai-agents", posts: "850" },
                        { name: "nextjs-15", posts: "640" },
                        { name: "rust-lang", posts: "420" },
                    ].map((tag, i) => (
                        <div key={i} className="p-3 hover:bg-[#1c2128] cursor-pointer transition-colors group flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[13px] font-semibold text-[#58a6ff]">#{tag.name}</span>
                                <span className="text-[11px] text-[#7d8590] uppercase">{tag.posts} builders</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#484f58] group-hover:text-[#e6edf3] transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* GitHub Footer style */}
            <div className="pt-8 border-t border-[#30363d] flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[#7d8590]">
                <a href="#" className="hover:text-[#58a6ff]">Privacy</a>
                <a href="#" className="hover:text-[#58a6ff]">Terms</a>
                <a href="#" className="hover:text-[#58a6ff]">Docs</a>
                <a href="#" className="hover:text-[#58a6ff]">Contact CollabSphere</a>
                <span className="block w-full mt-2 font-medium">© 2026 CollabSphere, Inc.</span>
            </div>
        </div>
    );
};
