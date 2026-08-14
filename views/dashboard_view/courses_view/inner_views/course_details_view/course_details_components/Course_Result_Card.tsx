import App_Text from "@/components/app_ui/App_Text";
import { CourseResult } from "@/views/dashboard_view/results_view/result_view_types/imdex";
import React from "react";
import { View } from "react-native";

interface CourseResultCardProps {
  result: CourseResult;
}

export default function Course_Result_Card({ result }: CourseResultCardProps) {
  return (
    <View className="bg-surface rounded-2xl border border-border p-4">
      <App_Text variant="subtitle" className="text-text mb-3">
        Result
      </App_Text>

      <View className="flex-row justify-between mb-2">
        <App_Text variant="bodySmall" className="text-text-secondary">
          Score
        </App_Text>
        <App_Text variant="bodySmall" className="text-text font-medium">
          {result.score}/100
        </App_Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <App_Text variant="bodySmall" className="text-text-secondary">
          Grade
        </App_Text>
        <App_Text variant="bodySmall" className="text-text font-medium">
          {result.grade}
        </App_Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <App_Text variant="bodySmall" className="text-text-secondary">
          Grade Points
        </App_Text>
        <App_Text variant="bodySmall" className="text-text font-medium">
          {result.gradePoints.toFixed(2)}
        </App_Text>
      </View>

      {result.note && (
        <View className="mt-2 pt-3 border-t border-border">
          <App_Text variant="caption" className="text-text-secondary">
            Note
          </App_Text>
          <App_Text variant="bodySmall" className="text-text mt-1">
            {result.note}
          </App_Text>
        </View>
      )}
    </View>
  );
}
