import { api, BASE_URL } from "@/libs/api/api";
import axios from "axios";

export const loginStudent = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};

export const verifyStudentEmail = async (data: {
  token: string;
  otp: string;
}) => {
  const response = await axios.post(`${BASE_URL}/auth/very-email`, data);
  return response.data;
};

export const resendStudentVerifyEmailOtp = async (data: { email: string }) => {
  const response = await axios.post(`${BASE_URL}/auth/resend-email-otp`, data);
  return response.data;
};

export const forgortPassword = async (data: { email: string }) => {
  const response = await axios.post(`${BASE_URL}/auth/forgot-password`, data);
  return response.data;
};

export const getCurrentUser = async (): Promise<{
  id: string;
  name: string;
} | null> => {
  console.log("jii");
  try {
    const response = await api.get(`${BASE_URL}/auth/current-user`);
    console.log({ response: response.data });
    return response.data;
  } catch (error) {
    // console.log({ error });
    // console.log(error?.message);
    // console.log(error?.response?.status);
    // console.log(error?.response?.data);
    return null;
  }
};
