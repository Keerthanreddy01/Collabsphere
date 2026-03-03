"use client";

import React from "react";
import { Identicon } from "./Identicon";
import { cn } from "@/lib/utils";

interface FeedItemProps {
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    content: string;
    timestamp: string;
    project?: {
        name: string;
        tag: string;
    };
    stats: {
        votes: number;
        comments: number;
    };
}

export const FeedItem = ({ author, content, timestamp, project }: FeedItemProps) => {
    return (
        <div className="py-3 border-b border-[#21262d] transition-colors group">
            <div className="flex gap-2">
                <Identicon name={author.name} size={28} />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[13px] flex-wrap">
                        <span className="font-semibold text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer">
                            {author.name}
                        </span>
                        <span className="text-[#8b949e]">posted an update to</span>
                        <span className="text-[#58a6ff] hover:underline cursor-pointer font-medium">
                            {project?.name}
                        </span>
                        <span className="text-[#7d8590] text-[12px]">· {timestamp}</span>
                    </div>

                    <p className="text-[14px] text-[#7d8590] leading-snug line-clamp-2 mt-0.5">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};
