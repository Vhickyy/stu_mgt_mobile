import App_Form_Input from "@/components/app_ui/App_Form_Input";
import App_Text from "@/components/app_ui/App_Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import { useLoginMutation } from "../auth_api/auth_mutations";
import { AuthErrorContent, getAuthErrorContent } from "../auth_api/authErrors";
import Success_Error_Modal from "../auth_modals/Success_Error_Modal";
import { ILoginSchema, loginSchema } from "../auth_schema";
import Auth_Layout from "../auth_view_components/Auth_Layout";

type LoginForm = {
  email: string;
  password: string;
};

const Sign_In_View = () => {
  const [errorContent, setErrorContent] = useState<AuthErrorContent | null>(
    null,
  );
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const { mutate: login, isPending } = useLoginMutation();
  const authModalRef = useRef<BottomSheetModal>(null);
  const onSubmit = (values: LoginForm) => {
    Keyboard.dismiss();
    login(values, {
      onSuccess: async (res) => {
        // console.log(res?.data?.accessToken);
        await AsyncStorage.setItem("access_token", res?.data?.accessToken);
        router.push("/(root)/(tabs)");
      },
      onError: (error) => {
        setErrorContent(getAuthErrorContent(error));
        authModalRef.current?.present();
      },
    });
  };

  return (
    <>
      <Auth_Layout
        title="Welcome Back!"
        subText="Sign in to continue your academic journey."
        btnText={isPending ? "Loading..." : "Log In"}
        // onPress={() => router.push("/(auth)/Sign_Up")}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isPending}
        belowButtonText={
          <View className="flex-row justify-between w-full mt-2">
            {/* <App_Text variant="bodySmall">
              Don't have an account?{" "} */}
            <App_Text
              variant="bodySmall"
              className="text-primary "
              style={{ fontWeight: "700" }}
              onPress={() => router.push("/(auth)/Sign_Up")}
            >
              Create Account.
            </App_Text>
            {/* </App_Text> */}
            <App_Text
              variant="bodySmall"
              className="text-primary "
              style={{ fontWeight: "700" }}
            >
              Forgot Password?
            </App_Text>
          </View>
        }
      >
        <View className="gap-4 mt-4 w-full">
          <App_Form_Input
            name="email"
            control={control}
            label="Email"
            placeholder="john@email.com"
            leftIcon="mail"
          />

          <App_Form_Input
            name="password"
            control={control}
            label="Password"
            placeholder="******"
            leftIcon="lock-closed"
            secureTextEntry
          />
        </View>
      </Auth_Layout>
      <Success_Error_Modal
        message={errorContent?.message!}
        onDismiss={() => authModalRef.current?.dismiss()}
        ref={authModalRef}
        title={errorContent?.title!}
        buttonLabel="Verify Account"
        showBtn={errorContent?.title == "Unverified Account"}
        onButtonPress={() =>
          router.push({
            pathname: "/(auth)/Verify_Email",
            params: {
              email: getValues("email"),
            },
          })
        }
      />
    </>
  );
};

export default Sign_In_View;
