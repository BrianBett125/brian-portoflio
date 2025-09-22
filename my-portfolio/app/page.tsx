import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import Testimonials from "@/components/Testimonials";
import { getProjects } from "@/lib/projects";
import { testimonialsData } from "@/lib/testimonialsData";
import type { Metadata } from "next";
import { motion } from "framer-motion";

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

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default async function Home() {
  const projects = await getProjects();
  return (
    <div className="space-y-24">
      {/* Hero Section with background decoration */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 blur-3xl opacity-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full w-[30rem] h-[30rem]"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 blur-3xl opacity-20 bg-gradient-to-br from-accent-secondary to-accent-tertiary rounded-full w-[25rem] h-[25rem]"></div>
        </div>
        <HeroSection />
      </div>

      {/* Testimonials with enhanced styling */}
      <div className="py-12 bg-background-secondary rounded-3xl px-4 sm:px-6">
        <Testimonials testimonials={testimonialsData} />
      </div>

      {/* Featured Projects with animations */}
      <section className="space-y-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <a href="/projects" className="text-sm font-medium text-accent-primary hover:text-accent-secondary transition-colors flex items-center gap-2">
            View all projects
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
        
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <div key={p.slug}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
