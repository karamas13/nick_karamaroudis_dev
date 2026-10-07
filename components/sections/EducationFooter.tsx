"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa6";

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
    <footer className="fixed bottom-0 left-0 w-full h-screen bg-[#020202] text-white -z-10 flex flex-col items-center justify-center overflow-hidden px-4">
      
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

      {/* Main Content Container */}
      <div className="relative z-10 text-center flex flex-col items-center">
        
        {/* Title / Role */}
        <p className="font-mono font-bold mb-4 sm:mb-6 text-[#00F0FF] tracking-[0.3em] sm:tracking-[0.5em] text-xs sm:text-xl uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
          SOFTWARE ENGINEER
        </p>
        
        {/* Main Header */}
        <div 
          className="group cursor-pointer mb-8 sm:mb-12"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("cursor-hover", { detail: { hover: true } }))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("cursor-hover", { detail: { hover: false } }))}
        >
          <h1 className="flex flex-col text-[10vw] sm:text-[11vw] font-black uppercase leading-[0.85] tracking-tighter">
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

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 z-20">
          <a
            href="https://www.linkedin.com/in/nikos-karamaroudis-06676a233/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-3 font-mono text-xs sm:text-sm uppercase font-bold tracking-widest text-neutral-300 bg-[#050505]/80 backdrop-blur-md border border-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:-translate-y-1 cursor-pointer"
          >
            <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5 text-[#00F0FF] transition-transform duration-300 group-hover/btn:scale-110" />
            <span>LINKEDIN</span>
          </a>

          <a
            href="https://github.com/karamas13"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-3 font-mono text-xs sm:text-sm uppercase font-bold tracking-widest text-neutral-300 bg-[#050505]/80 backdrop-blur-md border border-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 hover:border-[#B026FF] hover:text-[#B026FF] hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] hover:-translate-y-1 cursor-pointer"
          >
            <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-[#B026FF] transition-transform duration-300 group-hover/btn:scale-110" />
            <span>GITHUB</span>
          </a>

          <a
            href="mailto:your.email@gmail.com"
            className="group/btn relative inline-flex items-center gap-3 font-mono text-xs sm:text-sm uppercase font-bold tracking-widest text-neutral-300 bg-[#050505]/80 backdrop-blur-md border border-neutral-800 px-5 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 hover:border-[#FF0055] hover:text-[#FF0055] hover:shadow-[0_0_20px_rgba(255,0,85,0.3)] hover:-translate-y-1 cursor-pointer"
          >
            <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0055] transition-transform duration-300 group-hover/btn:scale-110" />
            <span>GMAIL</span>
          </a>
        </div>

          
        </div>

      
      
      {/* Bottom Data Bar */}
      <div className="absolute bottom-6 sm:bottom-10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-6 md:px-12 font-mono text-xs md:text-sm font-bold text-neutral-500 z-10 text-center sm:text-left">
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