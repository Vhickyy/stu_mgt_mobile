import App_Bottom_Sheet_Modal from "@/components/app_ui/App_Bottom_Sheet_Modal";
import App_Text from "@/components/app_ui/App_Text";
import { cn } from "@/libs/cn";
import { Feather } from "@expo/vector-icons";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { Ref } from "react";
import { Pressable, View } from "react-native";
import { useSemesterHistory } from "../../grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import { SemesterHistoryEntry } from "../../grading_view/inner_views/academic_info_view/academic_info_types";

interface WhyImportantSheetProps {
  ref: Ref<BottomSheetModal>;
  selectedId: string | null;
  onDismiss: () => void;
  onSelect: (entry: SemesterHistoryEntry) => void;
}

export default function Semester_History_Modal({
  onDismiss,
  selectedId,
  onSelect,
  ref,
}: WhyImportantSheetProps) {
  const { data: history } = useSemesterHistory();

  // Most recent first, so "Current" naturally sits at the top.
  const sorted = [...(history ?? [])].reverse();
  return (
    <App_Bottom_Sheet_Modal
      ref={ref}
      onClose={onDismiss}
      snapPoints={["20%", "50%"]}
    >
      <App_Text variant="title" className="text-text mb-4">
        Switch Semester
      </App_Text>

      <BottomSheetFlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;
          return (
            <Pressable
              onPress={() => onSelect(item)}
              className={cn(
                "flex-row items-center justify-between rounded-xl px-4 py-3 mb-2",
                isSelected ? "bg-secondary-light" : "bg-surface-soft",
              )}
            >
              <View>
                <App_Text variant="body" className="text-text font-medium">
                  {item.academicYear} • {item.semester}
                </App_Text>
                <App_Text
                  variant="caption"
                  className={
                    item.isCurrent ? "text-success" : "text-text-secondary"
                  }
                >
                  {item.isCurrent ? "Current" : "Completed"}
                </App_Text>
              </View>

              {isSelected && <Feather name="check" size={18} color="#FF8A72" />}
            </Pressable>
          );
        }}
      />
    </App_Bottom_Sheet_Modal>
  );
}
