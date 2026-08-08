export interface DashboardUser {
  id: string;
  firstName: string;
  avatarUrl: string;
  unreadNotifications: number;
}

export interface TodayClasses {
  count: number;
  startTime: string; // e.g. "10:00 AM"
  endTime: string; // e.g. "1:00 PM"
}

export interface DashboardStats {
  cgpa: {
    value: string;
    updatedAgo: string; // e.g. "2 days ago"
  };
  attendance: {
    percent: number;
    note: string; // e.g. "Good job!"
  };
  activeCourses: number;
  uploadedResults: number;
}

export interface SemesterProgress {
  label: string; // e.g. "6th Semester"
  weeksCompleted: number;
  totalWeeks: number;
  message: string;
}

export type UpcomingItemType = "lecture" | "tutorial" | "lab" | "exam";

export interface UpcomingEvent {
  id: string;
  month: string; // "MAY"
  day: string; // "20"
  title: string;
  type: UpcomingItemType;
  startTime: string;
  endTime: string;
  durationLabel: string; // "2h 15m"
  colorTheme: "orange" | "purple" | "green" | "blue";
}

export interface DashboardResponse {
  user: DashboardUser;
  todayClasses: TodayClasses;
  stats: DashboardStats;
  semesterProgress: SemesterProgress;
  upcoming: UpcomingEvent[];
}
