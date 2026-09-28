"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Code2, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  longDescription: string;
  link: string;
  liveUrl: string;
  img: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "DownTheGap",
    description: "High-performance decentralized execution engine optimized for low-latency operations.",
    tags: ["C#", "Next.js", "Web3.js", "Tailwind"],
    longDescription: "DownTheGap is engineered to process massive multi-chain data feeds in real-time. Built with a robust C# backend architecture and a high-frequency Next.js dashboard, it delivers sub-millisecond visualization vectors and state management for high-throughput environments.",
    link: "https://github.com",
    liveUrl: "https://example.com",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Neon Genesis",
    description: "Immersive WebGL portfolio and spatial interface with custom shader pipelines.",
    tags: ["React", "Three.js", "GSAP", "GLSL"],
    longDescription: "An experimental cyber-brutalist interface exploring spatial typography and real-time lighting shaders. Features custom procedural noise distortion fields and optimized scroll-scrubbed physics pipelines.",
    link: "https://github.com",
    liveUrl: "https://example.com",
    img: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Void Interface",
    description: "Secure, distributed systems telemetry monitor for cloud-native infrastructure.",
    tags: ["TypeScript", "Node.js", "Python", "Docker"],
    longDescription: "A comprehensive developer tooling suite designed to track cluster states, memory leakage patterns, and live network packets through a clean, brutalist telemetry dashboard.",
    link: "https://github.com",
    liveUrl: "https://example.com",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll and disable ScrollTrigger while modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      ScrollTrigger.getAll().forEach((st) => st.disable(false));
    } else {
      document.body.style.overflow = "auto";
      ScrollTrigger.getAll().forEach((st) => st.enable());
      ScrollTrigger.refresh();
    }
  }, [selectedProject]);

  useGSAP(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const pinTween = gsap.to(slider, {
      x: () => -(slider.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + slider.scrollWidth,
        invalidateOnRefresh: true,
      }
    });

    const images = gsap.utils.toArray<HTMLImageElement>(".parallax-img");
    images.forEach((img) => {
      gsap.to(img, {
        x: 150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + slider.scrollWidth,
          scrub: 1,
        }
      });
    });

    return () => {
      pinTween.kill();
    };
  }, { scope: sectionRef });

  const setHoverState = (hover: boolean) => {
    window.dispatchEvent(new CustomEvent("cursor-hover", { detail: { hover } }));
  };

  return (
    <>
      <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-[#050505] relative z-10 border-t border-neutral-900 flex items-center">
        <div 
          ref={sliderRef} 
          className="flex h-full items-center px-6 sm:px-[10vw] gap-6 sm:gap-[10vw]"
          style={{ width: `${projects.length * 100}vw` }}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="w-[85vw] sm:w-[70vw] h-[65vh] sm:h-[70vh] shrink-0 relative flex flex-col justify-end p-6 sm:p-10 md:p-14 group overflow-hidden cursor-pointer border border-neutral-800/80 bg-black/40 backdrop-blur-sm"
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 -z-10">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="parallax-img absolute top-0 -left-16 sm:-left-24 w-[calc(100%+120px)] sm:w-[calc(100%+200px)] h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-[#00F0FF] text-sm sm:text-xl">// {proj.id}</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {proj.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="font-mono text-[10px] sm:text-xs uppercase bg-neutral-900/90 border border-neutral-800 px-2.5 py-1 text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-3 sm:mb-4 group-hover:text-[#00F0FF] transition-colors duration-300">
                  {proj.title}
                </h2>

                <p className="font-mono text-neutral-400 text-xs sm:text-sm md:text-base max-w-lg line-clamp-2">
                  {proj.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[85vh] flex flex-col bg-[#080808] border border-neutral-800 shadow-2xl shadow-cyan-950/20 overflow-hidden pointer-events-auto"
            >
              {/* Sticky Top Header */}
              <div className="flex items-center justify-between p-5 sm:p-8 border-b border-neutral-800/80 bg-[#080808] z-20 shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 font-mono text-[#00F0FF] text-xs sm:text-sm">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>CASE STUDY // {selectedProject.id}</span>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 sm:p-2.5 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div 
                className="p-5 sm:p-8 md:p-10 overflow-y-auto overscroll-contain flex-1 space-y-6 touch-pan-y"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
                  {selectedProject.title}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="font-mono text-xs uppercase bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative w-full h-44 sm:h-64 md:h-80 overflow-hidden border border-neutral-800 shrink-0">
                  <img
                    src={selectedProject.img}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-mono text-neutral-500 uppercase tracking-widest text-xs mb-2">Overview & Architecture</h3>
                  <p className="font-mono text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>
              </div>

              {/* Sticky Bottom Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-6 border-t border-neutral-800 bg-[#080808] z-20 shrink-0">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-widest bg-neutral-900 border border-neutral-700 text-white px-6 py-3.5 hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-4 h-4 text-[#00F0FF]" />
                </a>

                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-widest bg-[#00F0FF] text-black px-6 py-3.5 hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
                >
                  <span>Visit Live Site</span>
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}