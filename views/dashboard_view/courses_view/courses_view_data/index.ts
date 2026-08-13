import { Semester } from "../../grading_view/inner_views/academic_info_view/academic_info_types";
import { createResult } from "../../results_view/result_view_data";
import { CreateResultInput } from "../../results_view/result_view_types/imdex";
import {
  Course,
  CreateCourseInput,
  UpdateCourseInput,
} from "../courses_view_types";

export class NotEditableError extends Error {
  constructor() {
    super("Courses from a previous semester can't be edited or deleted.");
    this.name = "NotEditableError";
  }
}

let courses: Course[] = [
  {
    id: "crs_1",
    academicYear: "2023/2024",
    semester: "2nd Semester",
    title: "Introduction to Algorithms",
    code: "CSC 202",
    units: 3,
    type: "Core",
  },
  {
    id: "crs_2",
    academicYear: "2023/2024",
    semester: "2nd Semester",
    title: "Discrete Mathematics",
    code: "MTH 202",
    units: 3,
    type: "Core",
  },
];

// The single currently-editable period — mirrors what academicProfile.ts tracks,
// kept separately here since course.ts shouldn't reach into another module's
// private state. Update this via setCurrentEditablePeriod when the active
// semester changes elsewhere in the app.
let currentEditablePeriod = {
  academicYear: "2024/2025",
  semester: "1st Semester" as Semester,
};

export function setCurrentEditablePeriod(
  academicYear: string,
  semester: Semester,
) {
  currentEditablePeriod = { academicYear, semester };
}

function isEditablePeriod(academicYear: string, semester: Semester): boolean {
  return (
    currentEditablePeriod.academicYear === academicYear &&
    currentEditablePeriod.semester === semester
  );
}

function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchCourses(
  academicYear: string,
  semester: Semester,
): Promise<Course[]> {
  return delay(
    courses.filter(
      (c) => c.academicYear === academicYear && c.semester === semester,
    ),
  );
}

export async function createCourse(input: CreateCourseInput): Promise<Course> {
  if (!isEditablePeriod(input.academicYear, input.semester)) {
    return delay(null, 400).then(() => {
      throw new NotEditableError();
    });
  }

  const newCourse: Course = { id: `crs_${Date.now()}`, ...input };
  courses = [...courses, newCourse];
  return delay(newCourse);
}

export async function updateCourse(input: UpdateCourseInput): Promise<Course> {
  const existing = courses.find((c) => c.id === input.id);
  if (
    !existing ||
    !isEditablePeriod(existing.academicYear, existing.semester)
  ) {
    return delay(null, 400).then(() => {
      throw new NotEditableError();
    });
  }

  courses = courses.map((c) => (c.id === input.id ? { ...c, ...input } : c));
  return delay(courses.find((c) => c.id === input.id)!);
}

export async function deleteCourse(id: string): Promise<{ id: string }> {
  const existing = courses.find((c) => c.id === id);
  if (
    !existing ||
    !isEditablePeriod(existing.academicYear, existing.semester)
  ) {
    return delay(null, 400).then(() => {
      throw new NotEditableError();
    });
  }

  courses = courses.filter((c) => c.id !== id);
  return delay({ id });
}

export async function createCourseWithResult(
  courseInput: CreateCourseInput,
  resultInput: Omit<CreateResultInput, "courseId">,
) {
  const newCourse: Course = { id: `crs_${Date.now()}`, ...courseInput };
  courses = [...courses, newCourse];

  const result = await createResult({ courseId: newCourse.id, ...resultInput });

  return { course: newCourse, result };
}
