import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAcademicProfile,
  saveAcademicProfile,
  skipAcademicProfile,
} from "../academic_info_data";
import { SaveAcademicProfileInput } from "../academic_info_types";

export const academicProfileKeys = {
  all: ["academic-profile"] as const,
};

export function useAcademicProfile() {
  return useQuery({
    queryKey: academicProfileKeys.all,
    queryFn: fetchAcademicProfile,
  });
}

export function useSaveAcademicProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SaveAcademicProfileInput) => saveAcademicProfile(input),
    onSuccess: (data) =>
      queryClient.setQueryData(academicProfileKeys.all, data),
  });
}

export function useSkipAcademicProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => skipAcademicProfile(),
    onSuccess: (data) =>
      queryClient.setQueryData(academicProfileKeys.all, data),
  });
}
