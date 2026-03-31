"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { Github, Menu, X, Star } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 1)"]
  );
  
  const borderOpacity = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.06)"]
  );

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Community", href: "/community" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <motion.nav
      style={{
        backgroundColor,
        borderBottom: `1px solid ${borderOpacity}`,
      }}
      className="fixed top-0 left-0 right-0 z-[100] h-20 flex items-center transition-expo"
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-display font-bold tracking-tight text-white transition-expo group-hover:scale-105">
            Collab<span className="text-[#6C63FF]">sphere</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-tight text-white/70 hover:text-[#6C63FF] transition-expo"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-6 border-l border-white/10 pl-6">
            <Link
              href="https://github.com"
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-[#6C63FF] transition-expo"
            >
              <Star size={16} className="text-[#FFE135]" />
              <span className="font-mono">1.2k</span>
            </Link>
            <GradientButton variant="primary" size="sm" className="rounded-full px-6">
              Start Building →
            </GradientButton>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden fixed inset-0 top-20 bg-[#0A0A0F] z-[99] p-8 flex flex-col gap-8"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={link.href}
                className="text-3xl font-display font-bold text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 pt-8 border-t border-white/10 flex flex-col gap-6"
          >
            <Link
              href="https://github.com"
              className="flex items-center gap-3 text-xl font-bold text-white/70"
            >
              <Github />
              <span>GitHub (1.2k stars)</span>
            </Link>
            <GradientButton variant="primary" size="lg" className="w-full">
              Start Building →
            </GradientButton>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}
