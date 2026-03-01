"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Rocket, Terminal, Compass, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Feed", href: "/feed", icon: Terminal },
];

export const Navbar = () => {
    const pathname = usePathname();
    const { user, profile, loading } = useAuth();
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
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 py-4",
                isScrolled
                    ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center relative shadow-[0_0_20px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all">
                        <Rocket className="text-white w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground dark:text-white">
                        Collab<span className="text-primary">Sphere</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 bg-white/5 dark:bg-black/20 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary relative",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    {loading ? (
                        <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
                    ) : user ? (
                        <Link href="/dashboard">
                            <Avatar className="h-9 w-9 border border-primary/20 hover:border-primary transition-colors cursor-pointer">
                                <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                                <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs">
                                    {user.displayName?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button asChild variant="ghost" className="rounded-full px-6">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                                <Link href="/register">Join Platform</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-full border border-white/5"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 overflow-hidden bg-background/95 backdrop-blur-2xl rounded-2xl border border-white/10"
                    >
                        <div className="flex flex-col gap-2 p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl transition-colors",
                                        pathname === link.href ? "bg-primary/10 text-primary" : "hover:bg-white/5 text-muted-foreground"
                                    )}
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="font-medium">{link.name}</span>
                                </Link>
                            ))}
                            <div className="h-px bg-white/5 my-2" />
                            {user ? (
                                <Button asChild variant="ghost" className="justify-start gap-3 p-3 h-auto">
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={user.photoURL || ""} />
                                        </Avatar>
                                        <span>My Dashboard</span>
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" className="justify-start">
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                    </Button>
                                    <Button asChild className="bg-primary text-white">
                                        <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Join Platform</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
