import App_Text from "@/components/app_ui/App_Text";
import React from "react";
import { Pressable, View } from "react-native";
import { QuickOverviewStats } from "../overview_types";

interface QuickOverviewGridProps {
  stats: QuickOverviewStats;
  onViewAll: () => void;
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-1 items-center">
      <App_Text variant="title" className="text-text">
        {value}
      </App_Text>
      <App_Text variant="caption" className="text-text-secondary mt-0.5">
        {label}
      </App_Text>
    </View>
  );
}

export default function Quick_Overview_Grid({
  stats,
  onViewAll,
}: QuickOverviewGridProps) {
  return (
    <View className="bg-surface rounded-2xl border border-border p-4">
      <View className="flex-row items-center justify-between mb-4">
        <App_Text variant="subtitle" className="text-text">
          Quick Overview
        </App_Text>
        <Pressable onPress={onViewAll}>
          <App_Text variant="bodySmall" className="text-primary font-medium">
            View all
          </App_Text>
        </Pressable>
      </View>

      <View className="flex-row">
        <StatCell label="Courses" value={stats.courses} />
        <StatCell label="Completed" value={stats.completed} />
        <StatCell label="In Progress" value={stats.inProgress} />
        <StatCell label="Results In" value={stats.resultsIn} />
      </View>
    </View>
  );
}
