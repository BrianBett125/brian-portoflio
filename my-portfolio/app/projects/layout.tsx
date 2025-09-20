import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects and work highlights by Brian Bett.",
  openGraph: {
    title: "Brian Bett – Projects",
    description: "Explore a selection of projects built by Brian Bett, showcasing various technologies and skills.",
    url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}