import App_Bottom_Sheet_Modal from "@/components/app_ui/App_Bottom_Sheet_Modal";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { Ref } from "react";
import { View } from "react-native";

interface WhyImportantSheetProps {
  ref: Ref<BottomSheetModal>;
  onDismiss: () => void;
}

export default function Why_Important_Modal({
  onDismiss,
  ref,
}: WhyImportantSheetProps) {
  return (
    <App_Bottom_Sheet_Modal
      ref={ref}
      onClose={onDismiss}
      detached
      // snapPoints={["20%"]}
    >
      <View className="items-center">
        <View className="w-14 h-14 rounded-full bg-primary/30 items-center justify-center mb-4">
          <Ionicons
            name="information-circle-outline"
            size={28}
            color={"#FF8A72"}
          />
        </View>

        <App_Text className="text-xl font-bold text-text mb-2 text-center">
          Why is this important?
        </App_Text>

        <App_Text className="text-text-secondary text-center mb-6">
          Your grading system affects how your GPA and CGPA are calculated
          across all semesters.
        </App_Text>

        <App_Button title="Got it" onPress={onDismiss} className="w-full" />
      </View>
    </App_Bottom_Sheet_Modal>
  );
}
