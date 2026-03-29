"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, Code, Heart } from "lucide-react";
import { Project } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RoleNeeded {
    role: string;
    description?: string;
    filled: boolean;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    // Generate a random gradient if one doesn't exist
    const bannerGradient = project.bannerColor || "bg-gradient-to-r from-primary to-secondary";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col h-full rounded-2xl glass overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-xl"
        >
            {/* Banner */}
            <div className={cn("h-32 w-full relative overflow-hidden", bannerGradient)}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border-white/10">
                        {project.status}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 relative mt-[-2rem]">
                {/* Owner Avatar */}
                <div className="flex items-end justify-between mb-4">
                    <Avatar className="w-12 h-12 border-4 border-[#0d0d0d] shadow-xl">
                        <AvatarImage src={`https://avatar.vercel.sh/${project.ownerId}`} />
                        <AvatarFallback>O</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
                        <span className="text-[10px] font-bold text-white">{project.upvotes?.length || 0}</span>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors tracking-tight">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-medium min-h-[40px]">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack?.map((tech: string) => (
                            <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-2 mb-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Hiring Roles</p>
                        <div className="flex flex-wrap gap-2">
                            {project.rolesNeeded?.filter((r: RoleNeeded) => !r.filled).map((role: RoleNeeded, i: number) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className={cn(
                                        "text-[10px] py-0.5 px-3 rounded-full border-primary/20 bg-primary/5 text-primary",
                                        role.role.toLowerCase().includes("design") && "border-pink-500/20 bg-pink-500/5 text-pink-400",
                                        role.role.toLowerCase().includes("react") && "border-blue-500/20 bg-blue-500/5 text-blue-400"
                                    )}
                                >
                                    {role.role}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(j => (
                            <Avatar key={j} className="w-6 h-6 border-2 border-[#111]">
                                <AvatarImage src={`https://avatar.vercel.sh/${project.id}${j}`} />
                                <AvatarFallback>B</AvatarFallback>
                            </Avatar>
                        ))}
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white font-bold border-2 border-[#111]">
                            +{project.teamSize}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button asChild variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-white/5 hover:bg-white/10">
                            <Link href={`/project/${project.id}`}>
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-[10px] font-bold uppercase tracking-widest px-4 h-8">
                            <Link href={`/project/${project.id}`}>Apply</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
