import App_Text from "@/components/app_ui/App_Text";
import { cn } from "@/libs/cn";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

interface GradingScaleCardProps {
  scaleLabel: string; // "4.0"
  title: string; // "4.0 Scale"
  description: string;
  badge?: string; // "Popular"
  selected: boolean;
  onPress: () => void;
}

export default function Grading_Scale_Card({
  scaleLabel,
  title,
  description,
  badge,
  selected,
  onPress,
}: GradingScaleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center gap-4 rounded-2xl border-2 p-4 mb-3 bg-surface",
        selected ? "border-primary" : "border-border",
      )}
    >
      <View className="w-14 h-14 rounded-xl bg-secondary-light items-center justify-center">
        <App_Text className="text-lg font-bold text-primary-dark">
          {scaleLabel}
        </App_Text>
      </View>

      <View className="flex-1">
        <App_Text className="text-base font-semibold text-text">
          {title}
        </App_Text>
        <App_Text className="text-sm text-text-secondary mt-0.5">
          {description}
        </App_Text>
        {badge && (
          <View className="self-start bg-secondary-light rounded-full px-2 py-0.5 mt-1.5">
            <App_Text className="text-xs font-medium text-primary-dark">
              {badge}
            </App_Text>
          </View>
        )}
      </View>

      <View
        className={cn(
          "w-6 h-6 rounded-full border-2 items-center justify-center",
          selected ? "border-primary bg-primary" : "border-border-strong",
        )}
      >
        {selected && <Feather name="check" size={14} color="white" />}
      </View>
    </Pressable>
  );
}
