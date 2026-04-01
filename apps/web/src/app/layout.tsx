import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-transparent text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            {/* GLOBAL WRAPPER: BIND THE THEME COLOR VARIABLES HERE */}
            <div className="relative z-[1] min-h-screen transition-colors duration-500">
               {children}
            </div>
            
            
            <Toaster position="top-center" expand={true} richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
