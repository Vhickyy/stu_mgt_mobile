import App_Text from "@/components/app_ui/App_Text";
import { cn } from "@/libs/cn";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

interface CoursesPillProps {
  academicYear: string;
  semester: string;
  isCurrent: boolean;
  onPress: () => void;
}

export default function Course_Pill({
  academicYear,
  semester,
  isCurrent,
  onPress,
}: CoursesPillProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3"
    >
      <View className="flex-row items-center gap-2">
        <Feather name="calendar" size={16} color="#7B6A64" />
        <App_Text variant="bodySmall" className="text-text font-medium">
          {academicYear} • {semester}
        </App_Text>

        <View
          className={cn(
            "rounded-full px-2 py-0.5 ml-1",
            isCurrent ? "bg-success/10" : "bg-muted/15",
          )}
        >
          <App_Text
            variant="caption"
            className={cn(
              "font-medium",
              isCurrent ? "text-success" : "text-text-secondary",
            )}
          >
            {isCurrent ? "Current" : "Completed"}
          </App_Text>
        </View>
      </View>

      <Feather name="chevron-down" size={16} color="#A89790" />
    </Pressable>
  );
}
