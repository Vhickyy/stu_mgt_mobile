import App_Text from "@/components/app_ui/App_Text";
import React from "react";
import { Pressable, View } from "react-native";

interface OverviewStatsRowProps {
  cgpa: number;
  cgpaScale: number;
  standing: string;
  totalUnits: number;
  onPressCgpa: () => void;
}

export default function Overview_Stats_Row({
  cgpa,
  cgpaScale,
  standing,
  totalUnits,
  onPressCgpa,
}: OverviewStatsRowProps) {
  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={onPressCgpa}
        className="flex-1 bg-surface rounded-2xl border border-border p-4"
      >
        <App_Text variant="caption" className="text-text-secondary mb-1">
          CGPA (Cumulative)
        </App_Text>
        <App_Text variant="heading" className="text-text">
          {cgpa.toFixed(2)}{" "}
          <App_Text variant="bodySmall" className="text-text-secondary">
            / {cgpaScale.toFixed(2)}
          </App_Text>
        </App_Text>
        <App_Text variant="caption" className="text-success font-medium mt-1">
          {standing}
        </App_Text>
      </Pressable>

      <View className="flex-1 bg-surface rounded-2xl border border-border p-4">
        <App_Text variant="caption" className="text-text-secondary mb-1">
          Total Units
        </App_Text>
        <App_Text variant="heading" className="text-text">
          {totalUnits}
        </App_Text>
        <App_Text variant="caption" className="text-text-secondary mt-1">
          Registered
        </App_Text>
      </View>
    </View>
  );
}
