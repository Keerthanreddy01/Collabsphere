"use client";

import React from "react";
import { motion } from "framer-motion";

export const ActivityHeatmap = () => {
    // Generate random activity data for mockup
    const weeks = 24;
    const daysPerWeek = 7;
    const data = Array.from({ length: weeks * daysPerWeek }, () => Math.floor(Math.random() * 5));

    const getColor = (val: number) => {
        switch (val) {
            case 1: return "bg-primary/20";
            case 2: return "bg-primary/40";
            case 3: return "bg-primary/60";
            case 4: return "bg-primary/90";
            default: return "bg-white/5";
        }
    };

    return (
        <div className="w-full bg-[#111] p-6 rounded-3xl border border-white/5 shadow-2xl overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Contribution Grid</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Consistency breeds excellence</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(v => (
                        <div key={v} className={`w-3 h-3 rounded-sm ${getColor(v)}`} />
                    ))}
                    <span>More</span>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 min-w-full">
                {Array.from({ length: weeks }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-2 shrink-0">
                        {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                            const val = data[weekIndex * daysPerWeek + dayIndex];
                            return (
                                <motion.div
                                    key={dayIndex}
                                    whileHover={{ scale: 1.2 }}
                                    className={`w-4 h-4 rounded-md transition-colors duration-500 shadow-sm ${getColor(val)}`}
                                    title={`${val} activities on day ${weekIndex * 7 + dayIndex}`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-12 mt-4 pt-4 border-t border-white/5 opacity-50 text-[10px] font-black tracking-widest uppercase">
                <div className="flex items-center gap-2">
                    <span className="text-white">Mar</span>
                    <div className="h-0.5 w-8 bg-white/10" />
                    <span className="text-white">Jun</span>
                    <div className="h-0.5 w-8 bg-white/10" />
                    <span className="text-white">Sep</span>
                </div>
            </div>
        </div>
    );
};
