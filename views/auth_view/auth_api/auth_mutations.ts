import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  loginStudent,
  resendStudentVerifyEmailOtp,
  verifyStudentEmail,
} from "./auth_api";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    // staleTime: 0,
    // gcTime: 0,
    // refetchOnMount: "always",
    // refetchOnWindowFocus: false,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginStudent,
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: verifyStudentEmail,
  });
};

export const useResendVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: resendStudentVerifyEmailOtp,
  });
};
