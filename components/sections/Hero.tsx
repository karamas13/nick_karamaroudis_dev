"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Parallax fade and scale out on scroll
    gsap.to(textRef.current, {
      scale: 3,
      opacity: 0,
      filter: "blur(20px)",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: container });

  const title = "Welcome".split("");

  return (
    <section ref={container} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] z-10 px-4 sm:px-8">
      {/* 1. Subtle particle/noise gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#050505_20%,transparent_95%)] pointer-events-none -z-10 opacity-90" />

      {/* 2. Dark Radial Vignette Plate (Isolates text for high legibility) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#050505_20%,transparent_100%)] pointer-events-none -z-10 opacity-90" />

      {/* Main Heading Mask (Responsive wrapping & text sizing) */}
      <h1 ref={textRef} className="text-5xl sm:text-7xl md:text-[9vw] font-black uppercase tracking-tighter leading-none flex flex-wrap justify-center overflow-visible drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] max-w-7xl text-center">
        {title.map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.03, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>
      
      {/* Subtitle with contrast protection & responsive text sizing */}
      <p className="font-mono text-neutral-400 mt-8 tracking-widest text-xs sm:text-sm md:text-base relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center">
        SCROLL TO EXPLORE MY PORTFOLIO
      </p>
    </section>
  );
}