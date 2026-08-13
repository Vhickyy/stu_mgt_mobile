import {
  AcademicProfile,
  SaveAcademicProfileInput,
  Semester,
  SemesterHistoryEntry,
} from "../academic_info_types";

export const SEMESTER_OPTIONS: Semester[] = ["1st Semester", "2nd Semester"];

/** e.g. 2023 -> "2023/2024" */
export function formatAcademicYear(startYear: number): string {
  return `${startYear}/${startYear + 1}`;
}

export function parseAcademicYearStart(academicYear: string): number {
  return parseInt(academicYear.split("/")[0], 10);
}

export function parseAcademicYearEnd(academicYear: string): number {
  return parseInt(academicYear.split("/")[1], 10);
}

/** Generates academic year options starting from admission year through the current calendar year + 1. */
export function generateAcademicYearOptions(admissionYear: number): string[] {
  const currentYear = new Date().getFullYear();
  const lastYear = Math.max(admissionYear, currentYear);
  const options: string[] = [];
  for (let year = admissionYear; year <= lastYear; year++) {
    options.push(formatAcademicYear(year));
  }
  return options;
}

/** Generates a reasonable range of admission years to pick from (last 20 years through this year). */
export function generateAdmissionYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year);
  }
  return years;
}

let currentProfile: AcademicProfile | null = null;

function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchAcademicProfile(): Promise<AcademicProfile | null> {
  return delay(currentProfile);
}

export async function saveAcademicProfile(
  input: SaveAcademicProfileInput,
): Promise<AcademicProfile> {
  currentProfile = { ...input, onboardingSkipped: false };
  return delay(currentProfile);
}

export async function skipAcademicProfile(): Promise<AcademicProfile> {
  const now = new Date().getFullYear();
  currentProfile = {
    admissionYear: now,
    currentAcademicYear: `${now}/${now + 1}`,
    currentSemester: "1st Semester",
    onboardingSkipped: true,
  };
  return delay(currentProfile);
}

const HISTORY: SemesterHistoryEntry[] = [
  {
    id: "h_2022_1",
    academicYear: "2022/2023",
    semester: "1st Semester",
    isCurrent: false,
  },
  {
    id: "h_2022_2",
    academicYear: "2022/2023",
    semester: "2nd Semester",
    isCurrent: false,
  },
  {
    id: "h_2023_1",
    academicYear: "2023/2024",
    semester: "1st Semester",
    isCurrent: false,
  },
  {
    id: "h_2023_2",
    academicYear: "2023/2024",
    semester: "2nd Semester",
    isCurrent: false,
  },
  {
    id: "h_2024_1",
    academicYear: "2024/2025",
    semester: "1st Semester",
    isCurrent: true,
  },
];

export async function fetchSemesterHistory(): Promise<SemesterHistoryEntry[]> {
  return delay([...HISTORY]);
}
