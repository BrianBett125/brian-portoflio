"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

type CopyEmailProps = {
  email: string;
  className?: string;
};

/**
 * One-click email copy. Uses the async Clipboard API with a legacy
 * execCommand fallback, shows an inline "Copied" state plus a toast, and
 * resets after a short delay. Purely additive: the mailto link next to it
 * still works for users who prefer their mail app.
 */
export default function CopyEmail({ email, className = "" }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    let ok = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        ok = true;
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        ok = document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch {
      ok = false;
    }

    if (ok) {
      setCopied(true);
      toast.success("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Could not copy. Long-press or select the address instead.");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent-secondary/50 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary ${className}`}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-emerald-400" aria-hidden="true" />
      ) : (
        <ClipboardDocumentIcon className="h-4 w-4 text-accent-secondary" aria-hidden="true" />
      )}
      {copied ? "Copied" : `Copy ${email}`}
    </button>
  );
}
