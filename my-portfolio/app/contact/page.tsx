export const metadata = {
  title: "Contact",
  description: "Get in touch with Brian Bett",
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
      <form className="space-y-4 max-w-md" action={"/api/contact"} method="post">
        <div>
          <label className="block text-sm mb-1" htmlFor="name">Name</label>
          <input className="w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2" id="name" name="name" required />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input type="email" className="w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2" id="email" name="email" required />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="message">Message</label>
          <textarea className="w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2" id="message" name="message" rows={5} required />
        </div>
        <button className="rounded-md bg-foreground text-background px-4 py-2 text-sm" type="submit">Send</button>
      </form>
    </section>
  );
}