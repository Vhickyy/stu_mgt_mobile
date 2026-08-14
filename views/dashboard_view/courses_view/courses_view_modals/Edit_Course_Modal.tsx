import App_Bottom_Sheet_Modal from "@/components/app_ui/App_Bottom_Sheet_Modal";
import App_Button from "@/components/app_ui/App_Button";
import App_Form_Input from "@/components/app_ui/App_Form_Input";
import App_Form_Select from "@/components/app_ui/App_Form_Select";
import App_Text from "@/components/app_ui/App_Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { EditCourseFormValues, editCourseSchema } from "../course_schema";
import {
  useDeleteCourse,
  useUpdateCourse,
} from "../courses_view_hooks/useCourseApi";
import { Course, COURSE_TYPE_OPTIONS, CourseType } from "../courses_view_types";

interface EditCourseSheetProps {
  course: Course | null; // null while closed
  onDismiss: () => void;
}

const typeOptions = COURSE_TYPE_OPTIONS.map((t) => ({ label: t, value: t }));

const EMPTY_VALUES: EditCourseFormValues = {
  title: "",
  code: "",
  units: "",
  type: "",
};

const Edit_Course_Modal = forwardRef<BottomSheetModal, EditCourseSheetProps>(
  ({ course, onDismiss }, ref) => {
    const { control, handleSubmit, reset } = useForm<EditCourseFormValues>({
      resolver: zodResolver(editCourseSchema),
      defaultValues: EMPTY_VALUES,
      mode: "onBlur",
    });

    // Sync form state whenever a different course is opened for editing.
    useEffect(() => {
      if (course) {
        reset({
          title: course.title,
          code: course.code,
          units: String(course.units),
          type: course.type ?? "",
        });
      }
    }, [course, reset]);

    const { mutate: updateCourse, isPending: isSaving } = useUpdateCourse(
      course?.academicYear ?? "",
      course?.semester ?? "1st Semester",
    );
    const { mutate: removeCourse, isPending: isDeleting } = useDeleteCourse(
      course?.academicYear ?? "",
      course?.semester ?? "1st Semester",
    );

    if (!course) return null;

    function onSubmit(values: EditCourseFormValues) {
      updateCourse(
        {
          id: course!.id,
          title: values.title.trim(),
          code: values.code.trim(),
          units: Number(values.units),
          type: (values.type as CourseType) || undefined,
        },
        { onSuccess: onDismiss },
      );
    }

    return (
      <App_Bottom_Sheet_Modal ref={ref} onClose={onDismiss}>
        <App_Text variant="title" className="text-text mb-4">
          Edit Course
        </App_Text>

        <View className="gap-4">
          <App_Form_Input control={control} name="title" label="Course Title" />
          <App_Form_Input control={control} name="code" label="Course Code" />
          <App_Form_Input
            control={control}
            name="units"
            label="Unit / Credit"
            keyboardType="numeric"
          />
          <App_Form_Select
            control={control}
            name="type"
            label="Type (Optional)"
            options={typeOptions}
            placeholder="Select type"
          />
        </View>

        <App_Button
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
          loading={isSaving}
          className="mt-6"
        />
      </App_Bottom_Sheet_Modal>
    );
  },
);

export default Edit_Course_Modal;
