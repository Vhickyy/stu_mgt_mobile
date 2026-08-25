import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, TextInputChangeEvent, View } from "react-native";
import {
  useResendVerifyEmailMutation,
  useVerifyEmailMutation,
} from "../auth_api/auth_mutations";
import { AuthErrorContent, getAuthErrorContent } from "../auth_api/authErrors";
import Success_Error_Modal from "../auth_modals/Success_Error_Modal";
import Auth_Layout from "../auth_view_components/Auth_Layout";

const Verify_Email_View = () => {
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [errorContent, setErrorContent] = useState<AuthErrorContent | null>(
    null,
  );
  const authModalRef = useRef<BottomSheetModal>(null);
  if (!email) {
    router.back();
    return null;
  }

  const updateOtp = (event: TextInputChangeEvent) => {
    if (event.nativeEvent.text.length > 6) return;
    setOtp(event.nativeEvent.text.trim());
  };

  const { mutate, isPending } = useResendVerifyEmailMutation();
  const { mutate: verifyMutate, isPending: verifyPending } =
    useVerifyEmailMutation();

  const resendCode = () => {
    Keyboard.dismiss();
    mutate(
      { email },
      {
        onSuccess: (res) => {
          console.log(res?.data?.data?.otp);

          setCount(60);
          setToken(res?.data?.data?.token);
        },
        onError: (error) => {
          console.log({ error });

          setErrorContent(getAuthErrorContent(error));
          authModalRef.current?.present();
        },
      },
    );
  };

  const verifyCode = () => {
    Keyboard.dismiss();
    verifyMutate(
      { token, otp },
      {
        onSuccess: (res) => {
          setTimeout(() => {
            router.push("/(auth)/Sign_In");
          }, 1000);
        },
        onError: (error) => {
          console.log({ error });

          setErrorContent(getAuthErrorContent(error));
          authModalRef.current?.present();
        },
      },
    );
  };

  useEffect(() => {
    if (!count) return;
    const interval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <Auth_Layout
      title={verifyPending ? "Loading" : "Verify Email"}
      subText={`Enter code sent to ${email}.`}
      btnText="Verify Email"
      onPress={verifyCode}
      disabled={otp.length < 6 || isPending || verifyPending}
      belowButtonText={
        <View className="flex-row w-full justify-between mt-4">
          <App_Text variant="bodySmall">
            Didn't get a mail?{" "}
            <App_Text
              variant="bodySmall"
              className="text-primary"
              style={{ fontWeight: 600 }}
              onPress={!count ? resendCode : () => {}}
            >
              {count ? `00:${count < 10 ? `0${count}` : count}` : "Resend"}
            </App_Text>
          </App_Text>
        </View>
      }
    >
      <View className="gap-4 mt-4 w-full">
        <App_Input
          value={otp}
          onChange={updateOtp}
          label="Enter OTP"
          placeholder="1 2 3 4 5 6"
          keyboardType="numeric"
        />
      </View>
      {/* {errorContent && ( */}
      <Success_Error_Modal
        message={errorContent?.message!}
        onDismiss={() => authModalRef.current?.dismiss()}
        ref={authModalRef}
        title={errorContent?.title!}
        buttonLabel="Log In"
        showBtn={errorContent?.title == "Account Already Verified."}
        onButtonPress={() => router.push("/(auth)/Sign_In")}
      />
      {/* )} */}
    </Auth_Layout>
  );
};

export default Verify_Email_View;
