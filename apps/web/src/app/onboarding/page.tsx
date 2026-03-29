"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Rocket,
    ChevronRight,
    ChevronLeft,
    User,
    Terminal,
    Globe,
    Users,
    Send,
    Sparkles,
    Zap,
    CheckCircle2,
    Code,
    Compass,
    Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const roles = [
    { id: "dev", name: "Developer", icon: Terminal, color: "text-primary", bg: "bg-primary/10" },
    { id: "designer", name: "Designer", icon: Sparkles, color: "text-secondary", bg: "bg-secondary/10" },
    { id: "student", name: "Student", icon: User, color: "text-primary", bg: "bg-primary/10" },
    { id: "entrepreneur", name: "Entrepreneur", icon: Zap, color: "text-secondary", bg: "bg-secondary/10" },
];

const skills = [
    "React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Python",
    "Rust", "Go", "Figma", "UI/UX", "Solidity", "PostgreSQL", "Firebase",
    "Docker", "AWS", "Swift", "C#", "Three.js"
];

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        role: "",
        skills: [] as string[],
        lookingFor: "",
        bio: "",
    });
    const { user } = useAuth();
    const router = useRouter();

    const handleToggleSkill = (skill: string) => {
        setForm(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const nextStep = () => {
        if (step === 4) {
            toast.success("Profile complete! Entering the sphere...");
            router.push("/dashboard");
            return;
        }
        setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Bg decorations */}
            <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[150px] animate-pulse" />

            {/* Progress Tracker */}
            <div className="max-w-md w-full mb-12 flex items-center justify-between gap-4 relative z-10 px-8">
                {[1, 2, 3, 4].map(s => (
                    <div key={s} className="flex-1 flex flex-col items-center gap-2">
                        <div className={cn(
                            "w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-500",
                            step >= s ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]" : "bg-black/40 border-white/10 text-muted-foreground"
                        )}>
                            {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                        </div>
                        <div className={cn("h-1 w-full rounded-full transition-all duration-500", step >= s ? "bg-primary" : "bg-white/5")} />
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full relative z-10"
            >
                <div className="bg-[#0d0d0d] p-10 md:p-16 rounded-[3rem] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="flex flex-col items-center text-center"
                            >
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Choose Your <span className="text-primary italic">Avatar.</span></h2>
                                <p className="text-muted-foreground font-medium mb-12 uppercase tracking-widest text-xs">What defines your build style?</p>

                                <div className="grid grid-cols-2 gap-6 w-full">
                                    {roles.map(role => (
                                        <button
                                            key={role.id}
                                            onClick={() => setForm({ ...form, role: role.id })}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-8 rounded-[2rem] border transition-all duration-300 group",
                                                form.role === role.id ? "bg-primary border-primary shadow-2xl scale-105" : "bg-[#111] border-white/5 hover:border-white/20"
                                            )}
                                        >
                                            <role.icon className={cn("w-10 h-10 mb-4", form.role === role.id ? "text-white" : role.color)} />
                                            <span className={cn("text-sm font-black uppercase tracking-widest", form.role === role.id ? "text-white" : "text-muted-foreground")}>{role.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="flex flex-col items-center text-center"
                            >
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Select Your <span className="text-secondary italic">Stack.</span></h2>
                                <p className="text-muted-foreground font-medium mb-12 uppercase tracking-widest text-xs">What tools are in your warehouse?</p>

                                <div className="flex flex-wrap justify-center gap-3 w-full">
                                    {skills.map(skill => (
                                        <button
                                            key={skill}
                                            onClick={() => handleToggleSkill(skill)}
                                            className={cn(
                                                "px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all",
                                                form.skills.includes(skill)
                                                    ? "bg-secondary border-secondary text-white shadow-lg"
                                                    : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                                            )}
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="flex flex-col items-center text-center"
                            >
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Desired <span className="text-primary italic">Trajectory.</span></h2>
                                <p className="text-muted-foreground font-medium mb-12 uppercase tracking-widest text-xs">What's your primary goal today?</p>

                                <div className="space-y-4 w-full">
                                    {[
                                        { id: "find", label: "Find Projects To Join", icon: Compass },
                                        { id: "post", label: "Post My Own Projects", icon: Rocket },
                                        { id: "both", label: "Both (Complete Hybrid)", icon: Users }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setForm({ ...form, lookingFor: opt.id })}
                                            className={cn(
                                                "w-full p-8 rounded-[2rem] border flex items-center justify-between transition-all group",
                                                form.lookingFor === opt.id ? "bg-primary border-primary shadow-xl" : "bg-[#111] border-white/5 hover:border-white/10"
                                            )}
                                        >
                                            <div className="flex items-center gap-6">
                                                <opt.icon className={cn("w-8 h-8", form.lookingFor === opt.id ? "text-white" : "text-primary")} />
                                                <span className={cn("text-lg font-black uppercase tracking-widest", form.lookingFor === opt.id ? "text-white" : "text-muted-foreground")}>{opt.label}</span>
                                            </div>
                                            {form.lookingFor === opt.id && <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-primary" /></div>}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="flex flex-col items-center text-center w-full"
                            >
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Final <span className="text-secondary italic">Transmission.</span></h2>
                                <p className="text-muted-foreground font-medium mb-12 uppercase tracking-widest text-xs">Write your builder bio</p>

                                <div className="flex flex-col items-center gap-8 w-full">
                                    <div className="relative group">
                                        <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-2xl">
                                            <AvatarImage src={user?.avatar || ""} />
                                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer border-2 border-black hover:scale-110 transition-transform">
                                            <Plus className="w-4 h-4" />
                                            <input type="file" className="hidden" />
                                        </label>
                                    </div>

                                    <div className="w-full space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic float-left mb-1">Brief Bio (Max 240 chars)</label>
                                        <Textarea
                                            placeholder="I build high performance systems for the next decade..."
                                            className="w-full bg-[#111] border-white/5 rounded-2xl h-32 focus:ring-1 focus:ring-primary/50 text-white font-medium p-6"
                                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-6 mt-16 pt-10 border-t border-white/5">
                        <Button
                            onClick={prevStep}
                            disabled={step === 1}
                            variant="ghost"
                            className="rounded-full px-8 text-muted-foreground hover:bg-white/5 disabled:opacity-0"
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" /> Back
                        </Button>
                        <Button
                            onClick={nextStep}
                            className="rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest px-12 h-14 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                        >
                            {step === 4 ? "Complete Mission" : "Phase Next"} <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
