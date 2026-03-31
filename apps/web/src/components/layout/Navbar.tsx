"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { Github, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.8)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 80],
    ["blur(0px)", "blur(12px)"]
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
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
        backdropFilter: backdropBlur,
        borderBottom: `1px solid ${borderOpacity}`,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold tracking-tight text-white">
            Collab<span className="text-primary italic">sphere</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="https://github.com"
            target="_blank"
            className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <Github size={18} />
            <span>GitHub</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <GradientButton variant="primary" size="sm">
            Start Building →
          </GradientButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-[#0A0A0F] border-b border-white/10 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-white/70"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="https://github.com"
            target="_blank"
            className="flex items-center gap-2 text-lg font-medium text-white/70"
          >
            <Github />
            <span>GitHub</span>
          </Link>
          <GradientButton variant="primary" size="lg" className="w-full">
            Start Building →
          </GradientButton>
        </motion.div>
      )}
    </motion.nav>
  );
}
