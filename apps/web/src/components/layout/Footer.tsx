"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Star } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0F] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-display font-bold tracking-tight text-white">
              Collab<span className="text-primary italic">sphere</span>
            </span>
          </Link>
          <p className="text-[#8B8B9E] max-w-sm mb-8 leading-relaxed">
            The professional network for builders. Post your project, find your stack match, and ship together. Built for developers by developers.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/20 transition-colors">
              <Github size={18} />
            </Link>
            <Link href="https://twitter.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/20 transition-colors">
              <Twitter size={18} />
            </Link>
            <Link href="https://linkedin.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/20 transition-colors">
              <Linkedin size={18} />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#8B8B9E] mb-6">Platform</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/features" className="text-white/60 hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="/pricing" className="text-white/60 hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/changelog" className="text-white/60 hover:text-primary transition-colors">Changelog</Link></li>
            <li><Link href="/oss" className="text-white/60 hover:text-primary transition-colors">Open Source</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#8B8B9E] mb-6">Community</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="https://github.com" className="text-white/60 hover:text-primary transition-colors">GitHub Discussions</Link></li>
            <li><Link href="/contributing" className="text-white/60 hover:text-primary transition-colors">Contributing</Link></li>
            <li><Link href="/security" className="text-white/60 hover:text-primary transition-colors">Security</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#8B8B9E] mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/about" className="text-white/60 hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="text-white/60 hover:text-primary transition-colors">Engineering Blog</Link></li>
            <li><Link href="/contact" className="text-white/60 hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-sm text-[#8B8B9E] font-medium flex gap-4">
          <span>MIT Licensed</span>
          <span className="w-1 h-1 bg-white/10 my-auto rounded-full" />
          <span>Open Source</span>
          <span className="w-1 h-1 bg-white/10 my-auto rounded-full" />
          <span>Made by builders for builders</span>
        </div>
        
        <Link href="https://github.com" target="_blank" className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full flex items-center gap-2 group transition-all duration-300">
          <Star size={16} className="text-primary group-hover:fill-primary" />
          <span className="text-xs font-mono font-bold text-primary">Starred on GitHub 1.2k</span>
        </Link>
      </div>
    </footer>
  );
}
