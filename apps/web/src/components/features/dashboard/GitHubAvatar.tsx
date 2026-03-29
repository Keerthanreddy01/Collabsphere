"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
    name: string;
    src?: string;
    size?: number;
    className?: string;
}

export const GitHubAvatar = ({ name, src, size = 28, className }: AvatarProps) => {
    // Get initials (max 2)
    const initials = name
        .split(/[\s_-]/)
        .filter(Boolean)
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div
            className={cn(
                "flex items-center justify-center font-medium text-[#7d8590] select-none shrink-0 overflow-hidden relative border border-[#30363d] bg-[#21262d]",
                "rounded-full",
                className
            )}
            style={{
                width: size,
                height: size,
                fontSize: size * 0.45
            }}
        >
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            ) : null}
            <span className={cn(src && "absolute -z-10")}>{initials}</span>
        </div>
    );
};
