import { NextResponse } from "next/server";
import { z } from "zod";

// Optional: Resend email integration (configure RESEND_API_KEY in env)
// import { Resend } from "@resend/client";
// const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: unknown;

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
    }

    const parsed = ContactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, message } = parsed.data;

    // Example email send (uncomment and configure to enable):
    // await resend.emails.send({
    //   from: "Portfolio <onboarding@resend.dev>",
    //   to: ["you@example.com"],
    //   subject: `New contact form message from ${name}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}