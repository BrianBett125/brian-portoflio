"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      setStatus("success");
      form.reset();
    } catch (e: any) {
      setStatus("error");
      setError(e.message || "Unknown error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm">Name</label>
          <input name="name" required minLength={2} className="w-full rounded-md bg-background border border-foreground/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40" />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input name="email" type="email" required className="w-full rounded-md bg-background border border-foreground/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm">Message</label>
        <textarea name="message" required minLength={10} rows={5} className="w-full rounded-md bg-background border border-foreground/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <div className="flex items-center gap-3">
        <button disabled={status === "loading"} className="inline-flex items-center rounded-md bg-accent/20 text-accent px-4 py-2 text-sm hover:bg-accent/30 disabled:opacity-50">
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && <p className="text-xs text-foreground/60">Thanks! I’ll get back to you soon.</p>}
        {status === "error" && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </form>
  );
}