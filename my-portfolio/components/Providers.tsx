"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </MotionConfig>
    </SessionProvider>
  );
}
