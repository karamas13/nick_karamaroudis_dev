"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Fast entrance animation (replaces Framer Motion delay to fix LCP)
    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
      }
    );

    // Parallax fade, scale, and blur out on scroll
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
    <section 
      ref={container} 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] z-10 px-4 sm:px-8"
    >
      {/* 1. Subtle particle/noise gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#050505_20%,transparent_95%)] pointer-events-none -z-10 opacity-90" />

      {/* 2. Dark Radial Vignette Plate */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#050505_20%,transparent_100%)] pointer-events-none -z-10 opacity-90" />

      {/* Main Heading (Instant paint for optimal LCP score) */}
      <h1 
        ref={textRef} 
        className="text-5xl sm:text-7xl md:text-[9vw] font-black uppercase tracking-tighter leading-none flex flex-wrap justify-center overflow-visible drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] max-w-7xl text-center will-change-transform"
      >
        {title.map((char, index) => (
          <span
            key={index}
            className="inline-block text-white"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      
      {/* Subtitle */}
      <p className="font-mono text-neutral-400 mt-8 tracking-widest text-xs sm:text-sm md:text-base relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center">
        SCROLL TO EXPLORE MY PORTFOLIO
      </p>
    </section>
  );
}