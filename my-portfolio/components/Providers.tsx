"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { usePlausible } from "next-plausible";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

function PlausibleEvents() {
  const plausible = usePlausible();
  const pathname = usePathname();

  useEffect(() => {
    plausible("pageview", { props: { path: pathname } });
  }, [pathname, plausible]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <PlausibleEvents />
        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  );
}