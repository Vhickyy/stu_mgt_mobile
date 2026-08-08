import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGradingSystem, saveGradingSystem } from "../grading_data";
import { SaveGradingSystemInput } from "../grading_types";

export const gradingKeys = {
  all: ["grading-system"] as const,
};

export function useGradingSystem() {
  return useQuery({
    queryKey: gradingKeys.all,
    queryFn: fetchGradingSystem,
  });
}

export function useSaveGradingSystem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SaveGradingSystemInput) => saveGradingSystem(input),
    onSuccess: (data) => {
      queryClient.setQueryData(gradingKeys.all, data);
    },
  });
}
