import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import React, { ReactNode } from "react";
import { Image, View } from "react-native";

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
    <View className="p-6 flex-1 justify-center items-center">
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-52 h-16 mb-8"
        resizeMode="contain"
      />
      <App_Text variant="heading">{title}</App_Text>
      <App_Text variant="bodySmall">{subText}</App_Text>
      {children}
      <App_Button title={btnText} className="mt-10 w-full" />
      {belowButtonText}
    </View>
  );
};

export default Auth_Layout;
