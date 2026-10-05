"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-150);
  const cursorY = useMotionValue(-150);

  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      // 150px offset to center the 300px glow around the cursor tip
      cursorX.set(e.clientX - 150);
      cursorY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-30 h-[300px] w-[300px] rounded-full blur-2xl md:block hidden"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}
