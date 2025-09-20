import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects and work highlights by Brian Bett.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}