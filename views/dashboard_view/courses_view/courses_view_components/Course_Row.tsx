import App_Text from "@/components/app_ui/App_Text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { Course } from "../courses_view_types";

interface CourseRowProps {
  course: Course;
  editable: boolean;
  onPress?: () => void;
}

export default function Course_Row({
  course,
  editable,
  onPress,
}: CourseRowProps) {
  return (
    <Pressable
      onPress={editable ? onPress : undefined}
      className="flex-row items-center justify-between bg-surface rounded-2xl border border-border p-4 mb-3"
    >
      <View className="flex-row items-center gap-3 flex-1">
        <View className="w-10 h-10 rounded-full bg-secondary-light items-center justify-center">
          <Feather name="book-open" size={16} color="#F97360" />
        </View>

        <View className="flex-1">
          <App_Text variant="body" className="text-text font-medium">
            {course.title}
          </App_Text>
          <App_Text variant="caption" className="text-text-secondary mt-0.5">
            {course.code}
          </App_Text>
        </View>
      </View>

      <View className="items-end">
        <App_Text variant="bodySmall" className="text-text-secondary">
          {course.units} Units
        </App_Text>
        {editable && (
          <Feather
            name="chevron-right"
            size={16}
            color="#A89790"
            className="mt-1"
          />
        )}
      </View>
    </Pressable>
  );
}
