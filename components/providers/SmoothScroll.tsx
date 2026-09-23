"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis frame updates with GSAP's ticker
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false} // Prevents duplicate RAF loops since GSAP ticker handles rendering
      options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}