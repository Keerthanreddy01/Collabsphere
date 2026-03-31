"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Finally found my backend co-founder here. We shipped our MVP in 6 weeks.",
    author: "Alex K.",
    role: "Full-Stack Developer",
    rotate: -1,
  },
  {
    quote: "Posted a React bug at 11pm. Had 3 responses with working code by midnight. Unreal.",
    author: "Priya M.",
    role: "Frontend Engineer",
    rotate: 1,
  },
  {
    quote: "Collabsphere is what LinkedIn wishes it was for developers. No noise, just builders.",
    author: "James O.",
    role: "Indie Hacker",
    rotate: -0.5,
  }
];

export function Testimonials() {
  return (
    <section className="relative py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            What builders are saying.
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 perspective-[2000px]">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40, rotateY: 10, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0, rotate: t.rotate }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.2 } }}
              className="flex-1 bg-[#F5F4F0] p-10 rounded-2xl flex flex-col justify-between min-h-[320px] shadow-2xl relative group"
            >
              <div className="text-3xl text-[#0A0A0F]/10 font-serif absolute top-4 left-6 leading-none select-none italic font-bold">
                “
              </div>
              
              <p className="text-[#0A0A0F] text-xl font-medium leading-relaxed italic z-10">
                {t.quote}
              </p>

              <div>
                <div className="h-px bg-[#0A0A0F]/10 mb-6" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="text-[#0A0A0F] font-bold">{t.author}</h4>
                    <p className="text-[#0A0A0F]/60 text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
