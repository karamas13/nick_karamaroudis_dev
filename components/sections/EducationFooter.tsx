"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EducationFooter() {
  // Generate random particles (stars) for the space background
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 75 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 w-full h-screen bg-[#020202] text-white -z-10 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. Deep Space Nebula Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-[#11052C] via-[#050505] to-[#050505] z-0 opacity-80" />
      
      {/* 2. Interactive Starfield */}
      <div className="absolute inset-0 z-0 opacity-60">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -30],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3. Cyber-Grid Perspective Overlay (Masked to center) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0" />

      {/* Main Content */}
      <div 
        className="relative z-10 text-center group cursor-pointer"
        onMouseEnter={() => window.dispatchEvent(new CustomEvent("cursor-hover", { detail: { hover: true } }))}
        onMouseLeave={() => window.dispatchEvent(new CustomEvent("cursor-hover", { detail: { hover: false } }))}
      >
        <p className="font-mono font-bold mb-6 text-[#00F0FF] tracking-[0.5em] text-sm uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
          // SOFTWARE ENGINEER
        </p>
        
        <h1 className="flex flex-col text-[11vw] font-black uppercase leading-[0.85] tracking-tighter">
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-neutral-500 group-hover:text-white transition-colors duration-500">
            NIKOS
          </span>
          <span 
            className="text-transparent group-hover:text-[#B026FF] transition-colors duration-500"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
          >
            KARAMAROUDIS
          </span>
        </h1>
      </div>
      
      {/* Bottom Data Bar */}
      <div className="absolute bottom-10 w-full flex justify-between px-6 md:px-12 font-mono text-xs md:text-sm font-bold text-neutral-500 z-10">
        <span className="uppercase tracking-widest hover:text-white transition-colors duration-300">
          © 2026 // Software Engineer
        </span>
        <span className="uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
          Corinth // Greece // Global
        </span>
      </div>

    </footer>
  );
}