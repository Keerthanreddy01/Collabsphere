"use client";

import React, { useState } from "react";
import {
    Circle,
    CheckCircle2,
    XCircle,
    GitPullRequest
} from "lucide-react";
import { GitHubAvatar } from "@/components/features/dashboard/GitHubAvatar";
import { cn } from "@/lib/utils";

export default function ApplicationsPage() {
    const [tab, setTab] = useState("open");

    const applications = [
        { id: 1, name: "nexus-chat", role: "React Developer", status: "pending", time: "2 days ago", owner: "sarah-chen" },
        { id: 2, name: "decentral-shop", role: "Rust Engineer", status: "accepted", time: "1 week ago", owner: "marcus-vane" },
        { id: 3, name: "eco-track", role: "UI Designer", status: "rejected", time: "3 days ago", owner: "elena-rod" },
    ];

    return (
        <div className="max-w-[1012px] mx-auto space-y-4">
            <div className="flex items-center gap-4 border-b border-[#30363d] pb-4">
                <button
                    onClick={() => setTab("open")}
                    className={cn(
                        "text-[14px] font-semibold px-4 py-2 flex items-center gap-2 -mb-[17px] transition-colors relative z-10",
                        tab === "open" ? "text-[#e6edf3]" : "text-[#7d8590] hover:text-[#e6edf3]"
                    )}
                >
                    <Circle className="w-4 h-4 text-[#3fb950]" /> Open <span className="bg-[#21262d] px-2 py-0.5 rounded-full text-[12px] text-[#7d8590] ml-1">1</span>
                    {tab === "open" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e6edf3]" />}
                </button>
                <button
                    onClick={() => setTab("closed")}
                    className={cn(
                        "text-[14px] font-semibold px-4 py-2 flex items-center gap-2 -mb-[17px] transition-colors relative z-10",
                        tab === "closed" ? "text-[#e6edf3]" : "text-[#7d8590] hover:text-[#e6edf3]"
                    )}
                >
                    <CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> Closed <span className="bg-[#21262d] px-2 py-0.5 rounded-full text-[12px] text-[#7d8590] ml-1">2</span>
                    {tab === "closed" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e6edf3]" />}
                </button>
            </div>

            <div className="surface overflow-hidden divide-y divide-[#30363d] mt-8 bg-[#0d1117]">
                {(tab === "open" ? applications.filter(a => a.status === 'pending') : applications.filter(a => a.status !== 'pending')).map((app, i) => (
                    <div key={i} className="p-4 hover:bg-[#1c2128] transition-colors flex items-center justify-between group border-l-[3px] border-l-transparent hover:border-l-[#58a6ff]">
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                {app.status === 'pending' && <Circle className="w-4 h-4 text-[#3fb950]" />}
                                {app.status === 'accepted' && <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />}
                                {app.status === 'rejected' && <XCircle className="w-4 h-4 text-[#f85149]" />}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-semibold text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer leading-tight">{app.name}</span>
                                    <span className="text-[14px] text-[#7d8590] leading-tight">#{app.id}</span>
                                </div>
                                <span className="text-[12px] text-[#7d8590]">
                                    applied for <span className="font-medium text-[#c9d1d9]">{app.role}</span> · opened {app.time}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GitHubAvatar name={app.owner} src={`https://avatar.vercel.sh/${app.owner}`} size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {(tab === "open" ? applications.filter(a => a.status === 'pending') : applications.filter(a => a.status !== 'pending')).length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-[#7d8590] gap-4">
                    <GitPullRequest className="w-12 h-12 opacity-20" />
                    <p className="text-[16px] font-semibold">No applications found</p>
                </div>
            )}
        </div>
    );
}
