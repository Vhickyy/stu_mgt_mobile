import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <View className="h-[55%]">
        <Image
          source={require("@/assets/images/main/onboarding.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="px-6 flex-1 justify-center gap-12">
        <View className="gap-2">
          <Image
            source={require("@/assets/images/main/student_hub.png")}
            className="w-56 h-16 mx-auto"
            resizeMode="contain"
          />
          <App_Text variant="title" className="text-center">
            Your academic success, organized.
          </App_Text>
          <App_Text className="text-center">
            Manage your classes, track your progress, and achieve your goals all
            in one place.
          </App_Text>
        </View>

        <App_Button
          title="Get Started"
          onPress={() => router.push("/Grading_System")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
