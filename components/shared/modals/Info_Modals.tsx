import App_Bottom_Sheet_Modal from "@/components/app_ui/App_Bottom_Sheet_Modal";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { InfoSheetProps } from "./modal_types";

export default function Info_Modal({
  title,
  description,
  buttonLabel = "Got it",
  onDismiss,
  onButtonPress,
  ref,
}: InfoSheetProps) {
  return (
    <App_Bottom_Sheet_Modal ref={ref} onClose={onDismiss} detached>
      <View className="items-center">
        <View className="w-14 h-14 rounded-full bg-info/10 items-center justify-center mb-4">
          <Ionicons name="information-circle" size={28} color="#6366F1" />
        </View>

        <App_Text variant="title" className="text-text mb-2 text-center">
          {title}
        </App_Text>

        <App_Text
          variant="body"
          className="text-text-secondary text-center mb-6"
        >
          {description}
        </App_Text>

        <App_Button
          title={buttonLabel}
          onPress={onButtonPress ?? onDismiss}
          className="w-full"
        />
      </View>
    </App_Bottom_Sheet_Modal>
  );
}
