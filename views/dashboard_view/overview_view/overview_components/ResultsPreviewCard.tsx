import App_Text from "@/components/app_ui/App_Text";
import { cn } from "@/libs/cn";
import React from "react";
import { Pressable, View } from "react-native";
import { RecentResult } from "../overview_types";

interface ResultsPreviewCardProps {
  results: RecentResult[];
  onViewAll: () => void;
}

function gradeColor(grade: string): string {
  if (grade.startsWith("A")) return "#22C55E";
  if (grade.startsWith("B")) return "#6366F1";
  if (grade.startsWith("C")) return "#F59E0B";
  return "#EF4444";
}

function ResultRow({ result }: { result: RecentResult }) {
  const color = gradeColor(result.grade);

  return (
    <View className="flex-row items-center justify-between py-2.5">
      <View className="flex-1">
        <App_Text variant="body" className="text-text font-medium">
          {result.courseTitle}
        </App_Text>
        <App_Text variant="caption" className="text-text-secondary mt-0.5">
          {result.courseCode}
        </App_Text>
      </View>

      <View className="items-end">
        <View
          className="rounded-full px-2.5 py-1"
          style={{ backgroundColor: `${color}1A` }}
        >
          <App_Text
            variant="caption"
            className="font-semibold"
            style={{ color }}
          >
            {result.grade}
          </App_Text>
        </View>
        <App_Text variant="caption" className="text-text-secondary mt-0.5">
          {result.gradePoints.toFixed(2)} pts
        </App_Text>
      </View>
    </View>
  );
}

export default function ResultsPreviewCard({
  results,
  onViewAll,
}: ResultsPreviewCardProps) {
  return (
    <View className="bg-surface rounded-2xl border border-border p-4">
      <View className="flex-row items-center justify-between mb-1">
        <App_Text variant="subtitle" className="text-text">
          Recent Results
        </App_Text>
        <Pressable onPress={onViewAll}>
          <App_Text variant="bodySmall" className="text-primary font-medium">
            View all
          </App_Text>
        </Pressable>
      </View>

      {results.length === 0 ? (
        <App_Text variant="bodySmall" className="text-text-secondary py-3">
          No results entered yet this semester.
        </App_Text>
      ) : (
        <View className={cn("divide-y divide-border")}>
          {results.map((result) => (
            <ResultRow key={result.id} result={result} />
          ))}
        </View>
      )}
    </View>
  );
}
