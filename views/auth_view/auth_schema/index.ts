import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string("Full Name is required")
    .trim()
    .min(2, "Name is too short")
    .max(50, "Name is too long"),

  email: z.email("Enter a valid email").trim(),

  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number"),

  phoneNumber: z
    .string("Phone number is required")
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),

  university: z
    .string("University is required")
    .trim()
    .min(2, "University is required"),

  admissionYear: z
    .string("Admission year is required")
    .trim()
    .regex(/^\d{4}$/, "Enter a valid 4-digit year")
    .refine((year) => {
      const y = Number(year);
      const currentYear = new Date().getFullYear();
      return y >= currentYear - 15 && y <= currentYear;
    }, "Enter a valid admission year"),
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email").trim(),
  password: z.string("Password is required").min(1, "Password is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type ILoginSchema = z.infer<typeof loginSchema>;
