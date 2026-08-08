import App_Text from "@/components/app_ui/App_Text";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";

interface DashboardSessionPillProps {
  academicYear: string;
  semester: string;
}

export default function Overview_Pill({
  academicYear,
  semester,
}: DashboardSessionPillProps) {
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <View className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3">
        <View className="flex-row items-center gap-2">
          <Feather name="calendar" size={16} color="#7B6A64" />
          <App_Text variant="bodySmall" className="text-text font-medium">
            {academicYear} • {semester}
          </App_Text>
        </View>

        <Pressable onPress={() => sheetRef.current?.present()}>
          <App_Text variant="bodySmall" className="text-primary font-medium">
            Change
          </App_Text>
        </Pressable>
      </View>

      {/* <ChangeSemesterSheet
        ref={sheetRef}
        onDismiss={() => sheetRef.current?.dismiss()}
      /> */}
    </>
  );
}
