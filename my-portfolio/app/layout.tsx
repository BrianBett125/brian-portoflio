import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import PlausibleProvider from "next-plausible";

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
    url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000", // Update this to your deployment URL
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain={process.env.NEXT_PUBLIC_DOMAIN!} />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
