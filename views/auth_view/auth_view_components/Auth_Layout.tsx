import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import React, { ReactNode } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const Auth_Layout = ({
  children,
  title,
  subText,
  btnText,
  belowButtonText,
  onPress,
  disabled,
}: {
  children: ReactNode;
  title: string;
  subText: string;
  btnText: string;
  belowButtonText?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <ImageBackground
      source={require("@/assets/images/main/auth_bg.png")}
      className="flex-1 w-full"
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("@/assets/images/main/student_hub.png")}
            className="w-52 h-16 mb-2"
            resizeMode="contain"
          />
          <App_Text variant="heading">{title}</App_Text>
          <App_Text variant="bodySmall">{subText}</App_Text>
          {children}
          <App_Button
            title={btnText}
            onPress={onPress}
            className="mt-6 w-full"
            disabled={disabled}
          />
          {belowButtonText}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Auth_Layout;
