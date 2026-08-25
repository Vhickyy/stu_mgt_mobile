import { RegisterSchema } from "../auth_schema";

export interface IRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  profile: Partial<RegisterSchema>;
}
