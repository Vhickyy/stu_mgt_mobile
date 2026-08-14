import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Dashboard_Layout from "@/views/dashboard_view/components/Dashboard_Layout";
import { useGradingSystem } from "@/views/dashboard_view/grading_view/grading_hooks/useGradingApi";
import { useAcademicProfile } from "@/views/dashboard_view/grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import { Semester } from "@/views/dashboard_view/grading_view/inner_views/academic_info_view/academic_info_types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import {
  useCreateCourse,
  useCreateCourseWithResult,
} from "../../courses_view_hooks/useCourseApi";
import { AddCourseFormValues } from "../../courses_view_types";
import Add_Course_Form from "./add_course_components/Add_Course_Form";
import Add_Course_Header from "./add_course_components/Add_Course_Header";

const DEFAULT_VALUES: AddCourseFormValues = {
  title: "",
  code: "",
  units: "",
  type: "",
  score: "",
  grade: "",
  note: "",
};

export default function Add_Course_View() {
  const params = useLocalSearchParams<{
    academicYear?: string;
    semester?: string;
    current?: string;
  }>();
  const { data: profile } = useAcademicProfile();
  const { data: gradingSystem } = useGradingSystem();

  const academicYear =
    params.academicYear ?? profile?.currentAcademicYear ?? "";
  const semester =
    (params.semester as Semester) ?? profile?.currentSemester ?? "1st Semester";
  const isCurrentPeriod = params.current ? params.current === "true" : true;
  const { mutate: createCourse, isPending: isAddingCurrent } =
    useCreateCourse();
  const { mutate: createCourseWithResult, isPending: isAddingPast } =
    useCreateCourseWithResult(academicYear, semester);

  const { control, handleSubmit, watch, reset } = useForm<AddCourseFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const selectedGrade = watch("grade");
  const gradePoints =
    gradingSystem?.bands.find((b) => b.letter === selectedGrade)?.value ?? null;

  const isAdding = isAddingCurrent || isAddingPast;

  function onSubmit(values: AddCourseFormValues) {
    const courseInput = {
      academicYear,
      semester,
      title: values.title.trim(),
      code: values.code.trim(),
      units: Number(values.units),
      type: values.type || undefined,
    };

    if (isCurrentPeriod) {
      createCourse(courseInput, {
        onSuccess: () => {
          (reset(DEFAULT_VALUES), router.back());
        },
      });
      return;
    }

    createCourseWithResult(
      {
        courseInput,
        resultInput: {
          score: Number(values.score),
          grade: values.grade,
          gradePoints: gradePoints!,
          note: values.note.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          reset(DEFAULT_VALUES);
          router.back();
        },
      },
    );
  }

  return (
    <Dashboard_Layout>
      <Add_Course_Header />

      <ScrollView
        className="flex-1 relative"
        contentContainerClassName=""
        showsVerticalScrollIndicator={false}
      >
        <App_Text variant="body" className="text-text-secondary mb-4">
          {isCurrentPeriod
            ? "Add the courses you're taking this semester."
            : "Backfill a course from a past semester."}
        </App_Text>

        <View className="flex-row items-center justify-between bg-surface-soft rounded-xl px-4 py-3 mb-4">
          <App_Text variant="bodySmall" className="text-text-secondary">
            Adding to
          </App_Text>
          <App_Text variant="bodySmall" className="text-text font-medium">
            {academicYear} • {semester}
          </App_Text>
        </View>

        {!isCurrentPeriod && (
          <View className="flex-row items-start gap-3 bg-secondary-light rounded-xl p-4 mb-5">
            <Ionicons name="information-circle" size={18} color="#F97360" />
            <App_Text
              variant="bodySmall"
              className="text-text-secondary flex-1"
            >
              This is a past semester, so you'll need to enter the result
              together with the course. Once saved, it can't be edited or
              deleted.
            </App_Text>
          </View>
        )}

        <Add_Course_Form
          control={control}
          gradePoints={gradePoints}
          isCurrentPeriod
        />
      </ScrollView>
      <App_Button
        title="Add Course"
        onPress={handleSubmit(onSubmit)}
        loading={isAdding}
        className="relative bottom-6 mt-6"
      />
    </Dashboard_Layout>
  );
}
