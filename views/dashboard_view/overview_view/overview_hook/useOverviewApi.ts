import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDashboardOverview, saveQuickNote } from "../overview_data";

export const dashboardOverviewKeys = {
  all: ["dashboard-overview"] as const,
};

export function useDashboardOverview() {
  return useQuery({
    queryKey: dashboardOverviewKeys.all,
    queryFn: fetchDashboardOverview,
  });
}

export function useSaveQuickNote() {
  return useMutation({
    mutationFn: (note: string) => saveQuickNote(note),
  });
}

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { SaveAcademicProfileInput } from "../../grading_view/inner_views/academic_info_view/academic_info_types";
// import {
//   fetchAcademicProfile,
//   fetchSemesterRecords,
//   saveAcademicProfile,
//   setCurrentSemester,
//   skipAcademicProfile,
// } from "../overview_data";

// export const academicProfileKeys = {
//   all: ["academic-profile"] as const,
// };

// export const semesterRecordKeys = {
//   all: ["semester-records"] as const,
// };

// export function useAcademicProfile() {
//   return useQuery({
//     queryKey: academicProfileKeys.all,
//     queryFn: fetchAcademicProfile,
//   });
// }

// export function useSaveAcademicProfile() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (input: SaveAcademicProfileInput) => saveAcademicProfile(input),
//     onSuccess: (data) =>
//       queryClient.setQueryData(academicProfileKeys.all, data),
//   });
// }

// export function useSkipAcademicProfile() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => skipAcademicProfile(),
//     onSuccess: (data) =>
//       queryClient.setQueryData(academicProfileKeys.all, data),
//   });
// }

// export function useSemesterRecords() {
//   return useQuery({
//     queryKey: semesterRecordKeys.all,
//     queryFn: fetchSemesterRecords,
//   });
// }

// export function useSetCurrentSemester() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => setCurrentSemester(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: semesterRecordKeys.all });
//       queryClient.invalidateQueries({ queryKey: academicProfileKeys.all });
//     },
//   });
// }
