import { Stack } from "expo-router";

export default function CoursesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-course" />
      <Stack.Screen name="course-id" />
    </Stack>
  );
}
