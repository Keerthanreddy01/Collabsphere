import type { Metadata } from "next";
import { Space_Grotesk, Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { MouseGlow } from "@/components/shared/MouseGlow";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollabSphere | Where Builders Find Their People.",
  description: "CollabSphere is the professional networking and project collaboration platform for developers, designers, and tech builders.",
  keywords: ["developer", "builder", "collaboration", "projects", "startup", "open source"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} ${inter.variable} ${jetbrainsMono.variable} font-inter antialiased selection:bg-primary/20 bg-[#0A0A0F] text-white overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="fixed inset-0 z-0 bg-[#0A0A0F] pointer-events-none" />
            <div className="fixed inset-0 z-0 dot-grid pointer-events-none opacity-40" />
            
            <MouseGlow />
            
            <main className="relative z-[1] min-h-screen">
              {children}
            </main>
            <Toaster position="top-center" expand={true} richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
