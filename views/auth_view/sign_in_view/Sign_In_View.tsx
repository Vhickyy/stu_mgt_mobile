import App_Form_Input from "@/components/app_ui/App_Form_Input";
import App_Icon from "@/components/app_ui/App_Icon";
import App_Text from "@/components/app_ui/App_Text";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Auth_Layout from "../auth_view_components/Auth_Layout";

type LoginForm = {
  email: string;
  password: string;
};

const Sign_In_View = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Auth_Layout
        title="Welcome Back!"
        subText="Sign in to continue your academic journey."
        btnText="Log In"
        belowButtonText={
          <View className="flex-row justify-between mt-4">
            <App_Text variant="caption">
              Don't have an account?
              <App_Text variant="caption">sign up.</App_Text>
            </App_Text>
            <App_Text variant="caption">Forgot Password?</App_Text>
          </View>
        }
      >
        <View className="gap-6 mt-8 w-full">
          <App_Form_Input
            name="email"
            control={control}
            label="Email"
            placeholder="john@email.com"
            leftIcon={<App_Icon name="mail-outline" />}
          />

          <App_Form_Input
            name="password"
            control={control}
            label="Password"
            placeholder="******"
            // leftIcon={<App_Icon name="" />}
            secureTextEntry
          />
        </View>
      </Auth_Layout>
    </>
  );
};

export default Sign_In_View;
