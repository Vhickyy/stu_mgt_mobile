import App_Text from "@/components/app_ui/App_Text";
import { COLORS } from "@/constants/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

const Overview_Header = () => {
  return (
    <View className="flex-row items-center justify-between pt-2 pb-4">
      <Pressable
        onPress={() => {}}
        className="w-10 h-10 items-center justify-center"
      >
        <Feather name="menu" size={20} color={COLORS.text} />
      </Pressable>
      <App_Text variant="subtitle" className="text-text">
        Dashboard
      </App_Text>
      <Pressable
        onPress={() => {}}
        className="w-10 h-10 items-center justify-center"
      >
        <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
      </Pressable>
    </View>
  );
};

export default Overview_Header;
