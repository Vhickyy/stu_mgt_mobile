import {
  AcademicProfile,
  SaveAcademicProfileInput,
} from "../../grading_view/inner_views/academic_info_view/academic_info_types";
import { DashboardOverview, SemesterRecord } from "../overview_types";

let currentProfile: AcademicProfile | null = null;

let semesterRecords: SemesterRecord[] = [
  {
    id: "sem_2024_1",
    academicYear: "2024/2025",
    semester: "1st Semester",
    startDate: "2024-09-01",
    endDate: "2025-01-31",
    isCurrent: true,
  },
  {
    id: "sem_2024_2",
    academicYear: "2024/2025",
    semester: "2nd Semester",
    startDate: "2025-02-01",
    endDate: "2025-08-31",
    isCurrent: false,
  },
];

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

/** Semesters that exist under the student's current academic session. */
export async function fetchSemesterRecords(): Promise<SemesterRecord[]> {
  return delay([...semesterRecords]);
}

/** Marks a different semester as the active one — this is what 2.2.a's "Change" does. */
export async function setCurrentSemester(
  id: string,
): Promise<SemesterRecord[]> {
  semesterRecords = semesterRecords.map((s) => ({
    ...s,
    isCurrent: s.id === id,
  }));
  const active = semesterRecords.find((s) => s.id === id)!;
  if (currentProfile) {
    currentProfile = {
      ...currentProfile,
      currentAcademicYear: active.academicYear,
      currentSemester: active.semester,
    };
  }
  return delay([...semesterRecords]);
}

const MOCK_OVERVIEW: DashboardOverview = {
  cgpa: 3.72,
  cgpaScale: 5.0,
  standing: "Good Standing",
  totalUnitsRegistered: 15,
  quickOverview: {
    courses: 5,
    completed: 0,
    inProgress: 5,
    resultsIn: 0,
  },
  upcomingClass: {
    courseTitle: "Data Structures",
    courseCode: "CSC 201",
    room: "LT 2",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    minutesUntil: 25,
  },
  attendance: {
    percent: 85,
    present: 17,
    absent: 3,
    late: 1,
    excused: 1,
  },
};

// function delay<T>(value: T, ms = 800): Promise<T> {
//   return new Promise((resolve) => setTimeout(() => resolve(value), ms));
// }

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  return delay(MOCK_OVERVIEW);
}

/** Simulates POST /notes — a per-semester free-text note, visible only to the student. */
export async function saveQuickNote(
  note: string,
): Promise<{ note: string; savedAt: string }> {
  return delay({ note, savedAt: new Date().toISOString() });
}
