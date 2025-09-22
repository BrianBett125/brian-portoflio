"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-accent-primary/20 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute -bottom-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-accent-secondary/20 rounded-full blur-3xl opacity-70"></div>
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-10 right-10 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-r from-accent-primary/30 to-accent-secondary/30 blur-xl"
        />
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent"
        >
          Hi, I'm Brian Bett
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-2xl sm:text-4xl font-bold tracking-tight mt-2 text-foreground"
        >
          Software Engineer & AI/ML Enthusiast
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-foreground-secondary max-w-2xl leading-relaxed"
        >
          My mission is to build innovative and impactful web applications that solve real-world problems. I specialize in creating robust, scalable, and user-friendly experiences using modern web technologies.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-3 sm:gap-4"
        >
          <Link 
            href="/projects" 
            className="btn btn-primary inline-flex items-center gap-2 group"
          >
            View Projects
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transform transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
          
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 rounded-md border-2 border-accent-primary/30 px-5 py-2.5 text-sm font-medium hover:border-accent-primary/70 hover:bg-accent-primary/10 transition-all duration-300 group"
          >
            Contact Me
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transform transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="h-px bg-gradient-to-r from-accent-primary/50 to-transparent flex-grow max-w-[80px] sm:max-w-[100px]"></div>
          <span className="text-foreground-secondary font-medium">Scroll to explore</span>
          <div className="h-px bg-gradient-to-l from-accent-primary/50 to-transparent flex-grow max-w-[80px] sm:max-w-[100px]"></div>
        </motion.div>
      </div>
    </section>
  );
}