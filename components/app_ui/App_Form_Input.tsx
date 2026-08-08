import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import App_Input from "./App_Input";

type AppInputProps = React.ComponentProps<typeof App_Input>;

interface FormInputProps<T extends FieldValues> extends Omit<
  AppInputProps,
  "value" | "onChangeText" | "onBlur" | "error"
> {
  name: Path<T>;
  control: Control<T>;
}

export default function App_Form_Input<T extends FieldValues>({
  name,
  control,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <App_Input
          {...props}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
