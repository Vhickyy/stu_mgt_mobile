import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import SelectField from "./App_Select";

type SelectFieldProps = React.ComponentProps<typeof SelectField>;

interface FormSelectProps<T extends FieldValues> extends Omit<
  SelectFieldProps,
  "value" | "onChange" | "onBlur" | "error"
> {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function App_Form_Select<T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: FormSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <SelectField
          {...props}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
