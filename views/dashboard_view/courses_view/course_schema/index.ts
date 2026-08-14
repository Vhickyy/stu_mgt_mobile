import { z } from "zod";

export const courseBaseSchema = z.object({
  title: z.string().trim().min(1, "Course title is required"),
  code: z.string().trim().min(1, "Course code is required"),
  units: z
    .string()
    .min(1, "Units are required")
    .refine((v) => Number(v) > 0, "Units must be greater than 0"),
  type: z.string().optional(),
});

export const editCourseSchema = courseBaseSchema;
export type EditCourseFormValues = z.infer<typeof editCourseSchema>;

/**
 * Add Course's schema depends on isCurrentPeriod (score/grade are only
 * required when backfilling a past semester) — that's external state, not
 * something derivable from the form values themselves, so it's a factory
 * rather than one static schema.
 */
export function buildAddCourseSchema(isCurrentPeriod: boolean) {
  return courseBaseSchema.extend({
    score: isCurrentPeriod
      ? z.string().optional().default("")
      : z
          .string()
          .min(1, "Score is required for a past semester")
          .refine(
            (v) => Number(v) >= 0 && Number(v) <= 100,
            "Score must be between 0 and 100",
          ),
    grade: isCurrentPeriod
      ? z.string().optional().default("")
      : z.string().min(1, "Grade is required for a past semester"),
    note: z.string().optional().default(""),
  });
}

export type AddCourseFormValues = z.infer<
  ReturnType<typeof buildAddCourseSchema>
>;
