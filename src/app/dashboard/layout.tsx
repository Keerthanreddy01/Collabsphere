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

            <main className="flex-1 min-h-screen overflow-y-auto p-4 lg:p-12">
                <div className="max-w-[1012px] mx-auto flex flex-col gap-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
