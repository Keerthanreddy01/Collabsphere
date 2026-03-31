import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 tracking-tight">
              Everything you need to <span className="text-primary italic">build together.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#8B8B9E] max-w-3xl mx-auto leading-relaxed mb-16">
              Collabsphere provides the technical and social infrastructure for modern developer collaboration. From idea to launch.
            </p>
          </div>
        </section>

        <FeatureGrid />
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
