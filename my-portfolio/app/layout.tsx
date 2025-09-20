import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brian Bett – Portfolio",
    template: "%s | Brian Bett",
  },
  description:
    "Personal portfolio of Brian Bett. Next.js App Router, Tailwind CSS, and TypeScript.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), // Update this to your deployment URL
  openGraph: {
    title: "Brian Bett – Portfolio",
    description:
      "Personal portfolio built with Next.js App Router, Tailwind CSS, and TypeScript.",
    url: "https://example.com", // Update this to your deployment URL
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Bett – Portfolio",
    description:
      "Personal portfolio built with Next.js App Router, Tailwind CSS, and TypeScript.",
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
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/70 border-b border-foreground/10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight hover:text-accent transition-colors">Brian Bett</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
          <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 text-xs text-foreground/70 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
        <p>© {new Date().getFullYear()} Brian Bett. All rights reserved.</p>
        <p>
          Built with <a className="underline underline-offset-2 hover:text-accent transition-colors" href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Navbar />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
