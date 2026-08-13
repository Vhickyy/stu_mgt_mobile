import { CourseResult, CreateResultInput } from "../result_view_types/imdex";

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
