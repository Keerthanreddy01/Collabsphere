"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Rocket, 
    Menu, 
    X, 
    Bell, 
    User as UserIcon, 
    LogOut, 
    Settings, 
    LayoutDashboard,
    Compass,
    Terminal,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Feed", href: "/feed", icon: Terminal },
];

export const Navbar = () => {
    const pathname = usePathname();
    const { user, isLoading } = useAuth();
    const { unreadCount } = useNotifications(user?.id);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-4 left-0 right-0 z-50 transition-all duration-500 px-4 flex justify-center",
            isScrolled ? "top-2" : "top-4"
        )}>
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "w-full max-w-6xl flex items-center justify-between px-6 py-2.5 rounded-2xl transition-all duration-500",
                    isScrolled 
                        ? "bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(34,197,94,0.1)]" 
                        : "bg-white/5 backdrop-blur-md border border-white/5"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center relative shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-500">
                        <Rocket className="text-white w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="text-lg font-black tracking-tighter text-foreground dark:text-white uppercase">
                        Collab<span className="text-primary">Sphere</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-lg relative",
                                    isActive ? "text-white bg-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                )}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10 blur-sm"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        {!user && !isLoading && (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest px-4 h-9">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-primary text-white hover:bg-primary/90 text-xs font-bold uppercase tracking-widest px-5 h-9 rounded-lg shadow-lg shadow-primary/20">
                                        Join Platform
                                    </Button>
                                </Link>
                            </div>
                        )}
                        {user && (
                            <div className="flex items-center gap-3">
                                <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                    <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-black" />
                                    )}
                                </button>
                                <div className="w-9 h-9 rounded-lg border border-white/10 p-0.5 overflow-hidden group cursor-pointer">
                                    <Avatar className="w-full h-full rounded-[6px]">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-black">{user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/5"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed inset-x-4 top-20 z-40 lg:hidden p-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col gap-2">
                           {navLinks.map((link) => (
                               <Link
                                   key={link.name}
                                   href={link.href}
                                   onClick={() => setMobileMenuOpen(false)}
                                   className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-bold uppercase tracking-widest text-[#7d8590] hover:text-white"
                               >
                                   <link.icon className="w-5 h-5 text-primary" />
                                   {link.name}
                               </Link>
                           ))}
                           <div className="h-px bg-white/5 my-2" />
                           <div className="flex flex-col gap-3 p-2">
                               {!user ? (
                                   <>
                                       <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                           <Button variant="outline" className="w-full h-12 uppercase tracking-widest font-black">Login</Button>
                                       </Link>
                                       <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                           <Button className="w-full h-12 bg-primary uppercase tracking-widest font-black shadow-lg shadow-primary/20">Join Now</Button>
                                       </Link>
                                   </>
                               ) : (
                                   <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2 text-red-500 border-red-500/20 hover:bg-red-500/10">
                                       <LogOut className="w-5 h-5" /> Sign Out
                                   </Button>
                               )}
                           </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
