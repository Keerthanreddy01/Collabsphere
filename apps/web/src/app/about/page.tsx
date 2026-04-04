"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TickerSection } from "@/components/sections/Ticker";
import { CTASection } from "@/components/sections/CTASection";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Code2,
  Rocket,
  Globe,
  ShieldCheck,
  Zap,
  Heart,
} from "lucide-react";

// ─── UTILS ────────────────────────────────────────────────────────────────────
const E = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <HeroSection />
      <StorySection />
      <WhatWeDoSection />
      <MobileSection />
      <TickerSection />
      <ValuesSection />
      <JoinSection />
      <CTASection />
    </main>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const AVATARS = [
  { initials: "AW", color: "#6C63FF", x: "10%",  y: "20%", delay: 0.8 },
  { initials: "SR", color: "#FF6B35", x: "85%",  y: "15%", delay: 0.95 },
  { initials: "MK", color: "#00FF94", x: "5%",   y: "65%", delay: 1.1 },
  { initials: "LT", color: "#00D4FF", x: "90%",  y: "60%", delay: 1.0 },
  { initials: "MP", color: "#FFE135", x: "75%",  y: "80%", delay: 1.2 },
  { initials: "SY", color: "#FF6B35", x: "20%",  y: "82%", delay: 1.15 },
  { initials: "JR", color: "#6C63FF", x: "50%",  y: "88%", delay: 1.3 },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(108,99,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating builder avatars */}
      {AVATARS.map((a) => (
        <motion.div
          key={a.initials}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: a.delay, ease: E }}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-full font-display font-black text-sm italic border-2 border-[var(--border)] text-[var(--bg)] select-none pointer-events-none"
          style={{
            left: a.x,
            top: a.y,
            backgroundColor: a.color,
            boxShadow: `0 0 20px ${a.color}44`,
          }}
        >
          {a.initials}
        </motion.div>
      ))}

      {/* Connecting lines between avatars — subtle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block opacity-[0.06]">
        <motion.line x1="10%" y1="20%" x2="85%" y2="15%" stroke="var(--text)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.2 }} />
        <motion.line x1="85%" y1="15%" x2="90%" y2="60%" stroke="var(--text)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.4 }} />
        <motion.line x1="10%" y1="20%" x2="5%" y2="65%" stroke="var(--text)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.3 }} />
        <motion.line x1="5%" y1="65%" x2="20%" y2="82%" stroke="var(--text)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.5 }} />
        <motion.line x1="90%" y1="60%" x2="75%" y2="80%" stroke="var(--text)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.6 }} />
      </svg>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: E }}
          className="text-[var(--purple)] font-mono text-xs font-black tracking-[0.4em] uppercase mb-8"
        >
          About Collabsphere
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: E }}
          className="text-[11vw] md:text-[7.5vw] font-black tracking-[-0.05em] leading-[0.88] mb-8"
        >
          Where great builders<br />
          <span className="text-[var(--purple)]">find each other.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: E }}
          className="text-lg md:text-xl text-[var(--text)] opacity-50 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Collabsphere is the platform where developers, designers, and founders
          come together to build the products of tomorrow. Not a job board.
          Not a freelance marketplace. A community for people who build.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: E }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--text)] text-[var(--bg)] font-bold rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] rounded-full hover:border-[var(--text)] transition-colors text-sm font-medium"
          >
            Explore projects
          </Link>
        </motion.div>

        {/* Inline mini stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-10 mt-20 pt-10 border-t border-[var(--border)]"
        >
          {[
            { val: "1.2M+", label: "Builders worldwide" },
            { val: "94K+", label: "Projects shipped" },
            { val: "150+", label: "Countries represented" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-[var(--purple)]">{val}</p>
              <p className="text-xs text-[var(--text)] opacity-40 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── STORY SECTION ────────────────────────────────────────────────────────────
const STORY = [
  {
    year: "The problem",
    heading: "Great builders were building alone.",
    body: "We saw talented developers, designers, and founders struggling to find each other. The best products aren't solo projects — they're the result of the right people finding each other. Collabsphere was built to make that connection effortless.",
  },
  {
    year: "The mission",
    heading: "Help people build things that matter, together.",
    body: "We believe collaboration is the most powerful force in product development. Our platform is designed to get out of the way and let the right people find each other quickly, then work together meaningfully.",
  },
  {
    year: "The vision",
    heading: "Every great idea deserves a great team.",
    body: "We're building toward a world where no brilliant idea dies because its creator couldn't find the right collaborators. Every developer, every designer, every founder deserves to build their dream team.",
  },
];

function StorySection() {
  return (
    <section className="border-t border-[var(--border)] py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Our story</h2>
        </Reveal>

        <div className="space-y-0 divide-y divide-[var(--border)]">
          {STORY.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.1}>
              <div className="grid md:grid-cols-12 gap-8 py-14">
                <div className="md:col-span-3">
                  <p className="text-xs font-mono font-black tracking-[0.3em] uppercase text-[var(--purple)] mt-1">
                    {item.year}
                  </p>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">
                    {item.heading}
                  </h3>
                  <p className="text-base md:text-lg text-[var(--text)] opacity-50 leading-relaxed max-w-2xl">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHAT WE DO ───────────────────────────────────────────────────────────────
const FEATURES = [
  {
    Icon: Users,
    title: "Find your team",
    desc: "Browse real builders with verified project history. Filter by stack, timezone, and availability. No fluff, just people who build.",
    color: "var(--purple)",
  },
  {
    Icon: Code2,
    title: "Build in public",
    desc: "Post your project, share your progress, attract collaborators organically. Let your work speak — and let the community amplify it.",
    color: "var(--orange)",
  },
  {
    Icon: Rocket,
    title: "Ship together",
    desc: "From first commit to product launch, Collabsphere gives you the tools to stay aligned, move fast, and build things that matter.",
    color: "var(--cyan)",
  },
];

function WhatWeDoSection() {
  return (
    <section className="border-t border-[var(--border)] py-32 bg-[var(--bg-card)]/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal className="mb-20">
          <p className="text-xs font-mono font-black tracking-[0.4em] uppercase text-[var(--purple)] mb-4">What we do</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight max-w-xl leading-tight">
            Everything you need to build with others.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="group p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--purple)]/40 transition-colors duration-300 h-full flex flex-col">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-7"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}33` }}
                >
                  <f.Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-xl font-black mb-3">{f.title}</h3>
                <p className="text-sm text-[var(--text)] opacity-50 leading-relaxed flex-1">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MOBILE SECTION ───────────────────────────────────────────────────────────
function MobileSection() {
  return (
    <section className="border-t border-[var(--border)] py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.1} className="space-y-7">
            <p className="text-xs font-mono font-black tracking-[0.4em] uppercase text-[var(--purple)]">Mobile app</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Your community,<br />in your pocket.
            </h2>
            <p className="text-base md:text-lg text-[var(--text)] opacity-50 leading-relaxed">
              The Collabsphere mobile app keeps you connected to your team and your community everywhere you go. Review projects, respond to collaborators, and stay in the loop — all from your phone.
            </p>
            <ul className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Biometric security — Face ID and fingerprint" },
                { icon: Zap, text: "Real-time notifications and project updates" },
                { icon: Heart, text: "React, comment, and engage with the community" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-[var(--text)] opacity-60">
                  <Icon className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex justify-center">
            <PhoneMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const projects = [
    { label: "Design System", pct: 82, color: "var(--purple)" },
    { label: "API v2.0",      pct: 57, color: "var(--orange)" },
    { label: "iOS Launch",    pct: 94, color: "var(--green)" },
  ];

  const team = [
    { initials: "AW", color: "#6C63FF" },
    { initials: "MK", color: "#00FF94" },
    { initials: "SR", color: "#FF6B35" },
  ];

  return (
    <div className="relative w-[250px] h-[510px] rounded-[42px] border-[6px] bg-[#111]"
      style={{ borderColor: "#2a2a2a", boxShadow: "0 40px 100px rgba(0,0,0,0.45)" }}>

      <div className="absolute inset-0 p-5 space-y-5 overflow-hidden" style={{ background: "linear-gradient(160deg, #1c1c1c 0%, #0d0d0d 100%)" }}>

        {/* Status bar */}
        <div className="flex justify-between items-center px-1 opacity-30">
          <span className="font-mono text-[8px] text-white">9:41</span>
          <div className="w-14 h-3 rounded-full bg-black/60" />
          <div className="flex gap-1">
            {[10, 14, 18].map(h => <div key={h} className="w-1 rounded-full bg-white/60" style={{ height: h }} />)}
          </div>
        </div>

        {/* Greeting */}
        <div>
          <p className="text-[9px] font-medium opacity-30 text-white">Good morning 👋</p>
          <p className="text-base font-black text-white mt-0.5">Welcome back, K.</p>
        </div>

        {/* Team row */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {team.map(t => (
              <div key={t.initials}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-black text-white"
                style={{ background: t.color, borderColor: "#111" }}>
                {t.initials}
              </div>
            ))}
          </div>
          <div>
            <p className="text-[9px] font-bold text-white">Your team</p>
            <p className="text-[8px] opacity-40 text-white">3 active now</p>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-3">
          <p className="text-[9px] font-black uppercase tracking-[3px] opacity-40 text-white">Projects</p>
          {projects.map((p) => (
            <div key={p.label} className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[9px] font-bold text-white/70">{p.label}</span>
                <span className="text-[8px] text-white/30">{p.pct}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: E, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: p.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Notification */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-5 left-4 right-4 flex items-center gap-3 p-3.5 rounded-2xl"
          style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)" }}
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(108,99,255,0.25)" }}>
            <Users className="w-3.5 h-3.5 text-[#6C63FF]" />
          </div>
          <div>
            <p className="text-[8px] font-black text-white/80 leading-none">New match found</p>
            <p className="text-[7px] text-white/40 mt-0.5 leading-none">SR • Full-stack · React · Go</p>
          </div>
        </motion.div>
      </div>

      {/* Screen glare */}
      <div className="absolute inset-0 rounded-[36px] pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }} />
    </div>
  );
}

// ─── VALUES ───────────────────────────────────────────────────────────────────
const VALUES = [
  {
    Icon: Heart,
    title: "Community first",
    desc: "We build for builders. Every decision we make starts with what's best for the people who use Collabsphere every day.",
  },
  {
    Icon: ShieldCheck,
    title: "Trust & safety",
    desc: "Real profiles, real project history, real humans. We maintain quality over quantity to keep our community valuable.",
  },
  {
    Icon: Globe,
    title: "Borderless by design",
    desc: "Great collaboration doesn't care about geography. We're built for a global community of makers from day one.",
  },
  {
    Icon: Zap,
    title: "Bias for shipping",
    desc: "We celebrate building and shipping. Progress over perfection. Done is better than perfect. Ship and iterate.",
  },
];

function ValuesSection() {
  return (
    <section className="border-t border-[var(--border)] py-32 bg-[var(--bg-card)]/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal className="mb-20">
          <p className="text-xs font-mono font-black tracking-[0.4em] uppercase text-[var(--purple)] mb-4">Our values</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            What we stand for.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-0 border border-[var(--border)]">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group p-10 border-r border-b border-[var(--border)] hover:bg-[var(--text)]/[0.02] transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[var(--purple)]/10 border border-[var(--purple)]/20 flex items-center justify-center mb-6">
                  <v.Icon className="w-4 h-4 text-[var(--purple)]" />
                </div>
                <h3 className="text-xl font-black mb-3 tracking-tight">{v.title}</h3>
                <p className="text-sm text-[var(--text)] opacity-50 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── JOIN SECTION ─────────────────────────────────────────────────────────────
function JoinSection() {
  return (
    <section className="border-t border-[var(--border)] py-40">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <Reveal className="space-y-8">
          <h2 className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[0.88]">
            Ready to build<br />
            <span className="text-[var(--purple)]">something great?</span>
          </h2>
          <p className="text-lg text-[var(--text)] opacity-50 max-w-md mx-auto">
            Join over 1.2 million builders already using Collabsphere to find their teams and ship extraordinary products.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[var(--text)] text-[var(--bg)] font-bold rounded-full hover:opacity-90 transition-opacity"
            >
              Create your profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-10 py-5 border border-[var(--border)] rounded-full hover:border-[var(--text)] transition-colors font-medium"
            >
              Browse projects
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
