"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const skillsRow1 = ["C#", "FRAMER MOTION", "JAVASCRIPT", "SQL", "GIT"];
const skillsRow2 = ["REACT", "NEXT.JS", "TAILWIND", "NODE.JS", "TYPESCRIPT"];

export default function TechnicalSkills() {
  const container = useRef<HTMLDivElement>(null);
  const [isAssembled, setIsAssembled] = useState(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tags = gsap.utils.toArray<HTMLElement>(".skill-tag");
      
      // Random starting positions (chaos) - adjusted for mobile safety
      tags.forEach(tag => {
        gsap.set(tag, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-150, 150),
          rotation: gsap.utils.random(-45, 45),
          opacity: 0,
        });
      });

      // Assemble to marquee rows
      gsap.to(tags, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.015,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
          onLeave: () => setIsAssembled(true),
          onEnterBack: () => setIsAssembled(false),
        },
      });
    }, container);

    return () => ctx.revert();
  }, { scope: container });

  return (
    <section ref={container} className="relative z-10 py-24 sm:py-32 min-h-[80vh] flex flex-col justify-center overflow-hidden border-t border-neutral-900">
      <div className={`flex flex-col gap-6 sm:gap-8 w-full transition-all duration-700 ${isAssembled ? 'opacity-100' : ''}`}>
        
        {/* Row 1 - Marquee Left */}
        <div className="flex overflow-x-hidden w-full py-2">
          <div className={`flex gap-4 sm:gap-8 w-max shrink-0 ${isAssembled ? 'animate-marquee-left' : ''}`}>
            {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, i) => (
              <div 
                key={i} 
                className="skill-tag font-mono text-xl sm:text-3xl md:text-7xl font-bold text-purple-500 border border-purple-800/80 bg-[#050505]/80 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 uppercase drop-shadow-[0_0_15px_rgba(141,32,222,0.8)] shadow-lg shadow-purple-950/20 whitespace-nowrap"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Marquee Right */}
        <div className="flex overflow-x-hidden w-full py-2">
          <div className={`flex gap-4 sm:gap-8 w-max shrink-0 ${isAssembled ? 'animate-marquee-right' : ''}`}>
            {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, i) => (
              <div 
                key={i} 
                className="skill-tag font-mono text-xl sm:text-3xl md:text-7xl font-bold text-[#00F0FF] border border-[#00F0FF]/40 bg-[#050505]/80 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] shadow-lg shadow-cyan-950/20 whitespace-nowrap"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}