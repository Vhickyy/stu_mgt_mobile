import { Semester } from "../../grading_view/inner_views/academic_info_view/academic_info_types";

export type CourseType = "Core" | "Elective" | "General";

export const COURSE_TYPE_OPTIONS: CourseType[] = [
  "Core",
  "Elective",
  "General",
];

export interface Course {
  id: string;
  academicYear: string;
  semester: Semester;
  title: string;
  code: string;
  units: number;
  type?: CourseType;
}

export interface CreateCourseInput {
  academicYear: string;
  semester: Semester;
  title: string;
  code: string;
  units: number;
  type?: CourseType;
}

export interface UpdateCourseInput {
  id: string;
  title: string;
  code: string;
  units: number;
  type?: CourseType;
}

export interface AddCourseFormValues {
  title: string;
  code: string;
  units: string; // string in the form, coerced to number on submit
  type: CourseType | "";
  // Only used/validated when the target period is NOT current:
  score: string;
  grade: string;
  note: string;
}
