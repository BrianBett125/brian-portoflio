import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import Testimonials from "@/components/Testimonials";
import { getProjects } from "@/lib/projects";
import { testimonialsData } from "@/lib/testimonialsData";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home",
    description: "Welcome to Brian Bett's portfolio. Discover my projects, blog posts, and learn more about me.",
    openGraph: {
      title: "Brian Bett – Home",
      description: "Welcome to Brian Bett's portfolio. Discover my projects, blog posts, and learn more about me.",
      url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
      siteName: "Brian Bett Portfolio",
      locale: "en_US",
      type: "website",
    },
  };
};

export default async function Home() {
  const projects = await getProjects();
  return (
    <div className="space-y-12">
      <HeroSection />

      <Testimonials testimonials={testimonialsData} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Featured Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
