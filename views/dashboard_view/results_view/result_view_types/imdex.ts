export interface CourseResult {
  id: string;
  courseId: string;
  score: number; // out of 100
  grade: string; // "A-", "B+", etc — must match a band in the student's grading system
  gradePoints: number; // derived from the grade band, not independently editable
  note?: string;
}

export interface CreateResultInput {
  courseId: string;
  score: number;
  grade: string;
  gradePoints: number;
  note?: string;
}
