import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software engineering projects by Brian Bett, including Java, backend systems, APIs, Django applications, developer platforms, and automation tools.",
  alternates: {
    canonical: getCanonicalUrl("/projects"),
  },
  openGraph: {
    title: "Brian Bett – Projects",
    description:
      "Explore projects built by Brian Bett across Java, backend systems, APIs, Django applications, developer platforms, and automation tools.",
    url: getCanonicalUrl("/projects"),
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
