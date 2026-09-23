"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
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
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("cursor-hover", handleCustomEvent);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-10000 pointer-events-none flex items-center justify-center rounded-full mix-blend-difference bg-white text-black font-bold uppercase tracking-widest"
      animate={{
        x: mousePosition.x - (isHovering ? 60 : 8),
        y: mousePosition.y - (isHovering ? 60 : 8),
        width: isHovering ? 120 : 16,
        height: isHovering ? 120 : 16,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {isHovering ? <span className="text-[10px]">View Case</span> : null}
    </motion.div>
  );
}