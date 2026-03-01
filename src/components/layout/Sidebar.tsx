"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Rocket,
    Send,
    Terminal,
    Trophy,
    Bookmark,
    Settings,
    Circle,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Sparkles
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Projects", href: "/dashboard/projects", icon: Rocket },
    { name: "Applications", href: "/dashboard/applications", icon: Send },
    { name: "Feed", href: "/dashboard/feed", icon: Terminal },
    { name: "Hackathons", href: "/dashboard/hackathons", icon: Trophy },
    { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (val: boolean) => void }) => {
    const pathname = usePathname();
    const { user, profile, logout } = useAuth();
    const [isOpenToCollab, setIsOpenToCollab] = useState(profile?.openToCollab ?? true);

    return (
        <motion.div
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="h-screen sticky top-0 bg-[#0d0d0d] border-r border-white/5 flex flex-col z-[100] transition-all duration-300 overflow-hidden"
        >
            {/* Sidebar Header: Logo */}
            <div className="p-6 flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                        <Rocket className="text-white w-6 h-6" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-black text-white tracking-tighter uppercase italic">
                            Collab<span className="text-primary italic">Sphere</span>
                        </span>
                    )}
                </Link>
            </div>

            {/* User Info */}
            <div className={cn("px-6 mb-10 transition-all", isCollapsed ? "flex flex-col items-center" : "")}>
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={user?.photoURL || ""} />
                        <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{user?.displayName || "Builder"}</p>
                            <div
                                className="flex items-center gap-1.5 cursor-pointer group"
                                onClick={() => setIsOpenToCollab(!isOpenToCollab)}
                            >
                                <Circle
                                    className={cn(
                                        "w-2 h-2 fill-current transition-colors",
                                        isOpenToCollab ? "text-green-500 shadow-[0_0_5px_green]" : "text-zinc-600"
                                    )}
                                />
                                <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-white transition-colors">
                                    {isOpenToCollab ? "Open to Collab" : "Away"}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 px-4 space-y-2">
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group",
                                isActive
                                    ? "bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "")} />
                            {!isCollapsed && (
                                <span className="text-sm font-bold tracking-tight">{item.name}</span>
                            )}
                            {isActive && !isCollapsed && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-[-1rem] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 space-y-2">
                {!isCollapsed && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 mb-4 group relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 text-primary opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles className="w-16 h-16" />
                        </div>
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-2 italic">Pro Tip</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                            Connect Github to auto-populate your skills cloud instantly.
                        </p>
                    </div>
                )}

                <div className={cn("flex items-center gap-2", isCollapsed ? "flex-col" : "justify-between")}>
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={logout}
                        className="w-10 h-10 rounded-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-10 h-10 rounded-full border border-white/5 text-muted-foreground hidden lg:flex items-center justify-center"
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
