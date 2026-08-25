import { BASE_URL } from "@/libs/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { IRegisterRequest } from "../../auth_types";

// ====axios call ========== //
const registerStudent = async (data: IRegisterRequest) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, data);
  return response.data;
};

const getUniversities = async ({ search }: { search: string }) => {
  const response = await axios.get(`${BASE_URL}/universities?search=${search}`);
  return response.data;
};

// Queries and Mutations
export const useUniversitiesQuery = (search: string) => {
  return useQuery({
    queryKey: ["universities", search],
    queryFn: () => getUniversities({ search }),
    enabled: search.length >= 2,
    select: (response) =>
      response.data.map(
        (university: { name: string; id: string; country: string }) => ({
          label: `${university.name}, ${university.country}`,
          value: university.id,
        }),
      ),
  });
};
//  ============ Mutations ========== //
export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: registerStudent,
  });
};

// hooks/useDebouncedValue.ts
export function useDebouncedValue<T>(value: T, delayMs: number = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
