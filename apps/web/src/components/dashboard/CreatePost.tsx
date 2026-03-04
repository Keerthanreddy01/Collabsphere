"use client";

import React, { useState } from "react";
import {
    Image,
    Link2,
    Smile,
    Send
} from "lucide-react";
import { GitHubAvatar } from "./GitHubAvatar";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";

export const CreatePost = () => {
    const { user } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim() || !user) return;
        setLoading(true);
        try {
            const updateData = {
                content: content.trim(),
                authorId: user.uid,
                authorName: user.displayName || "User",
                projectId: "default", // Placeholder for now
                projectName: "General Update",
                createdAt: serverTimestamp(),
                likes: [],
                comments: []
            };
            await addDoc(collection(db, "updates"), updateData);
            setContent("");
            setIsExpanded(false);
        } catch (error) {
            console.error("Error posting update:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-[6px] p-4">
            <div className="flex gap-3">
                <GitHubAvatar
                    name={user?.displayName || "User"}
                    src={user?.photoURL || ""}
                    size={32}
                />

                <div className="flex-1 space-y-3 relative">
                    <textarea
                        placeholder="What did you build today?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        className={cn(
                            "w-full bg-[#0d1117] border border-[#30363d] rounded-[6px] px-3 py-2 text-[14px] text-[#e6edf3] placeholder:text-[#7d8590] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all resize-none min-h-[80px]",
                            isExpanded ? "h-32" : "h-20"
                        )}
                    />

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <button className="text-[#7d8590] hover:text-[#e6edf3] transition-colors p-1">
                                <Image size={16} />
                            </button>
                            <button className="text-[#7d8590] hover:text-[#e6edf3] transition-colors p-1">
                                <Link2 size={16} />
                            </button>
                            <button className="text-[#7d8590] hover:text-[#e6edf3] transition-colors p-1">
                                <Smile size={16} />
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            {isExpanded && (
                                <button
                                    className="text-[12px] font-medium text-[#7d8590] hover:text-[#58a6ff] transition-colors"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setContent("");
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                disabled={!content.trim() || loading}
                                onClick={handleSubmit}
                                className="px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-[6px] text-[12px] font-semibold text-[#e6edf3] hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                            >
                                <span>{loading ? "Posting..." : "Post Update"}</span>
                                <Send size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
