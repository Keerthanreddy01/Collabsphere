"use client";

import { motion } from "framer-motion";
import { PillBadge } from "@/components/ui/PillBadge";
import { GradientButton } from "@/components/ui/GradientButton";
import { GlassCard } from "@/components/ui/GlassCard";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  } as const;

  const wordStagger = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as any
      }
    })
  };

  const headline = ["Where", "Builders", "Find", "Their", "People."];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <PillBadge>Now in Open Beta · v0.1.0</PillBadge>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordStagger}
                className={`inline-block mr-4 ${
                  word === "Where" || word === "People." ? "text-primary" : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#8B8B9E] max-w-xl mb-12 leading-relaxed font-medium">
            Post your idea. Find your team. Ship together. Collabsphere is the professional network built exclusively for developers and tech builders.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mb-16">
            <GradientButton variant="primary" size="lg">
              Start Building →
            </GradientButton>
            <GradientButton variant="ghost" size="lg">
              See How It Works
            </GradientButton>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0A0A0F] bg-gradient-to-br ${
                  i % 2 === 0 ? "from-primary/80 to-primary" : "from-secondary/80 to-secondary"
                } flex items-center justify-center text-[10px] font-bold text-[#0A0A0F]`}>
                  {String.fromCharCode(64 + i * 5)}
                </div>
              ))}
            </div>
            <div className="text-sm font-medium text-[#8B8B9E]">
              Join <span className="text-white font-bold">2,400+</span> builders shipping right now
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          {/* Card 1: Project Card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <GlassCard className="w-[420px] glass-purple">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Skynet.ai</h3>
                  <p className="text-xs text-[#8B8B9E] font-medium uppercase tracking-widest font-mono">Autonomous Fleet Network</p>
                </div>
                <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold rounded">
                  2 ROLES OPEN
                </div>
              </div>
              
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                Building an open-source decentralized protocol for autonomous logistics and delivery drones.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["React", "TypeScript", "Rust", "LibP2P"].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <GradientButton variant="primary" className="w-full h-10 text-xs">
                Apply to Collaboration
              </GradientButton>
            </GlassCard>
          </motion.div>

          {/* Card 2: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 100 }}
            animate={{ opacity: 1, x: 100, y: 30 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute top-1/2 left-0 z-10 w-[320px]"
          >
            <GlassCard className="p-4" animate={false}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-[#0A0A0F]">
                  KR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Keerthan Reddy</h4>
                  <p className="text-[10px] text-primary font-mono">@keerthan_dev</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                  <div className="text-xs font-bold text-white">48</div>
                  <div className="text-[8px] text-[#8B8B9E] uppercase tracking-tighter">PROJECTS</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                  <div className="text-xs font-bold text-white">1.2k</div>
                  <div className="text-[8px] text-[#8B8B9E] uppercase tracking-tighter">STARS</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Decorative Glows */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -z-10" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
