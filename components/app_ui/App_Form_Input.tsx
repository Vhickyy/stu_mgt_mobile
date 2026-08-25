import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import App_Input from "./App_Input";

type AppInputProps = React.ComponentProps<typeof App_Input>;
interface FormInputProps<T extends FieldValues> extends Omit<
  AppInputProps,
  "value" | "onChangeText" | "onBlur" | "error"
> {
  name: Path<T>;
  control: Control<T>;
  isValidOverride?: boolean;
}

export default function App_Form_Input<T extends FieldValues>({
  name,
  control,
  isValidOverride,
  ...props
}: FormInputProps<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  return (
    <App_Input
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
      isValid={fieldState.isTouched && !fieldState.invalid}
    />
  );
}
