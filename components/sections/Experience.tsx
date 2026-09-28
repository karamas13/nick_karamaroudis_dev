"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const jobs = [
  { year: "2020-2024", role: "Comp Sci Student", company: "Democritus University of Thrace" },
  { year: "MARCH 2025 - MARCH 2026", role: "Private / IT Support", company: "Hellenic Army" },
  { year: "2026", role: "Freelance Software Engineer", company: "Freelance" },
];

export default function Experience() {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");

    // Draw Neon Line
    gsap.fromTo(lineRef.current,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Reveal and Blur Nodes - Adjusted triggers to unblur earlier in the viewport
    nodes.forEach((node, i) => {
      const isLast = i === nodes.length - 1;
      
      gsap.fromTo(node, 
        { opacity: 0.2, filter: "blur(10px)", x: -30 },
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          }
        }
      );

      if (!isLast) {
        gsap.to(node, {
          opacity: 0.2,
          filter: "blur(5px)",
          scrollTrigger: {
            trigger: node,
            start: "bottom 20%",
            end: "bottom 5%",
            scrub: true,
          }
        });
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative z-10 py-24 sm:py-40 max-w-4xl mx-auto px-4 sm:px-8">
      {/* Neon Timeline SVG - Responsive Positioning */}
      <svg className="absolute left-[19px] sm:left-[49px] top-0 h-full w-2" preserveAspectRatio="none">
        <path
          ref={lineRef}
          d="M 1 0 V 4000"
          stroke="#B026FF"
          strokeWidth="2"
          fill="none"
          className="drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]"
        />
      </svg>

      <div className="flex flex-col gap-16 sm:gap-32">
        {jobs.map((job, idx) => (
          <div key={idx} className="timeline-node flex items-start gap-6 sm:gap-12 relative z-10">
            {/* Timeline Dot */}
            <div className="w-3.5 h-3.5 sm:w-6 sm:h-6 rounded-full bg-[#B026FF] shadow-[0_0_15px_#B026FF] mt-2 sm:mt-2.5 shrink-0 ml-0.5 sm:ml-0" />
            
            {/* Glassmorphism plate isolating text from the glowing timeline line */}
            <div className="bg-black/60 p-5 sm:p-6 backdrop-blur-md border border-neutral-800/80 w-full shadow-xl">
              <p className="font-mono text-[#00F0FF] text-xs sm:text-base mb-2">{job.year}</p>
              <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tight">{job.role}</h3>
              <p className="font-mono text-neutral-400 mt-2 text-sm sm:text-xl">{job.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}