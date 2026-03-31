import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientButton } from "@/components/ui/GradientButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Github, MessageSquare, Heart, Shield } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]">
      <Navbar />
      
      <main className="flex-grow pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 tracking-tight">
              A community of builders <span className="text-primary italic">helping builders.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#8B8B9E] max-w-2xl mx-auto leading-relaxed">
              We're building more than a platform. We're building the future of how software is collaborated on globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <GlassCard>
              <Github className="text-primary mb-6" size={40} />
              <h3 className="text-3xl font-bold text-white mb-4">GitHub Discussions</h3>
              <p className="text-[#8B8B9E] mb-8 leading-relaxed">
                Our main community hub. Ask questions, propose features, and share your latest projects with the world.
              </p>
              <GradientButton variant="ghost">Join Discussions →</GradientButton>
            </GlassCard>

            <GlassCard>
              <MessageSquare className="text-secondary mb-6" size={40} />
              <h3 className="text-3xl font-bold text-white mb-4">Open Dev Q&A</h3>
              <p className="text-[#8B8B9E] mb-8 leading-relaxed">
                Stuck on a bug? Need an architecture review? Our senior community members are here to help you move forward.
              </p>
              <GradientButton variant="ghost">Post a Question →</GradientButton>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-white/5 pt-32">
            <div>
              <Heart className="text-primary mx-auto mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-4">Be Helpful</h4>
              <p className="text-sm text-[#8B8B9E] leading-relaxed">
                We're all here to grow. Share what you know and help others overcome their technical hurdles.
              </p>
            </div>
            <div>
              <Shield className="text-secondary mx-auto mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-4">Safe & Inclusive</h4>
              <p className="text-sm text-[#8B8B9E] leading-relaxed">
                A respectful environment for builders of all skill levels. Zero tolerance for harassment or noise.
              </p>
            </div>
            <div>
              <Github className="text-white mx-auto mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-4">Build in Public</h4>
              <p className="text-sm text-[#8B8B9E] leading-relaxed">
                Transparency breeds excellence. Share your process, your failures, and your wins.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
