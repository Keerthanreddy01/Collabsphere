"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex bg-[#0d1117] min-h-screen text-[#e6edf3] font-sans">
            <Sidebar />

            <main className="flex-1 min-h-screen overflow-y-auto flex flex-col">
                {/* Thin Top visual separator */}
                <div className="h-12 border-b border-[#30363d] sticky top-0 bg-[#0d1117]/80 backdrop-blur-sm z-[50]" />

                <div className="flex-1 p-4 lg:p-12">
                    <div className="max-w-[1012px] mx-auto flex flex-col gap-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
