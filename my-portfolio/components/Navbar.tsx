"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

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
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link 
          href="/" 
          className="group relative font-bold text-xl tracking-tight bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent hover:from-accent-secondary hover:to-accent-tertiary transition-all duration-300"
          onClick={closeMenu}
        >
          Brian Bett
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-300"></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            href="/about" 
            className={`relative py-1 ${isActive('/about') 
              ? 'text-accent-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary' 
              : 'text-foreground-secondary hover:text-foreground transition-colors'}`}
          >
            About
          </Link>
          <Link 
            href="/projects" 
            className={`relative py-1 ${isActive('/projects') 
              ? 'text-accent-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary' 
              : 'text-foreground-secondary hover:text-foreground transition-colors'}`}
          >
            Projects
          </Link>
          <Link 
            href="/blog" 
            className={`relative py-1 ${isActive('/blog') 
              ? 'text-accent-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary' 
              : 'text-foreground-secondary hover:text-foreground transition-colors'}`}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            className={`relative py-1 ${isActive('/contact') 
              ? 'text-accent-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary' 
              : 'text-foreground-secondary hover:text-foreground transition-colors'}`}
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-foreground/5 transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
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
            className="fixed top-0 right-0 h-full w-72 max-w-[85%] z-50 md:hidden bg-background shadow-xl border-l border-foreground/10 p-6 flex flex-col gap-4"
          >
            <Link href="/about" onClick={closeMenu} className={`py-2 ${isActive('/about') ? 'text-accent-primary' : 'text-foreground'}`}>About</Link>
            <Link href="/projects" onClick={closeMenu} className={`py-2 ${isActive('/projects') ? 'text-accent-primary' : 'text-foreground'}`}>Projects</Link>
            <Link href="/blog" onClick={closeMenu} className={`py-2 ${isActive('/blog') ? 'text-accent-primary' : 'text-foreground'}`}>Blog</Link>
            <Link href="/contact" onClick={closeMenu} className={`py-2 ${isActive('/contact') ? 'text-accent-primary' : 'text-foreground'}`}>Contact</Link>
            <div className="pt-2 border-t border-foreground/10 mt-2">
              <ThemeToggle />
            </div>
          </motion.nav>
        </>
      )}
    </motion.header>
  );
}