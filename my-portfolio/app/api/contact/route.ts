import { NextResponse } from "next/server";
import * as z from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = contactFormSchema.parse(body);

    // Send email using Resend
    await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified Resend domain
      to: "your-email@example.com", // Replace with your actual email address
      subject: `New contact from ${name}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    // In a real application, you would also:
    // 2. Save message to a database (SQLite/Postgres)

    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}