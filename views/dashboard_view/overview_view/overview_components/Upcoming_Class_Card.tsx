import App_Text from "@/components/app_ui/App_Text";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { UpcomingClass } from "../overview_types";

interface UpcomingClassCardProps {
  upcomingClass: UpcomingClass;
  onPress: () => void;
}

export default function Upcoming_Class_Card({
  upcomingClass,
  onPress,
}: UpcomingClassCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between bg-surface rounded-2xl border border-border p-4"
    >
      <View className="flex-row items-center gap-3 flex-1">
        <View className="w-11 h-11 rounded-full bg-secondary-light items-center justify-center">
          <Ionicons name="calendar-outline" size={20} color="#F97360" />
        </View>

        <View className="flex-1">
          <App_Text variant="caption" className="text-text-secondary">
            Upcoming Class
          </App_Text>
          <App_Text variant="bodySmall" className="text-text-secondary mt-0.5">
            {upcomingClass.startTime} – {upcomingClass.endTime}
          </App_Text>
          <App_Text variant="subtitle" className="text-text mt-0.5">
            {upcomingClass.courseTitle} ({upcomingClass.courseCode})
          </App_Text>
          <App_Text variant="caption" className="text-text-secondary mt-0.5">
            Room {upcomingClass.room}
          </App_Text>
        </View>
      </View>

      <App_Text variant="caption" className="text-primary font-medium">
        In {upcomingClass.minutesUntil} mins
      </App_Text>
    </Pressable>
  );
}
