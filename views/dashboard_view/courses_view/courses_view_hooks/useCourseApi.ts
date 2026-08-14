import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Semester } from "../../grading_view/inner_views/academic_info_view/academic_info_types";
import { fetchResultForCourse } from "../../results_view/result_view_data";
import { CreateResultInput } from "../../results_view/result_view_types/imdex";
import {
  createCourse,
  createCourseWithResult,
  deleteCourse,
  fetchCourseById,
  fetchCourses,
  updateCourse,
} from "../courses_view_data";
import { CreateCourseInput, UpdateCourseInput } from "../courses_view_types";

export const courseKeys = {
  all: ["courses"] as const,
  period: (academicYear: string, semester: Semester) =>
    ["courses", academicYear, semester] as const,
  byId: (id: string) => ["courses", "detail", id] as const,
};

export function useCourses(academicYear: string, semester: Semester) {
  return useQuery({
    queryKey: courseKeys.period(academicYear, semester),
    queryFn: () => fetchCourses(academicYear, semester),
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCourseInput) => createCourse(input),
    onSuccess: (course) => {
      queryClient.invalidateQueries({
        queryKey: courseKeys.period(course.academicYear, course.semester),
      });
    },
  });
}

export function useUpdateCourse(academicYear: string, semester: Semester) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateCourseInput) => updateCourse(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseKeys.period(academicYear, semester),
      });
    },
  });
}

export function useDeleteCourse(academicYear: string, semester: Semester) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseKeys.period(academicYear, semester),
      });
    },
  });
}

export function useCreateCourseWithResult(
  academicYear: string,
  semester: Semester,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseInput,
      resultInput,
    }: {
      courseInput: CreateCourseInput;
      resultInput: Omit<CreateResultInput, "courseId">;
    }) => createCourseWithResult(courseInput, resultInput),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseKeys.period(academicYear, semester),
      });
    },
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: courseKeys.byId(id),
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
  });
}

export const resultKeys = {
  byCourse: (courseId: string) => ["results", "course", courseId] as const,
};

export function useResultForCourse(courseId: string) {
  return useQuery({
    queryKey: resultKeys.byCourse(courseId),
    queryFn: () => fetchResultForCourse(courseId),
    enabled: !!courseId,
  });
}
