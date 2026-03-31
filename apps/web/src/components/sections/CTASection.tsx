"use client";

import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";

export function CTASection() {
  return (
    <section className="relative py-48 bg-[#0A0A0F] overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-10 leading-[1.1] tracking-tight">
            Ready to find <br /> <span className="text-primary italic">your team?</span>
          </h2>
          <p className="text-2xl text-[#8B8B9E] font-medium mb-16 max-w-2xl mx-auto">
            Join 2,400+ builders already on Collabsphere. No noise, just builders building the future.
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <GradientButton variant="primary" size="xl" className="shadow-[0_0_50px_rgba(108,99,255,0.4)] hover:shadow-[0_0_80px_rgba(108,99,255,0.6)] px-16 py-8 text-xl">
              Start Building Free →
            </GradientButton>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-mono text-[#8B8B9E] tracking-widest uppercase"
            >
              No credit card. No noise. Just builders.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
    </section>
  );
}
