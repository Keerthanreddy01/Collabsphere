import { Navbar } from "@/components/layout/Navbar";
import { LandingContent } from "@/components/sections/LandingContent";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] selection:bg-[#6C63FF]/30 transition-colors duration-500">
      <Navbar />

      <main className="flex-grow">
        <LandingContent />
      </main>
    </div>
  );
}
