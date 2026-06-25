"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, CommandLineIcon } from "@heroicons/react/24/outline";

const commandResponses = {
  projects: {
    title: "Projects",
    body: "Open the project case studies: learning systems, developer platforms, operations tools, real-time feedback, and automation.",
    href: "/projects",
  },
  about: {
    title: "About",
    body: "Read the engineering profile: backend systems, product workflows, and practical system design.",
    href: "/about",
  },
  contact: {
    title: "Contact",
    body: "Send an email and notes through the contact form.",
    href: "/contact",
  },
} as const;

type CommandName = keyof typeof commandResponses;

function isCommandName(value: string): value is CommandName {
  return value in commandResponses;
}

export default function DeveloperConsole() {
  const [input, setInput] = useState("");
  const [activeCommand, setActiveCommand] = useState<CommandName>("projects");
  const [error, setError] = useState("");

  const supportedCommands = useMemo(
    () => Object.keys(commandResponses) as CommandName[],
    []
  );
  const response = commandResponses[activeCommand];

  function runCommand(command: string) {
    const normalized = command.trim().toLowerCase();

    if (isCommandName(normalized)) {
      setActiveCommand(normalized);
      setError("");
      setInput("");
      return;
    }

    setError(`Unknown command: ${command || "empty"}. Try projects, about, or contact.`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-background/70 shadow-2xl shadow-accent-primary/10 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.05] px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <CommandLineIcon className="h-5 w-5 text-accent-secondary" aria-hidden="true" />
          developer-console
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-sm leading-7 text-foreground-secondary">
          <p>
            <span className="text-cyan-300">brian@portfolio</span>
            <span className="text-foreground">:~$</span> {activeCommand}
          </p>
          <p className="mt-3 text-foreground">{response.title}</p>
          <p className="mt-1">{response.body}</p>
          <Link
            href={response.href}
            className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-bold text-accent-secondary transition hover:text-cyan-300"
          >
            Open {response.title}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {supportedCommands.map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => runCommand(command)}
              className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
                activeCommand === command
                  ? "border-accent-secondary/60 bg-accent-secondary/15 text-foreground"
                  : "border-white/10 bg-white/[0.05] text-foreground-secondary hover:border-accent-secondary/50 hover:text-foreground"
              }`}
            >
              {command}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="developer-command" className="sr-only">
            Developer command
          </label>
          <input
            id="developer-command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type projects, about, or contact"
            className="min-h-11 flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-4 font-mono text-sm text-foreground outline-none transition placeholder:text-foreground-secondary/60 focus:border-accent-secondary focus:ring-4 focus:ring-accent-secondary/20"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-5 text-sm font-bold text-white shadow-lg shadow-accent-primary/20 transition hover:scale-[1.01]"
          >
            Run
          </button>
        </form>

        {error && <p className="text-sm text-red-300">{error}</p>}
      </div>
    </div>
  );
}
