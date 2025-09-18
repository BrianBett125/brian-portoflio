import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Brian Bett – Portfolio",
    description:
      "Personal portfolio built with Next.js App Router, Tailwind CSS, and TypeScript.",
    url: "https://example.com",
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
};

function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/70 border-b border-foreground/10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Brian Bett</Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/about" className="hover:underline underline-offset-4">About</Link>
          <Link href="/projects" className="hover:underline underline-offset-4">Projects</Link>
          <Link href="/blog" className="hover:underline underline-offset-4">Blog</Link>
          <Link href="/contact" className="hover:underline underline-offset-4">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/10 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-foreground/70 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Brian Bett. All rights reserved.</p>
        <p>
          Built with <a className="underline underline-offset-2" href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <Navbar />
        <main className="mx-auto max-w-5xl px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
