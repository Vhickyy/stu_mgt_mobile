import App_Text from "@/components/app_ui/App_Text";
import React from "react";
import { View } from "react-native";
import { ResultsStats } from "../result_view_types/imdex";

interface ResultsStatsRowProps {
  stats: ResultsStats;
  gpaScale: number;
}

function StatCell({ label, value }: { label: string; value: string }) {
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

export default function ResultsStatsRow({
  stats,
  gpaScale,
}: ResultsStatsRowProps) {
  return (
    <View className="flex-row bg-surface rounded-2xl border border-border p-4">
      <StatCell label="Courses" value={String(stats.totalCourses)} />
      <StatCell label="Entered" value={String(stats.entered)} />
      <StatCell label="Pending" value={String(stats.pending)} />
      <StatCell
        label="GPA"
        value={
          stats.gpa !== null
            ? `${stats.gpa.toFixed(2)}/${gpaScale.toFixed(2)}`
            : "—"
        }
      />
    </View>
  );
}
