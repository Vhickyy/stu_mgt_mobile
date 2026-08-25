import { useAuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import Onboarding from "./(public)/Onboarding";
import SplashScreen from "./(public)/SplashScreen";

const Index = () => {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const { user, isLoading: authLoading } = useAuthContext();

  useEffect(() => {
    AsyncStorage.getItem("hasOnboarded").then((value) => {
      setHasOnboarded(value === "true");
    });
  }, []);
  console.log({ user });

  if (authLoading) {
    return <SplashScreen />;
  }
  if (hasOnboarded && !user) {
    return <Redirect href="/(auth)/Sign_In" />;
  }
  if (!hasOnboarded) {
    return <Onboarding />;
  }
  return <Redirect href="/(root)/(tabs)" />;
};

export default Index;
