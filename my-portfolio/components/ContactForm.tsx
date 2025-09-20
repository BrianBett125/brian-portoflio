"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormInputs = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: ContactFormInputs) {
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Failed to send");
      setStatus("success");
      reset();
    } catch (e: any) {
      setStatus("error");
      setError(e.message || "Unknown error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm">Name</label>
          <input
            {...register("name")}
            className="w-full rounded-md bg-background border border-foreground/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-md bg-background border border-foreground/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40"
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm">Message</label>
        <textarea
          rows={5}
          {...register("message")}
          className="w-full rounded-md bg-background border border-foreground/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40"
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center rounded-md bg-accent/20 text-accent px-4 py-2 text-sm hover:bg-accent/30 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && <p className="text-xs text-foreground/60">Thanks! I’ll get back to you soon.</p>}
        {status === "error" && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </form>
  );
}