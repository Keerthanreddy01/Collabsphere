"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Star } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "PLATFORM",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Changelog", href: "/changelog" },
        { name: "Open Source", href: "/oss" }
      ]
    },
    {
      title: "COMMUNITY",
      links: [
        { name: "GitHub Discussions", href: "https://github.com/Keerthanreddy01/Collabsphere/discussions" },
        { name: "Contributing", href: "/contributing" },
        { name: "Security", href: "/security" },
        { name: "Roadmap", href: "/roadmap" }
      ]
    },
    {
      title: "COMPANY",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy", href: "/privacy" }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#0A0A0F] border-t border-[#6C63FF]/15 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-display font-extrabold italic tracking-tight text-white transition-expo group-hover:scale-105">
                Collab<span className="text-[#6C63FF]">sphere</span>
              </span>
            </Link>

            <p className="text-[14px] text-[#5A5A6E] font-medium max-w-[280px] leading-relaxed italic">
               Where builders find their people. One platform to recruit, coordinate, and ship.
            </p>

            <div className="flex items-center gap-4">
               {[
                 { icon: <Github size={18} />, href: "https://github.com" },
                 { icon: <Twitter size={18} />, href: "https://twitter.com" },
                 { icon: <Linkedin size={18} />, href: "https://linkedin.com" }
               ].map((social, i) => (
                 <Link 
                   key={i}
                   href={social.href}
                   target="_blank"
                   className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white hover:border-[#6C63FF] hover:bg-[#6C63FF]/10 transition-expo"
                 >
                   {social.icon}
                 </Link>
               ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((column) => (
              <div key={column.title} className="space-y-6">
                <h4 className="text-[11px] font-mono font-bold tracking-[2px] text-[#5A5A6E] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                       <Link 
                         href={link.href} 
                         className="text-[14px] font-medium text-[#8B8B9E] hover:text-white transition-colors"
                       >
                         {link.name}
                       </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="text-[13px] font-medium text-[#5A5A6E] italic">
              &copy; {currentYear} MIT Licensed · Open Source · Made by builders.
           </p>

           <Link 
             href="https://github.com/Keerthanreddy01/Collabsphere"
             target="_blank"
             className="flex items-center gap-2 px-5 py-2.5 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-full text-[12px] font-mono font-bold text-[#6C63FF] hover:bg-[#6C63FF]/20 hover:scale-105 transition-expo"
           >
              <Star size={14} className="fill-[#6C63FF]" />
              Starred on GitHub <span className="text-white/40 font-normal ml-1">1.2k</span>
           </Link>
        </div>
      </div>
    </footer>
  );
}
