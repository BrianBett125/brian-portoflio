import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Brian Bett.",
  openGraph: {
    title: "Brian Bett – Contact",
    description: "Get in touch with Brian Bett.",
    url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:py-20">
      <div className="absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-accent-primary/20 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            Contact
          </p>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build the next useful system.
          </h1>
          <p className="text-base leading-8 text-foreground-secondary lg:text-lg">
            Send a message directly to brianbett756@gmail.com. If the server
            email provider is unavailable, the form opens a prepared email in
            your mail app.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-accent-primary/10 backdrop-blur-xl sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
