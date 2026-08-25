import App_Form_Input from "@/components/app_ui/App_Form_Input";
import App_Form_Select from "@/components/app_ui/App_Form_Select";
import { SelectOption } from "@/components/app_ui/App_Select";
import React, { useState } from "react";
import { Control } from "react-hook-form";
import { RegisterSchema } from "../../auth_schema";
import {
  useDebouncedValue,
  useUniversitiesQuery,
} from "../sign_up_hook/useSignUpApi";

const University_Form = ({ control }: { control: Control<RegisterSchema> }) => {
  const currentYear = new Date().getFullYear();
  const admissionYearOptions: SelectOption[] = Array.from(
    { length: 15 },
    (_, i) => {
      const year = currentYear - i;
      return { label: String(year), value: String(year) };
    },
  );

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 350);
  const { data: universities = [], isFetching } =
    useUniversitiesQuery(debouncedQuery);

  return (
    <>
      <App_Form_Input
        name="phoneNumber"
        control={control}
        label="Phone Number"
        placeholder="john@email.com"
        leftIcon="mail-outline"
      />
      <App_Form_Select
        name="university"
        control={control}
        label="University"
        placeholder="Select your university"
        options={universities}
        onSearchChange={setSearchQuery}
        loading={isFetching}
        emptyText={
          debouncedQuery.trim().length > 1
            ? "No universities found"
            : "Start typing to search"
        }
      />
      <App_Form_Select
        name="admissionYear"
        control={control}
        label="Admission Year"
        placeholder="Select admission year"
        options={admissionYearOptions}
      />
    </>
  );
};

export default University_Form;
