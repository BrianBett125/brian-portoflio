"use client";

import { SessionProvider } from "next-auth/react";

export default function AnalyticsSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
