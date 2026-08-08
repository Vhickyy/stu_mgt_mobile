// -----------------------------------------------------------------------
// FAKE API — swap this file's internals for a real fetch/axios call once
// the backend endpoint exists. Keep the function signature the same so
// nothing else in the app needs to change.
// -----------------------------------------------------------------------

import { DashboardResponse } from "../home_types";

const MOCK_DASHBOARD: DashboardResponse = {
  user: {
    id: "usr_001",
    firstName: "Victoria",
    avatarUrl: "https://i.pravatar.cc/100?img=47",
    unreadNotifications: 3,
  },
  todayClasses: {
    count: 2,
    startTime: "10:00 AM",
    endTime: "1:00 PM",
  },
  stats: {
    cgpa: {
      value: "3.72",
      updatedAgo: "2 days ago",
    },
    attendance: {
      percent: 87,
      note: "Good job!",
    },
    activeCourses: 6,
    uploadedResults: 4,
  },
  semesterProgress: {
    label: "6th Semester",
    weeksCompleted: 8,
    totalWeeks: 14,
    message: "You're doing great! Keep it up.",
  },
  upcoming: [
    {
      id: "evt_001",
      month: "MAY",
      day: "20",
      title: "Data Structures",
      type: "lecture",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      durationLabel: "2h 15m",
      colorTheme: "orange",
    },
    {
      id: "evt_002",
      month: "MAY",
      day: "20",
      title: "Linear Algebra",
      type: "tutorial",
      startTime: "1:00 PM",
      endTime: "3:00 PM",
      durationLabel: "2h",
      colorTheme: "purple",
    },
  ],
};

function delay<T>(value: T, ms = 900): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * Simulates GET /dashboard
 * Replace the body with a real request, e.g.:
 *   const res = await api.get<DashboardResponse>("/dashboard");
 *   return res.data;
 */
export async function fetchDashboard(): Promise<DashboardResponse> {
  // Uncomment to test the error state in the UI:
  // return delay(Promise.reject(new Error("Failed to load dashboard")), 900);

  return delay(MOCK_DASHBOARD);
}
