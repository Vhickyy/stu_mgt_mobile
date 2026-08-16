import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="courses/[id]"
          options={{ title: "Course Details" }}
        />
        <Stack.Screen
          name="courses/add"
          options={{ title: "Course Details" }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
