"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "framer-motion";
import CommandPalette from "@/components/CommandPalette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        {children}
        {process.env.VERCEL && <Analytics />}
        <CommandPalette />
      </ThemeProvider>
    </MotionConfig>
  );
}
