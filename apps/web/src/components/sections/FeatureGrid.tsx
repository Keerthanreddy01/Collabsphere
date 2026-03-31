"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Code2, 
  Rocket, 
  Activity, 
  MessageSquare, 
  Calendar, 
  HelpCircle 
} from "lucide-react";

const FEATURES = [
  {
    title: "Builder Profiles",
    icon: Code2,
    description: "Show what you actually build. GitHub stats, tech stack, open-to-collab status."
  },
  {
    title: "Project Incubation",
    icon: Rocket,
    description: "Launch your project. Post open roles. Recruit motivated teammates."
  },
  {
    title: "Build-in-Public Feed",
    icon: Activity,
    description: "Share progress. Get boosts. Build your reputation one shipped feature at a time."
  },
  {
    title: "Collaboration Rooms",
    icon: MessageSquare,
    description: "Team spaces for chat, assets, and coordination — all in one place."
  },
  {
    title: "Workshops",
    icon: Calendar,
    description: "Host or attend technical workshops. Online, offline, or hybrid with RSVP tracking."
  },
  {
    title: "Dev Q&A",
    icon: HelpCircle,
    description: "Post a question. Get a real answer. Senior devs help and move on. No noise."
  }
];

export function FeatureGrid() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Everything a builder needs.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#8B8B9E] font-medium"
          >
            One platform. Zero friction.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <GlassCard className="h-full border-white/5 hover:border-primary/20">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary transition-all">
                  <feature.icon className="text-primary group-hover:text-[#0A0A0F] transition-colors" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-[#8B8B9E] leading-relaxed font-medium">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
