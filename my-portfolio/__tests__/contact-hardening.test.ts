/** @jest-environment node */

import { contactFormSchema } from "../lib/contact-validation";
import { createRateLimiter } from "../lib/rate-limit";

describe("contact validation", () => {
  test("accepts valid submissions and defaults the honeypot", () => {
    expect(contactFormSchema.parse({
      email: "  person@example.com  ",
      message: "  A message with enough detail to pass validation.  ",
    })).toEqual({
      email: "person@example.com",
      message: "A message with enough detail to pass validation.",
      website: "",
    });
  });

  test("rejects invalid email, short messages, and oversized bodies", () => {
    expect(contactFormSchema.safeParse({ email: "no", message: "tiny" }).success).toBe(false);
    expect(contactFormSchema.safeParse({ email: "person@example.com", message: "x".repeat(5001) }).success).toBe(false);
  });
});

describe("contact rate limiter", () => {
  test("limits each key independently and resets after its window", () => {
    const limit = createRateLimiter(2, 1000);
    expect(limit("a", 100).allowed).toBe(true);
    expect(limit("b", 100).allowed).toBe(true);
    expect(limit("a", 101).allowed).toBe(true);
    expect(limit("a", 102).allowed).toBe(false);
    expect(limit("a", 1100).allowed).toBe(true);
  });
});
