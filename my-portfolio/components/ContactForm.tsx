"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData, type ContactFormInput } from "@/lib/contact-validation";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type ContactFormInputs = ContactFormData;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [deliveryMode, setDeliveryMode] = useState<"direct" | "mailto" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  function openMailto(data: ContactFormInputs) {
    const subject = encodeURIComponent("Portfolio contact");
    const body = encodeURIComponent(`From: ${data.email}\n\n${data.message}`);
    window.location.assign(`mailto:brianbett756@gmail.com?subject=${subject}&body=${body}`);
  }

  async function onSubmit(data: ContactFormInputs) {
    setStatus("loading");
    setDeliveryMode(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        if (isRecord(result) && result.fallback === "mailto") {
          openMailto(data);
          setDeliveryMode("mailto");
          setStatus("success");
          reset();
          return;
        }

        let errorMsg = "Failed to send message.";
        if (isRecord(result) && typeof result.error === "string") {
          errorMsg = result.error;
        } else if (isRecord(result) && Array.isArray(result.error)) {
          errorMsg = result.error
            .filter(isRecord)
            .map((issue) => issue.message)
            .filter((message): message is string => typeof message === "string")
            .join(" ");
        }

        setStatus("error");
        setError(errorMsg);
        return;
      }

      setDeliveryMode("direct");
      setStatus("success");
      reset();
    } catch (e: unknown) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "A network error occurred while sending your message.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className="w-full rounded-2xl border border-ui-border/10 bg-ui-surface/[0.06] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-secondary/60 focus:border-accent-secondary focus:ring-4 focus:ring-accent-secondary/20"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-status-error">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-foreground">
          Notes
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
          className="w-full resize-none rounded-2xl border border-ui-border/10 bg-ui-surface/[0.06] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-secondary/60 focus:border-accent-secondary focus:ring-4 focus:ring-accent-secondary/20"
          placeholder="Tell me what you want to build, improve, or automate."
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-status-error">
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-primary/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <PaperAirplaneIcon className="h-4 w-4" aria-hidden="true" />
          {status === "loading" ? "Sending..." : "Send"}
        </button>
        {status === "success" && (
          <p className="text-xs text-foreground-secondary">
            {deliveryMode === "direct"
              ? "Message sent to brianbett756@gmail.com."
              : "Email draft prepared for brianbett756@gmail.com."}
          </p>
        )}
        {status === "error" && <p className="text-xs text-status-error">{error}</p>}
      </div>
    </form>
  );
}
