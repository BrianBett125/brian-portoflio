"use client";

import {
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  EnvelopeIcon,
  LinkIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const links = [
  { href: "/about", label: "About", icon: UserCircleIcon },
  { href: "/projects", label: "Projects", icon: FolderOpenIcon },
  { href: "/blog", label: "Blog", icon: DocumentTextIcon },
  { href: "/contact", label: "Contact", icon: ChatBubbleLeftRightIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/5 mt-20 bg-background-secondary">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <h3 className="font-bold text-xl bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-3">Brian Bett</h3>
            <p className="text-foreground-secondary max-w-md">Software engineer building backend systems, developer platforms, automation tools, and real-world solutions.</p>
          </div>
          
          <div className="grid w-full grid-cols-2 gap-8 sm:w-auto">
            <div>
              <h4 className="font-semibold mb-3">Links</h4>
              <ul className="space-y-2 text-foreground-secondary">
                {links.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <a href={href} className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-accent-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-foreground-secondary">
                <li>
                  <a href="tel:+254728085834" className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-accent-primary">
                    <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                    +254 728 085 834
                  </a>
                </li>
                <li>
                  <a href="mailto:brianbett756@gmail.com" className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-accent-primary">
                    <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                    Email
                  </a>
                </li>
                <li>
                  <a href="https://github.com/BrianBett125" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-accent-primary">
                    <CodeBracketIcon className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/brian-bett-kipkoech/" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-accent-primary">
                    <LinkIcon className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-foreground/5 pt-6 text-sm text-foreground-secondary sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Brian Bett. All rights reserved.</p>
          <p>
            Built with <a className="text-accent-primary hover:text-accent-secondary transition-colors" href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
