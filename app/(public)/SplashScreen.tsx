import React from "react";
import { Image, View } from "react-native";

const SplashScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("@/assets/images/main/student_hub.png")}
        className="h-24 w-80"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
