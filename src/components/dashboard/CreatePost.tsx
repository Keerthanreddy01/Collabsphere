"use client";

import React, { useState } from "react";
import {
    Image,
    Link2,
    Smile,
} from "lucide-react";
import { Identicon } from "./Identicon";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const CreatePost = () => {
    const { user } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);
    const [content, setContent] = useState("");

    return (
        <div className="py-2">
            <div className="flex gap-3">
                <Identicon name={user?.displayName || "User"} size={28} />

                <div className="flex-1 space-y-3">
                    <textarea
                        placeholder="What did you build today?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onClick={() => setIsExpanded(true)}
                        className={cn(
                            "w-full bg-[#0d1117] border border-[#30363d] rounded-[6px] px-3 py-2 text-[14px] text-[#e6edf3] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]/30 focus:border-[#58a6ff] transition-all resize-none",
                            isExpanded ? "h-24" : "h-[38px]"
                        )}
                    />

                    {isExpanded && (
                        <div className="flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="flex items-center gap-2">
                                <button className="text-[#7d8590] hover:text-[#e6edf3] transition-colors">
                                    <Image className="w-[16px] h-[16px]" />
                                </button>
                                <button className="text-[#7d8590] hover:text-[#e6edf3] transition-colors">
                                    <Link2 className="w-[16px] h-[16px]" />
                                </button>
                                <button className="text-[#7d8590] hover:text-[#e6edf3] transition-colors">
                                    <Smile className="w-[16px] h-[16px]" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    className="text-[14px] text-[#7d8590] hover:text-[#58a6ff] transition-colors"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setContent("");
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={!content.trim()}
                                    className="px-4 py-[5px] bg-[#21262d] border border-[#30363d] rounded-[6px] text-[14px] font-medium text-[#e6edf3] hover:bg-[#30363d] transition-all disabled:opacity-50"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
