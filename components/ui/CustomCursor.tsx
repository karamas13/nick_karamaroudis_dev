"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Only enable cursor logic on devices with a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    if (!mediaQuery.matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsHovering(customEvent.detail.hover);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("cursor-hover", handleCustomEvent);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("cursor-hover", handleCustomEvent);
    };
  }, []);

  // Do not render anything if the device lacks a fine pointer (mouse/trackpad)
  if (!isPointerDevice) return null;

  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 z-10000 pointer-events-none items-center justify-center rounded-full mix-blend-difference bg-white text-black font-bold uppercase tracking-widest"
      animate={{
        x: mousePosition.x - (isHovering ? 60 : 8),
        y: mousePosition.y - (isHovering ? 60 : 8),
        width: isHovering ? 120 : 16,
        height: isHovering ? 120 : 16,
        opacity: mousePosition.x === -100 ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {isHovering ? <span className="text-[10px]">View Case</span> : null}
    </motion.div>
  );
}