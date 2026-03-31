"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Star } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0F] border-t-8 border-[#0A0A0F] pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Simple Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <span className="text-[13px] font-medium text-[#5A5A6E] italic">
                 &copy; {currentYear} MIT Licensed · Open Source · Made by builders.
              </span>
           </div>

           <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-[12px] font-mono font-bold text-[#8B8B9E] hover:text-white transition-colors"
              >
                PRIVACY POLICY
              </Link>
              <Link 
                href="/terms" 
                className="text-[12px] font-mono font-bold text-[#8B8B9E] hover:text-white transition-colors"
              >
                TERMS OF SERVICE
              </Link>
              
              <Link 
                href="https://github.com/Keerthanreddy01/Collabsphere"
                target="_blank"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-full text-[12px] font-mono font-bold text-[#6C63FF] hover:bg-[#6C63FF]/20 hover:scale-105 transition-all"
              >
                 <Star size={14} className="fill-[#6C63FF]" />
                 Starred on GitHub <span className="text-white/40 font-normal ml-1">1.2k</span>
              </Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
