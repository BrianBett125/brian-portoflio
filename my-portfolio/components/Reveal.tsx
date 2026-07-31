"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Extra classes forwarded to the wrapper. */
  className?: string;
};

/**
 * Scroll-reveal wrapper for below-fold content.
 *
 * Animates opacity + a small upward shift the first time the element scrolls
 * into view. When the user has `prefers-reduced-motion: reduce` set, it renders
 * the content statically with no transform or fade, so nothing moves.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
