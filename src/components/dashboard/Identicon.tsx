"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IdenticonProps {
    name: string;
    size?: number;
    className?: string;
}

const colors = ["#1f6feb", "#238636", "#9e6a03", "#b62324"];

export const Identicon = ({ name, size = 28, className }: IdenticonProps) => {
    // Simple hash to pick a color
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = colors[hash % colors.length];

    // Get initials (max 2)
    const initials = name
        .split(/[\s_-]/)
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div
            className={cn(
                "flex items-center justify-center font-semibold text-white select-none shrink-0",
                className
            )}
            style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: "4px",
                fontSize: size * 0.4
            }}
        >
            {initials}
        </div>
    );
};
