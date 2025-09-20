export default function Footer() {
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