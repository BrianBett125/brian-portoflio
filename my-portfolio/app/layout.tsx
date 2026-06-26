import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/Providers";
import { getMetadataBase, getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Brian Bett – Portfolio",
    template: "%s | Brian Bett",
  },
  description:
    "Brian Bett's portfolio for backend systems, developer platforms, automation tools, and practical software engineering work.",
  openGraph: {
    title: "Brian Bett – Portfolio",
    description:
      "Brian Bett's portfolio for backend systems, developer platforms, automation tools, and practical software engineering work.",
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
    title: "Brian Bett",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.classList.remove('light','dark');d.classList.add(t);d.dataset.theme=t;d.style.colorScheme=t;}catch(e){}})();`}
        </Script>
        <Providers>
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
