"use client";

import React, { useState } from "react";
import {
    Circle,
    CheckCircle2,
    XCircle,
    GitPullRequest,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
                        "text-[14px] font-semibold px-1 py-2 flex items-center gap-2 -mb-4 transition-colors",
                        tab === "open" ? "text-[#e6edf3] border-b-2 border-[#f78166]" : "text-[#7d8590] hover:text-[#e6edf3]"
                    )}
                >
                    <Circle className="w-4 h-4" /> Open <span className="bg-[#21262d] px-2 py-0.5 rounded-full text-[12px] text-[#7d8590]">1</span>
                </button>
                <button
                    onClick={() => setTab("closed")}
                    className={cn(
                        "text-[14px] font-semibold px-1 py-2 flex items-center gap-2 -mb-4 transition-colors",
                        tab === "closed" ? "text-[#e6edf3] border-b-2 border-[#f78166]" : "text-[#7d8590] hover:text-[#e6edf3]"
                    )}
                >
                    <CheckCircle2 className="w-4 h-4" /> Closed <span className="bg-[#21262d] px-2 py-0.5 rounded-full text-[12px] text-[#7d8590]">2</span>
                </button>
            </div>

            <div className="surface overflow-hidden divide-y divide-[#30363d] mt-6">
                {(tab === "open" ? applications.filter(a => a.status === 'pending') : applications.filter(a => a.status !== 'pending')).map((app, i) => (
                    <div key={i} className="p-4 hover:bg-[#1c2128] transition-colors flex items-center justify-between group">
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                {app.status === 'pending' && <Circle className="w-4 h-4 text-[#3fb950]" />}
                                {app.status === 'accepted' && <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />}
                                {app.status === 'rejected' && <XCircle className="w-4 h-4 text-[#f85149]" />}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-semibold text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer">{app.name}</span>
                                    <span className="text-[14px] text-[#e6edf3]">· Role: {app.role}</span>
                                </div>
                                <span className="text-[12px] text-[#7d8590]">
                                    Applied to <span className="text-[#58a6ff] cursor-pointer">{app.name}</span> for <span className="font-medium text-[#7d8590]">{app.role}</span> · opened {app.time} by you
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pr-2">
                            <Avatar className="h-5 w-5 rounded-full border border-[#30363d]">
                                <AvatarImage src={`https://avatar.vercel.sh/${app.owner}`} />
                            </Avatar>
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
