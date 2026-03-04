"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Github, Mail, Sparkles, TrendingUp, Compass, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
    const { loginWithGitHub, loginWithGoogle } = useAuth();
    const router = useRouter();

    const handleAuth = async (provider: "github" | "google") => {
        try {
            if (provider === "github") await loginWithGitHub();
            else await loginWithGoogle();
            toast.success("Account created! Let's get started...");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Registration failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Navbar />

            <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6">
                <div className="max-w-md w-full relative">
                    {/* Background Glow */}
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 bg-[#0d0d0d] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-3xl flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-xl">
                            <Rocket className="w-8 h-8 text-primary" />
                        </div>

                        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                            Launch Your <span className="text-secondary italic">Career.</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest mb-10">
                            Join the world's most talented builders.
                        </p>

                        <div className="w-full space-y-4">
                            <Button
                                onClick={() => handleAuth("github")}
                                className="w-full h-16 rounded-2xl bg-[#24292e] hover:bg-[#2f363d] text-white font-black uppercase tracking-widest border border-white/5 shadow-xl transition-all group"
                            >
                                <Github className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" /> Sign Up with GitHub
                            </Button>
                            <Button
                                onClick={() => handleAuth("google")}
                                variant="ghost"
                                className="w-full h-16 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest border border-white/5 shadow-xl transition-all group"
                            >
                                <Mail className="w-5 h-5 mr-3 text-secondary group-hover:scale-125 transition-transform" /> Sign Up with Google
                            </Button>
                        </div>

                        <div className="my-10 flex items-center gap-4 w-full text-muted-foreground">
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-[10px] font-black uppercase tracking-widest italic">Join Mission</span>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>

                        <div className="flex flex-col gap-6 w-full text-center">
                            <div className="flex flex-wrap justify-center gap-2">
                                <Badge variant="ghost" className="bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest py-1.5 px-3">OPEN SOURCE</Badge>
                                <Badge variant="ghost" className="bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest py-1.5 px-3">COMMUNITY FIRST</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">
                                Already have an account? <br />
                                <button onClick={() => router.push("/login")} className="text-primary font-bold uppercase tracking-widest mt-2 hover:underline">Sign In Instead →</button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
