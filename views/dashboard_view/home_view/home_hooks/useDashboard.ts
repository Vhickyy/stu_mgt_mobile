import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../home_data";

export const dashboardKeys = {
  all: ["dashboard"] as const,
};

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.all,
    queryFn: fetchDashboard,
    staleTime: 1000 * 60,
  });
}
