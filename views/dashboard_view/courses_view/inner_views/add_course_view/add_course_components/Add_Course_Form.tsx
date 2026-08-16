import App_Form_Input from "@/components/app_ui/App_Form_Input";
import App_Form_Select from "@/components/app_ui/App_Form_Select";
import App_Text from "@/components/app_ui/App_Text";
import { useGradingSystem } from "@/views/dashboard_view/grading_view/grading_hooks/useGradingApi";
import React, { useMemo } from "react";
import { Control } from "react-hook-form";
import { View } from "react-native";
import {
  AddCourseFormValues,
  COURSE_TYPE_OPTIONS,
} from "../../../courses_view_types";

const typeOptions = COURSE_TYPE_OPTIONS.map((t) => ({ label: t, value: t }));

const Add_Course_Form = ({
  control,
  gradePoints,
  isCurrentPeriod,
}: {
  control: Control<AddCourseFormValues, any, AddCourseFormValues>;
  gradePoints: number | null;
  isCurrentPeriod: boolean;
}) => {
  const { data: gradingSystem } = useGradingSystem();
  const gradeOptions = useMemo(
    () =>
      gradingSystem?.bands.map((b) => ({ label: b.letter, value: b.letter })) ??
      [],
    [gradingSystem],
  );

  return (
    <View className="gap-4 mb-4">
      <App_Text>{isCurrentPeriod.toString()}</App_Text>
      <App_Form_Input
        control={control}
        name="title"
        label="Course Title"
        placeholder="e.g. Data Structures"
        rules={{ required: "Course title is required" }}
      />
      <App_Form_Input
        control={control}
        name="code"
        label="Course Code"
        placeholder="e.g. CSC 201"
        rules={{ required: "Course code is required" }}
      />
      <App_Form_Input
        control={control}
        name="units"
        label="Unit / Credit"
        placeholder="e.g. 3"
        keyboardType="numeric"
        rules={{
          required: "Units are required",
          validate: (v) => Number(v) > 0 || "Units must be greater than 0",
        }}
      />
      <App_Form_Select
        control={control}
        name="type"
        label="Type (Optional)"
        options={typeOptions}
        placeholder="Select type"
      />

      {!isCurrentPeriod && (
        <>
          <App_Form_Input
            control={control}
            name="score"
            label="Score / Mark (%)"
            placeholder="e.g. 78"
            keyboardType="numeric"
            rules={{
              required: "Score is required for a past semester",
              validate: (v) =>
                (Number(v) >= 0 && Number(v) <= 100) ||
                "Score must be between 0 and 100",
            }}
          />

          <App_Form_Select
            control={control}
            name="grade"
            label="Grade"
            options={gradeOptions}
            placeholder={
              gradingSystem ? "Select grade" : "Set up grading system first"
            }
            rules={{ required: "Grade is required for a past semester" }}
          />

          {gradePoints !== null && (
            <App_Text variant="caption" className="text-text-secondary -mt-2">
              Grade Points: {gradePoints.toFixed(2)}
            </App_Text>
          )}

          <App_Form_Input
            control={control}
            name="note"
            label="Note (Optional)"
            placeholder="e.g. Good improvement"
          />
        </>
      )}
    </View>
  );
};

export default Add_Course_Form;
