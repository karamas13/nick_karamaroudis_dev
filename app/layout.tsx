import type { Metadata } from "next";
import { Space_Mono } from "next/font/google"; 
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-space' });

export const metadata: Metadata = {
  title: "Software Engineer | Portfolio",
  description: "High-End Cyber-Brutalist Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="antialiased selection:bg-[#00F0FF] selection:text-black">
        <div className="noise-overlay" />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}