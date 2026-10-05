import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/contact-validation";
import { contactRateLimiter } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }
    const { email, message, website } = parsed.data;
    if (website) return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });

    const forwardedFor = request.headers?.get("x-forwarded-for");
    const clientKey = forwardedFor?.split(",")[0]?.trim() || request.headers?.get("x-real-ip") || "unknown";
    const rateLimit = contactRateLimiter(clientKey);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in a minute." },
        { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))) } }
      );
    }
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured.", fallback: "mailto" },
        { status: 503 }
      );
    }

    if (!fromEmail) {
      return NextResponse.json(
        { error: "Email sender is not configured.", fallback: "mailto" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const delivery = await resend.emails.send({
      from: fromEmail,
      to: "brianbett756@gmail.com",
      replyTo: email,
      subject: `New portfolio contact from ${email}`,
      text: `Email: ${email}\n\nNotes:\n${message}`,
    });

    if (delivery.error) throw new Error("Unable to deliver contact message.");

    await resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: "brianbett756@gmail.com",
      subject: "Thanks for reaching out to Brian",
      text: "Thanks for your message. I received it and will get back to you as soon as I can.",
    });

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        error: "Email service is temporarily unavailable.",
        fallback: "mailto",
      },
      { status: 503 }
    );
  }
}
