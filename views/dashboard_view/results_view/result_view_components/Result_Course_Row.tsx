import App_Text from "@/components/app_ui/App_Text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { CourseWithResult } from "../result_view_types/imdex";

interface ResultCourseRowProps {
  course: CourseWithResult;
  isCurrent: boolean;
  onPress: () => void;
}

function gradeColor(grade: string): string {
  if (grade.startsWith("A")) return "#22C55E";
  if (grade.startsWith("B")) return "#6366F1";
  if (grade.startsWith("C")) return "#F59E0B";
  return "#EF4444";
}

export default function Result_Course_Row({
  course,
  isCurrent,
  onPress,
}: ResultCourseRowProps) {
  const hasResult = course.result !== null;
  const interactive = hasResult || isCurrent; // pending + past period = nothing to tap into

  return (
    <Pressable
      onPress={interactive ? onPress : undefined}
      className="flex-row items-center justify-between bg-surface rounded-2xl border border-border p-4 mb-3"
    >
      <View className="flex-1">
        <App_Text variant="body" className="text-text font-medium">
          {course.title}
        </App_Text>
        <App_Text variant="caption" className="text-text-secondary mt-0.5">
          {course.code}
        </App_Text>
      </View>

      {hasResult ? (
        <View
          className="rounded-full px-2.5 py-1"
          style={{ backgroundColor: `${gradeColor(course.result!.grade)}1A` }}
        >
          <App_Text
            variant="caption"
            className="font-semibold"
            style={{ color: gradeColor(course.result!.grade) }}
          >
            {course.result!.grade}
          </App_Text>
        </View>
      ) : isCurrent ? (
        <View className="flex-row items-center gap-1">
          <App_Text variant="bodySmall" className="text-primary font-medium">
            Enter Result
          </App_Text>
          <Feather name="chevron-right" size={14} color="#FF8A72" />
        </View>
      ) : (
        <App_Text variant="caption" className="text-muted">
          No result
        </App_Text>
      )}
    </Pressable>
  );
}
