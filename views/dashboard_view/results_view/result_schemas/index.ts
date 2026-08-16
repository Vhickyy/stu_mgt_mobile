import { z } from "zod";

export const resultSchema = z.object({
  courseId: z.string().min(1, "Select a course"),
  score: z
    .string()
    .min(1, "Score is required")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 100,
      "Score must be between 0 and 100",
    ),
  grade: z.string().min(1, "Grade is required"),
  note: z.string().optional().default(""),
});

export type ResultFormValues = z.infer<typeof resultSchema>;
