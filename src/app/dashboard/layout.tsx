"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex bg-[#0a0a0a] min-h-screen text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* Main Content Area */}
            <motion.main
                animate={{
                    marginLeft: 0,
                    paddingLeft: 0,
                }}
                className="flex-1 h-screen overflow-y-auto overflow-x-hidden p-6 lg:p-12 pb-24 no-scrollbar"
            >
                <div className="max-w-6xl mx-auto flex flex-col gap-12 pt-8">
                    {children}
                </div>
            </motion.main>
        </div>
    );
}
