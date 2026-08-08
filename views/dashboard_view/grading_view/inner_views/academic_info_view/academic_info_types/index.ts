export type Semester = "1st Semester" | "2nd Semester";

export interface AcademicProfile {
  admissionYear: number;
  currentAcademicYear: string; // "2024/2025"
  currentSemester: Semester;
  onboardingSkipped: boolean; // true if they hit "I'll do this later"
}

export interface SaveAcademicProfileInput {
  admissionYear: number;
  currentAcademicYear: string;
  currentSemester: Semester;
}
