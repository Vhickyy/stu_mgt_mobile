import { Semester } from "../../grading_view/inner_views/academic_info_view/academic_info_types";

export interface SemesterRecord {
  id: string;
  academicYear: string;
  semester: Semester;
  startDate: string; // ISO
  endDate: string; // ISO
  isCurrent: boolean;
}

export interface QuickOverviewStats {
  courses: number;
  completed: number;
  inProgress: number;
  resultsIn: number;
}

export interface UpcomingClass {
  courseTitle: string;
  courseCode: string;
  room: string;
  startTime: string;
  endTime: string;
  minutesUntil: number;
}

export interface AttendanceSummary {
  percent: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

export interface DashboardOverview {
  cgpa: number;
  cgpaScale: number;
  standing: string; // "Good Standing"
  totalUnitsRegistered: number;
  quickOverview: QuickOverviewStats;
  upcomingClass: UpcomingClass | null;
  attendance: AttendanceSummary;
}
