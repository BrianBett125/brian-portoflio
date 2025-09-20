import { notFound } from "next/navigation";
import Image from "next/image";
import { caseStudies } from "@/lib/caseStudies";
import type { Metadata } from "next";

interface CaseStudyPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    return {};
  }

  const title = caseStudy.title;
  const description = caseStudy.overview.solution;
  const imageUrl = caseStudy.screenshots[0]; // Assuming the first screenshot is the main image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: imageUrl ? [imageUrl] : undefined,
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/projects/${params.slug}`,
      siteName: "Brian Bett Portfolio",
      locale: "en_US",
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: caseStudy.title,
    description: caseStudy.overview.solution,
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/projects/${caseStudy.slug}`,
    image: caseStudy.screenshots[0] ? `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}${caseStudy.screenshots[0]}` : undefined,
    creator: {
      "@type": "Person",
      name: "Brian Bett",
    },
    keywords: caseStudy.techStack.join(", "),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl font-bold mb-6">{caseStudy.title}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium">Problem</h3>
            <p>{caseStudy.overview.problem}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Solution</h3>
            <p>{caseStudy.overview.solution}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Impact</h3>
            <p>{caseStudy.overview.impact}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {caseStudy.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caseStudy.screenshots.map((src, index) => (
            <div key={index} className="relative w-full h-60">
              <Image
                src={src}
                alt={`Screenshot ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Links</h2>
        <div className="flex gap-4">
          {caseStudy.githubLink && (
            <a
              href={caseStudy.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub Repository
            </a>
          )}
          {caseStudy.liveDemoLink && (
            <a
              href={caseStudy.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}