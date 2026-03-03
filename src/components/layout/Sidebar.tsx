"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Rocket,
    Send,
    Terminal,
    Trophy,
    Bookmark,
    Settings,
    LogOut,
} from "lucide-react";
import { Identicon } from "@/components/dashboard/Identicon";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Projects", href: "/dashboard/projects", icon: Rocket },
    { name: "Applications", href: "/dashboard/applications", icon: Send },
    { name: "Feed", href: "/dashboard/feed", icon: Terminal },
    { name: "Hackathons", href: "/dashboard/hackathons", icon: Trophy },
    { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const { user, profile, logout } = useAuth();
    const isOpenToCollab = profile?.openToCollab ?? true;

    return (
        <aside
            className="h-screen sticky top-0 bg-[#0d1117] border-r border-[#30363d] flex flex-col z-[100] w-[240px]"
        >
            {/* User Profile Header */}
            <div className="p-4 mb-2 flex items-center gap-3">
                <Identicon name={user?.displayName || "User"} size={28} />
                <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-[#e6edf3] truncate">
                        {user?.displayName || "User"}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <div className={cn("w-2 h-2 rounded-full", isOpenToCollab ? "bg-[#3fb950]" : "bg-[#7d8590]")} />
                        <span className="text-[12px] text-[#7d8590]">Open to collab</span>
                    </div>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-2 space-y-0.5 mt-2">
                <p className="text-[11px] font-semibold text-[#484f58] uppercase px-3 py-2">Platform</p>
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-[6px] transition-colors relative group text-[14px]",
                                isActive
                                    ? "bg-[#1c2128] text-[#e6edf3]"
                                    : "text-[#7d8590] hover:bg-[#1c2128] hover:text-[#e6edf3]"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-[#f78166] rounded-full" />
                            )}
                            <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-[#e6edf3]" : "text-[#7d8590]")} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Nav */}
            <div className="px-2 py-4 border-t border-[#30363d] space-y-0.5">
                <Link
                    href="/dashboard/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-[6px] transition-colors text-[14px]",
                        pathname === "/dashboard/settings"
                            ? "bg-[#1c2128] text-[#e6edf3]"
                            : "text-[#7d8590] hover:bg-[#1c2128] hover:text-[#e6edf3]"
                    )}
                >
                    <Settings className="w-4 h-4 text-[#7d8590]" />
                    <span>Settings</span>
                </Link>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-[#7d8590] hover:bg-[#1c2128] hover:text-[#f85149] transition-colors text-[14px] text-left"
                >
                    <LogOut className="w-4 h-4 text-[#7d8590]" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};
