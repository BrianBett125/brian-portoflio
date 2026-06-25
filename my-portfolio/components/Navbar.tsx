"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  HomeIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: UserCircleIcon },
  { href: "/projects", label: "Projects", icon: FolderOpenIcon },
  { href: "/blog", label: "Blog", icon: DocumentTextIcon },
  { href: "/contact", label: "Contact", icon: ChatBubbleLeftRightIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-foreground/5 shadow-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link 
          href="/" 
          className="group relative bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-lg font-bold tracking-tight text-transparent transition-all duration-300 hover:from-accent-secondary hover:to-accent-tertiary sm:text-xl"
          onClick={closeMenu}
        >
          Brian Bett
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-300"></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`relative inline-flex items-center gap-1.5 py-1 ${isActive(href)
                ? 'text-accent-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary'
                : 'text-foreground-secondary hover:text-foreground transition-colors'}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        
        <button 
          className="rounded-full p-2 transition-colors hover:bg-foreground/5 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <>
          <button 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            aria-label="Close menu overlay"
            onClick={closeMenu}
          />
          <motion.nav 
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[86vw] flex-col gap-3 border-l border-foreground/10 bg-background p-5 shadow-xl md:hidden"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-foreground-secondary">Menu</span>
              <button
                className="rounded-full p-2 hover:bg-foreground/5"
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 text-sm font-semibold ${
                  isActive(href)
                    ? 'border-accent-primary/40 bg-accent-primary/10 text-accent-primary'
                    : 'border-foreground/10 bg-foreground/[0.03] text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-foreground/10 mt-2">
              <ThemeToggle />
            </div>
          </motion.nav>
        </>
      )}
    </motion.header>
  );
}
