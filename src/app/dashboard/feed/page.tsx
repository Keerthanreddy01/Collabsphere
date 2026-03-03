"use client";

import React from "react";
import { CreatePost } from "@/components/dashboard/CreatePost";
import { FeedItem } from "@/components/dashboard/FeedItem";

export default function FeedPage() {
    const activities = [
        { author: { name: "Sarah Chen", avatar: "", role: "Frontend Dev" }, content: "Integrated the new libp2p pubsub mechanism for better message propagation. The latency dropped by 40% in our stress tests.", timestamp: "5m ago", project: { name: "Nexus Chat", tag: "building" }, stats: { votes: 124, comments: 18 } },
        { author: { name: "Marcus Vane", avatar: "", role: "Solidity Engineer" }, content: "Added support for multi-sig vault contracts in the checkout flow. Security audit starting next week.", timestamp: "2h ago", project: { name: "DecentralShop", tag: "building" }, stats: { votes: 84, comments: 32 } },
        { author: { name: "Elena Rodriguez", avatar: "", role: "UI/UX Designer" }, content: "Published the new design system for CollabSphere. Focused on extreme productivity and GitHub's UI philosophy.", timestamp: "4h ago", project: { name: "CollabSphere", tag: "building" }, stats: { votes: 256, comments: 45 } },
    ];

    return (
        <div className="max-w-[1012px] mx-auto space-y-4">
            <div className="pb-2 border-b border-[#30363d]">
                <h1 className="text-[16px] font-semibold text-[#e6edf3]">Feed</h1>
            </div>

            <CreatePost />

            <div className="flex flex-col border-t border-[#30363d] mt-2">
                {activities.map((activity, i) => (
                    <FeedItem key={i} {...activity} />
                ))}
            </div>
        </div>
    );
}
