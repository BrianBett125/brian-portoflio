import { NextResponse } from "next/server";
import * as z from "zod";
import { Resend } from "resend";

const contactFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, message } = contactFormSchema.parse(body);
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

    await resend.emails.send({
      from: fromEmail,
      to: "brianbett756@gmail.com",
      replyTo: email,
      subject: `New portfolio contact from ${email}`,
      text: `Email: ${email}\n\nNotes:\n${message}`,
    });

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

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
