"use client";

import React from "react";
import { GitHubAvatar } from "./GitHubAvatar";
import { cn } from "@/lib/utils";
import {
    ArrowBigUp,
    MessageSquare,
    Share2,
    MoreHorizontal
} from "lucide-react";

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
        <div className="py-4 border-l-[3px] border-l-[#21262d] border-b border-[#30363d] hover:border-l-[#58a6ff] hover:bg-[#1c2128] transition-all duration-150 group px-4">
            <div className="flex gap-3">
                <GitHubAvatar name={author.name} src={author.avatar} size={32} />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[13px] flex-wrap">
                            <span className="font-semibold text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer">
                                {author.name}
                            </span>
                            <span className="text-[#8b949e]">posted an update to</span>
                            <span className="text-[#58a6ff] hover:underline cursor-pointer font-medium">
                                {project?.name}
                            </span>
                            <span className="text-[#7d8590] text-[12px]">· {timestamp}</span>
                        </div>
                        <button className="text-[#484f58] hover:text-[#e6edf3] transition-colors">
                            <MoreHorizontal size={14} />
                        </button>
                    </div>

                    <p className="text-[14px] text-[#7d8590] leading-snug mt-1 max-w-2xl">
                        {content}
                    </p>

                    {/* Action Row - Visible on Hover */}
                    <div className="flex items-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button className="flex items-center gap-1 text-[12px] text-[#7d8590] hover:text-[#58a6ff] transition-colors">
                            <ArrowBigUp size={14} />
                            <span>Upvote</span>
                        </button>
                        <button className="flex items-center gap-1 text-[12px] text-[#7d8590] hover:text-[#58a6ff] transition-colors">
                            <MessageSquare size={14} />
                            <span>Reply</span>
                        </button>
                        <button className="flex items-center gap-1 text-[12px] text-[#7d8590] hover:text-[#58a6ff] transition-colors">
                            <Share2 size={14} />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
