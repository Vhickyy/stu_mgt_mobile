import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={[]}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign_In" />
        <Stack.Screen name="Sign_Up" />
        <Stack.Screen name="Verify_Email" />
        {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;
