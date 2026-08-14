import App_Text from "@/components/app_ui/App_Text";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const Add_Course_Header = () => {
  return (
    <View className="flex-row items-center pt-2 pb-4">
      <Pressable
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-border"
      >
        <Feather name="chevron-left" size={20} color="#2F241F" />
      </Pressable>
      <App_Text variant="title" className="text-text ml-3">
        Add Courses
      </App_Text>
    </View>
  );
};

export default Add_Course_Header;
