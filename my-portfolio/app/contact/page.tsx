import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Brian Bett.",
};

export default function ContactPage() {
  return (
    <section className="py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
          <p className="text-foreground/70">Have a question or want to work together? Send a message.</p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}