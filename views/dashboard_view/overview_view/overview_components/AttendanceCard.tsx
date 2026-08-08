import App_Text from "@/components/app_ui/App_Text";
import React from "react";
import { Pressable, View } from "react-native";
import { AttendanceSummary } from "../overview_types";
import CircularProgress from "./Circular";

interface AttendanceCardProps {
  attendance: AttendanceSummary;
  onViewPress: () => void;
}

function BreakdownRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View className="flex-row items-center justify-between py-1">
      <View className="flex-row items-center gap-2">
        <View
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <App_Text variant="bodySmall" className="text-text-secondary">
          {label}
        </App_Text>
      </View>
      <App_Text variant="bodySmall" className="text-text font-medium">
        {value}
      </App_Text>
    </View>
  );
}

export default function Attendance_Card({
  attendance,
  onViewPress,
}: AttendanceCardProps) {
  return (
    <View className="bg-surface rounded-2xl border border-border p-4">
      <View className="flex-row items-center justify-between mb-4">
        <App_Text variant="subtitle" className="text-text">
          Attendance This Semester
        </App_Text>
        <Pressable onPress={onViewPress}>
          <App_Text variant="bodySmall" className="text-primary font-medium">
            View
          </App_Text>
        </Pressable>
      </View>

      <View className="flex-row items-center gap-5">
        <CircularProgress percent={attendance.percent} color="#22C55E">
          <App_Text variant="title" className="text-text">
            {attendance.percent}%
          </App_Text>
          <App_Text variant="caption" className="text-text-secondary">
            Present
          </App_Text>
        </CircularProgress>

        <View className="flex-1">
          <BreakdownRow
            label="Present"
            value={attendance.present}
            color="#22C55E"
          />
          <BreakdownRow
            label="Absent"
            value={attendance.absent}
            color="#EF4444"
          />
          <BreakdownRow label="Late" value={attendance.late} color="#F59E0B" />
          <BreakdownRow
            label="Excused"
            value={attendance.excused}
            color="#6366F1"
          />
        </View>
      </View>
    </View>
  );
}
