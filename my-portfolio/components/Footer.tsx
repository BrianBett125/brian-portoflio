"use client";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/5 mt-20 bg-background-secondary">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-bold text-xl bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-3">Brian Bett</h3>
            <p className="text-foreground-secondary max-w-md">Java and Python backend engineer with over three years of experience building reliable APIs, services, and data-driven systems.</p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h4 className="font-semibold mb-3">Links</h4>
              <ul className="space-y-2 text-foreground-secondary">
                <li><a href="/about" className="hover:text-accent-primary transition-colors">About</a></li>
                <li><a href="/projects" className="hover:text-accent-primary transition-colors">Projects</a></li>
                <li><a href="/blog" className="hover:text-accent-primary transition-colors">Blog</a></li>
                <li><a href="/contact" className="hover:text-accent-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-foreground-secondary">
                <li><a href="https://github.com/BrianBett125" target="_blank" rel="noreferrer" className="hover:text-accent-primary transition-colors">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/brian-bett-kipkoech/" target="_blank" rel="noreferrer" className="hover:text-accent-primary transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-foreground/5 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-foreground-secondary">
          <p>© {new Date().getFullYear()} Brian Bett. All rights reserved.</p>
          <p>
            Built with <a className="text-accent-primary hover:text-accent-secondary transition-colors" href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
