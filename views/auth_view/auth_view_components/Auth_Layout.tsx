import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import React, { ReactNode } from "react";
import { Image, ImageBackground, View } from "react-native";

const Auth_Layout = ({
  children,
  title,
  subText,
  btnText,
  belowButtonText,
}: {
  children: ReactNode;
  title: string;
  subText: string;
  btnText: string;
  belowButtonText?: ReactNode;
}) => {
  return (
    <ImageBackground
      source={require("@/assets/images/main/auth_bg.png")}
      className="flex-1 w-full"
      resizeMode="cover"
    >
      <View className="flex-1 mt-24 items-center px-5">
        <Image
          source={require("@/assets/images/main/student_hub.png")}
          className="w-52 h-16 mb-2"
          resizeMode="contain"
        />
        <App_Text variant="heading">{title}</App_Text>
        <App_Text variant="bodySmall">{subText}</App_Text>
        {children}
        <App_Button title={btnText} className="mt-10 w-full" />
        {belowButtonText}
      </View>
    </ImageBackground>
  );
};

export default Auth_Layout;
