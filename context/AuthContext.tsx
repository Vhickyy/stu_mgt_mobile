import { useGetCurrentUser } from "@/views/auth_view/auth_api/auth_mutations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

type User = {
  id: string;
  //   email: string;
  name?: string;
  //   emailVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  //   token: string | null;
  isLoading: boolean;
  //   refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetCurrentUser();
  useEffect(() => {
    const bootstrapAuth = async () => {
      await AsyncStorage.getItem("access_token");
      // await AsyncStorage.clear();
      //   const storedToken = await AsyncStorage.removeItem("access_token");
    };

    bootstrapAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data ?? null, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
