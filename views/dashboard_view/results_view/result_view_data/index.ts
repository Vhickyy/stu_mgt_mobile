import {
  CourseResult,
  CourseWithResult,
  CreateResultInput,
} from "../result_view_types/imdex";

let results: CourseResult[] = [];

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchResultForCourse(
  courseId: string,
): Promise<CourseResult | null> {
  return delay(results.find((r) => r.courseId === courseId) ?? null);
}

export async function createResult(
  input: CreateResultInput,
): Promise<CourseResult> {
  const newResult: CourseResult = { id: `res_${Date.now()}`, ...input };
  results = [...results, newResult];
  return delay(newResult);
}

export async function fetchResultsByCourseIds(
  courseIds: string[],
): Promise<CourseResult[]> {
  return delay(results.filter((r) => courseIds.includes(r.courseId)));
}

export async function updateResult(
  id: string,
  input: Omit<CreateResultInput, "courseId">,
): Promise<CourseResult> {
  results = results.map((r) => (r.id === id ? { ...r, ...input } : r));
  return delay(results.find((r) => r.id === id)!);
}

/** Weighted-average GPA across courses that have a result entered. Ignores pending courses. */
export function calculateGpa(
  coursesWithResults: CourseWithResult[],
): number | null {
  const graded = coursesWithResults.filter((c) => c.result !== null);
  if (graded.length === 0) return null;

  const totalPoints = graded.reduce(
    (sum, c) => sum + c.result!.gradePoints * c.units,
    0,
  );
  const totalUnits = graded.reduce((sum, c) => sum + c.units, 0);

  return totalUnits === 0 ? null : totalPoints / totalUnits;
}
