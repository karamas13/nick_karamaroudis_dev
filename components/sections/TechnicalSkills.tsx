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
      
      // Random starting positions (chaos)
      tags.forEach(tag => {
        gsap.set(tag, {
          x: gsap.utils.random(-400, 400),
          y: gsap.utils.random(-400, 400),
          rotation: gsap.utils.random(-90, 90),
          opacity: 0,
        });
      });

      // Assemble to grid
      gsap.to(tags, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.02,
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
    <section ref={container} className="relative z-10 py-32 min-h-screen flex flex-col justify-center overflow-hidden border-t border-neutral-900">
      <div className={`flex flex-col gap-8 w-[200vw] transition-all duration-700 ${isAssembled ? 'opacity-100' : ''}`}>
        
        {/* Row 1 - Marquee Left */}
        <div className={`flex gap-8 w-max ${isAssembled ? 'animate-marquee-left' : ''}`}>
          {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, i) => (
            <div 
              key={i} 
              className="skill-tag font-mono text-4xl md:text-7xl font-bold text-purple-500 border border-purple-800/80 bg-[#050505]/80 backdrop-blur-sm px-8 py-4 uppercase drop-shadow-[0_0_15px_rgba(141,32,222,0.8)] shadow-lg shadow-purple-950/20"
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Row 2 - Marquee Right */}
        <div className={`flex gap-8 w-max ${isAssembled ? 'animate-marquee-right' : ''}`}>
          {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, i) => (
            <div 
              key={i} 
              className="skill-tag font-mono text-4xl md:text-7xl font-bold text-[#00F0FF] border border-[#00F0FF]/40 bg-[#050505]/80 backdrop-blur-sm px-8 py-4 uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] shadow-lg shadow-cyan-950/20"
            >
              {skill}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}