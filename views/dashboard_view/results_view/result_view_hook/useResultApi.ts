import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCourses } from "../../courses_view/courses_view_data";
import { Semester } from "../../grading_view/inner_views/academic_info_view/academic_info_types";
import {
  calculateGpa,
  createResult,
  fetchResultForCourse,
  fetchResultsByCourseIds,
  updateResult,
} from "../result_view_data";
import { CreateResultInput } from "../result_view_types/imdex";

export const resultKeys = {
  byCourse: (courseId: string) => ["results", "course", courseId] as const,
  period: (academicYear: string, semester: Semester) =>
    ["results", "period", academicYear, semester] as const,
};

export function useResultForCourse(courseId: string) {
  return useQuery({
    queryKey: resultKeys.byCourse(courseId),
    queryFn: () => fetchResultForCourse(courseId),
    enabled: !!courseId,
  });
}

/** Combines courses + their results for a period, plus derived stats. */
export function useResultsForPeriod(academicYear: string, semester: Semester) {
  return useQuery({
    queryKey: resultKeys.period(academicYear, semester),
    queryFn: async () => {
      const courses = await fetchCourses(academicYear, semester);
      const results = await fetchResultsByCourseIds(courses.map((c) => c.id));

      const combined = courses.map((course) => ({
        courseId: course.id,
        title: course.title,
        code: course.code,
        units: course.units,
        result: results.find((r) => r.courseId === course.id) ?? null,
      }));

      const stats = {
        totalCourses: combined.length,
        entered: combined.filter((c) => c.result !== null).length,
        pending: combined.filter((c) => c.result === null).length,
        gpa: calculateGpa(combined),
      };

      return { courses: combined, stats };
    },
    enabled: !!academicYear,
  });
}

export function useCreateResult(academicYear: string, semester: Semester) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateResultInput) => createResult(input),
    onSuccess: (course) => {
      queryClient.invalidateQueries({
        queryKey: resultKeys.period(academicYear, semester),
      });
      queryClient.invalidateQueries({
        queryKey: resultKeys.byCourse(course.id),
      });
    },
  });
}

export function useUpdateResult(academicYear: string, semester: Semester) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: Omit<CreateResultInput, "courseId">;
    }) => updateResult(id, input),
    onSuccess: (course) => {
      queryClient.invalidateQueries({
        queryKey: resultKeys.period(academicYear, semester),
      });
      queryClient.invalidateQueries({
        queryKey: resultKeys.byCourse(course.id),
      });
    },
  });
}
