import * as z from "zod";

export const contactFormSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address." }).max(254),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters." }).max(5000),
  website: z.string().max(200).optional().default(""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactFormInput = z.input<typeof contactFormSchema>;
