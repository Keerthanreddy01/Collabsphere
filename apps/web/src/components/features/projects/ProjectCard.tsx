"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, Code, Heart, Layers, Users } from "lucide-react";
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col h-full rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] overflow-hidden"
        >
            {/* Top Bar / Visual Accent */}
            <div className="h-2 w-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-30 group-hover:opacity-100 transition-opacity" />

            {/* Content Container */}
            <div className="p-6 flex flex-col h-full">
                {/* Header: Title & Heart */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">
                            <Layers className="w-3 h-3" />
                            {project.status.replace("-", " ")}
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-lg border border-border">
                        <Heart className={cn("w-3.5 h-3.5", project.upvotes?.length > 0 ? "text-primary fill-primary" : "text-muted-foreground")} />
                        <span className="text-[10px] font-bold font-mono">{project.upvotes?.length || 0}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-medium leading-relaxed">
                    {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack?.map((tech: string) => (
                        <span 
                            key={tech} 
                            className="text-[10px] font-bold uppercase tracking-tight text-foreground/70 px-2 py-0.5 rounded bg-muted/30 border border-border/50 font-mono"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Role Specific Badges */}
                <div className="space-y-3 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Hiring Now</p>
                    <div className="flex flex-wrap gap-2">
                        {project.rolesNeeded?.filter((r: RoleNeeded) => !r.filled).map((role: RoleNeeded, i: number) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className="text-[10px] py-0.5 px-3 rounded-full border-primary/30 bg-primary/5 text-primary font-bold uppercase tracking-wide hover:bg-primary/10 transition-colors"
                            >
                                {role.role}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-1.5">
                            {[1, 2].map(j => (
                                <Avatar key={j} className="w-7 h-7 border-2 border-[hsl(var(--card))] ring-1 ring-border">
                                    <AvatarImage src={`https://avatar.vercel.sh/${project.id}${j}`} />
                                    <AvatarFallback>B</AvatarFallback>
                                </Avatar>
                            ))}
                            {project.teamSize > 2 && (
                                <div className="w-7 h-7 rounded-full bg-secondary text-[9px] text-foreground font-black border-2 border-[hsl(var(--card))] flex items-center justify-center ring-1 ring-border">
                                    +{project.teamSize - 2}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold uppercase text-muted-foreground leading-none">Team size</span>
                            <span className="text-xs font-bold text-foreground">{project.teamSize}/{project.maxTeamSize}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button 
                            asChild 
                            size="sm" 
                            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-widest px-4 h-9 shadow-lg shadow-primary/20"
                        >
                            <Link href={`/project/${project.id}`}>Inspect</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Subtle Hover Glow Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};
