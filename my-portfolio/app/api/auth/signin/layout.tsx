import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Dashboard sign in",
  description: "Sign in to the private portfolio analytics dashboard.",
  robots: { index: false, follow: false },
  alternates: { canonical: getCanonicalUrl("/api/auth/signin") },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
