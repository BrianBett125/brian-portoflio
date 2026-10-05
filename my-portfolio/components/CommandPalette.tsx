"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const navigation = [
  { label: "Home", href: "/", keywords: "start" },
  { label: "About", href: "/about", keywords: "profile experience" },
  { label: "Projects", href: "/projects", keywords: "work case studies" },
  { label: "Blog", href: "/blog", keywords: "writing articles" },
  { label: "Now", href: "/now", keywords: "current focus" },
  { label: "Contact", href: "/contact", keywords: "hire email" },
];

export default function CommandPalette() {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const commands = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [
      ...navigation.filter((item) => `${item.label} ${item.keywords}`.toLowerCase().includes(search)).map((item) => ({ ...item, action: () => router.push(item.href) })),
      ...( "theme toggle light dark".includes(search) ? [{ label: "Toggle theme", href: "#theme", keywords: "theme toggle light dark", action: toggleTheme }] : []),
    ];
  }, [query, router, toggleTheme]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const show = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
    setQuery("");
    setSelected(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close(); else show();
      } else if (event.key === "Escape" && open) {
        event.preventDefault();
        close();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [close, open, show]);

  useEffect(() => {
    if (!open) {
      returnFocusRef.current?.focus();
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  function runSelected() {
    const command = commands[selected];
    if (!command) return;
    close();
    command.action();
  }

  return open ? (
    <div className="command-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section ref={dialogRef} className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title" onKeyDown={(event) => {
        if (event.key === "ArrowDown") { event.preventDefault(); setSelected((index) => (index + 1) % Math.max(commands.length, 1)); }
        if (event.key === "ArrowUp") { event.preventDefault(); setSelected((index) => (index - 1 + commands.length) % Math.max(commands.length, 1)); }
        if (event.key === "Enter") { event.preventDefault(); runSelected(); }
        if (event.key === "Tab") {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled])');
          if (!focusable?.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}>
        <h2 id="command-title" className="sr-only">Portfolio commands</h2>
        <div className="flex items-center border-b border-foreground/10 pr-2">
          <label className="sr-only" htmlFor="command-search">Search pages and actions</label>
          <input ref={inputRef} id="command-search" value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} placeholder="Search pages and actions…" className="command-input" autoComplete="off" aria-activedescendant={commands[selected] ? `command-option-${selected}` : undefined} />
          <button type="button" onClick={close} className="min-h-11 rounded-lg px-3 text-sm text-foreground-secondary hover:bg-foreground/5" aria-label="Close command palette">Close</button>
        </div>
        <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground-secondary">Navigate</p>
        <ul role="listbox" aria-label="Commands" className="max-h-[55vh] overflow-y-auto p-2">
          {commands.map((command, index) => <li key={command.href} role="presentation">
            <button id={`command-option-${index}`} type="button" role="option" tabIndex={-1} aria-selected={selected === index} onMouseEnter={() => setSelected(index)} onClick={() => { close(); command.action(); }} className={`min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${selected === index ? "bg-accent-primary/15 text-foreground" : "text-foreground-secondary"}`}>
              {command.label}
            </button>
          </li>)}
          {commands.length === 0 && <li className="px-3 py-4 text-sm text-foreground-secondary">No matching commands</li>}
        </ul>
        <div className="border-t border-foreground/10 px-4 py-3 text-xs text-foreground-secondary">↑↓ Navigate · Enter Select · Esc Close</div>
      </section>
    </div>
  ) : null;
}
