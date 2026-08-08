import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <View className="h-[50%]">
        <Image
          source={require("@/assets/images/main/onboarding.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="px-6 flex-1 mb-12 justify-between">
        <View>
          <App_Text variant="heading">
            Your academic success, organized.
          </App_Text>
          <App_Text>
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
