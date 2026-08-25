import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/Providers";
import { getMetadataBase, getSiteUrl } from "@/lib/site-url";
import CursorGlow from "@/components/CursorGlow";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Brian Bett – Portfolio",
    template: "%s | Brian Bett",
  },
  description:
    "Brian Bett's portfolio for software engineering work across Java, Spring Boot, Python, Django, APIs, backend systems, developer platforms, and automation tools.",
  keywords: [
    "Brian Bett",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "REST APIs",
    "Backend Development",
    "Flutter",
    "TypeScript",
  ],
  openGraph: {
    title: "Brian Bett – Portfolio",
    description:
      "Software engineering work across Java, Spring Boot, Python, Django, APIs, backend systems, developer platforms, and automation tools.",
    url: getSiteUrl(),
    siteName: "Brian Bett – Portfolio",
    images: [
      {
        url: `${getSiteUrl()}/og.png`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Brian Bett - Software Engineer",
    description:
      "Java, Spring Boot, Python, Django, APIs, backend systems, developer platforms, and automation tools.",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${getSiteUrl()}/#person`,
        name: "Brian Bett",
        url: getSiteUrl(),
        jobTitle: "Software Engineer",
        knowsAbout: [
          "Software Engineering",
          "Java",
          "Spring Boot",
          "Python",
          "Django",
          "REST APIs",
          "Backend Development",
          "Flutter",
          "TypeScript",
        ],
        sameAs: [
          "https://github.com/BrianBett125",
          "https://www.linkedin.com/in/brian-bett-kipkoech/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        name: "Brian Bett Portfolio",
        url: getSiteUrl(),
        author: {
          "@id": `${getSiteUrl()}/#person`,
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.classList.remove('light','dark');d.classList.add(t);d.dataset.theme=t;d.style.colorScheme=t;}catch(e){}})();`}
        </Script>
        <Script
          id="site-identity-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <CursorGlow />
          <Navbar />
          <main className="flex flex-col items-center py-8 sm:py-12 lg:py-16">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
