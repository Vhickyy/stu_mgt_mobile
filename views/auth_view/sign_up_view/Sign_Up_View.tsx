import App_Text from "@/components/app_ui/App_Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import { AuthErrorContent, getAuthErrorContent } from "../auth_api/authErrors";
import Success_Error_Modal from "../auth_modals/Success_Error_Modal";
import { RegisterSchema, registerSchema } from "../auth_schema";
import Auth_Layout from "../auth_view_components/Auth_Layout";
import Personal_Form from "./sign_up_components/Personal_Form";
import Step_Progress from "./sign_up_components/Step_Progress";
import University_Form from "./sign_up_components/University_Form";
import { useSignUpMutation } from "./sign_up_hook/useSignUpApi";

const Sign_Up_View = () => {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const [steps, setSteps] = useState(0);
  const { mutate, isPending } = useSignUpMutation();
  const [password] = watch(["password"]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const authModalRef = useRef<BottomSheetModal>(null);
  const [errorContent, setErrorContent] = useState<AuthErrorContent | null>(
    null,
  );

  const isStepOneValid =
    password === confirmPassword &&
    !errors.fullName &&
    !errors.email &&
    !errors.password;

  const isConfirmPasswordValid = confirmPassword === password;

  const confirmPasswordError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? "Passwords do not match"
      : undefined;

  const handleProceed = async () => {
    if (isStepOneValid) {
      setSteps(1);
    }
  };

  const onSubmit = (data: RegisterSchema) => {
    Keyboard.dismiss();
    const { email, password, ...rest } = data;
    const formData = { email, password, confirmPassword, profile: rest };

    mutate(formData, {
      onSuccess: (response) => {
        router.push({
          pathname: "/(auth)/Verify_Email",
          params: {
            email: getValues("email"),
          },
        });
      },
      onError: (error: any) => {
        setErrorContent(getAuthErrorContent(error));
        authModalRef.current?.present();
      },
    });
  };

  return (
    <>
      <Auth_Layout
        title="Create Account"
        subText="Create your academic journey."
        btnText={
          steps == 0 ? "Proceed" : isPending ? "Loading" : "Create Account"
        }
        onPress={steps == 0 ? handleProceed : handleSubmit(onSubmit)}
        disabled={steps == 0 ? !isStepOneValid : !isValid || isPending}
        belowButtonText={
          <App_Text variant="caption" className="mt-2">
            Have an account?
            <App_Text
              variant="caption"
              className="text-primary"
              style={{ fontWeight: 600 }}
              onPress={() => router.push("/(auth)/Sign_In")}
            >
              sign in.
            </App_Text>
          </App_Text>
        }
      >
        <Step_Progress currentStep={steps} />
        <View className="gap-3 mt-6 w-full">
          {steps == 0 ? (
            <Personal_Form
              control={control}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isConfirmPasswordValid={isConfirmPasswordValid}
              confirmPasswordError={confirmPasswordError}
            />
          ) : (
            <University_Form control={control} />
          )}
        </View>
      </Auth_Layout>
      <Success_Error_Modal
        message={errorContent?.message!}
        onDismiss={() => authModalRef.current?.dismiss()}
        ref={authModalRef}
        title={errorContent?.title!}
      />
    </>
  );
};

export default Sign_Up_View;
