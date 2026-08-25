import App_Form_Input from "@/components/app_ui/App_Form_Input";
import App_Input from "@/components/app_ui/App_Input";
import React from "react";
import { Control } from "react-hook-form";
import { RegisterSchema } from "../../auth_schema";

const Personal_Form = ({
  control,
  confirmPassword,
  setConfirmPassword,
  isConfirmPasswordValid,
  confirmPasswordError,
}: {
  control: Control<RegisterSchema>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  isConfirmPasswordValid: boolean;
  confirmPasswordError: string | undefined;
}) => {
  return (
    <>
      <App_Form_Input
        name="fullName"
        control={control}
        label="Full Name"
        placeholder="John Doe"
        leftIcon="person"
      />
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

      <App_Input
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        label="Confirm Password"
        placeholder="******"
        leftIcon="lock-closed"
        secureTextEntry
        error={confirmPasswordError}
        isValid={isConfirmPasswordValid}
      />
    </>
  );
};

export default Personal_Form;
