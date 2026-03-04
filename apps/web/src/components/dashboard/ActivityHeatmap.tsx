"use client";

import React from "react";

export const ActivityHeatmap = () => {
    // Generate mockup data
    const weeks = 28;
    const days = 7;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

    // Random activity levels
    const data = Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5));

    const getColor = (level: number) => {
        switch (level) {
            case 1: return "#0e4429";
            case 2: return "#006d32";
            case 3: return "#26a641";
            case 4: return "#39d353";
            default: return "#161b22";
        }
    };

    return (
        <div className="surface p-4 overflow-hidden">
            <div className="flex flex-col gap-2">
                {/* Month Headers */}
                <div className="flex gap-[16px] ml-8 mb-1">
                    {months.map((m, i) => (
                        <span key={i} className="text-[10px] text-[#7d8590] w-full">{m}</span>
                    ))}
                </div>

                <div className="flex gap-2">
                    {/* Day Labels */}
                    <div className="flex flex-col gap-[7px] text-[10px] text-[#7d8590] pt-1">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                    </div>

                    {/* SVG Grid */}
                    <div className="flex-1 overflow-x-auto no-scrollbar">
                        <svg width={weeks * 14} height={days * 14} className="overflow-visible">
                            {Array.from({ length: weeks }).map((_, w) => (
                                <g key={w} transform={`translate(${w * 14}, 0)`}>
                                    {Array.from({ length: days }).map((_, d) => {
                                        const level = data[w * days + d];
                                        return (
                                            <rect
                                                key={d}
                                                y={d * 14}
                                                width="11"
                                                height="11"
                                                rx="2"
                                                ry="2"
                                                fill={getColor(level)}
                                                stroke={level === 0 ? "#30363d" : "none"}
                                                strokeWidth="1"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <title>{level} contributions on some date</title>
                                            </rect>
                                        );
                                    })}
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4 text-[11px] text-[#7d8590]">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22] border border-[#30363d]" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};
