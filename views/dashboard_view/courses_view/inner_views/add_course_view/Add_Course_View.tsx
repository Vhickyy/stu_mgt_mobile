import App_Button from "@/components/app_ui/App_Button";
import App_Form_Input from "@/components/app_ui/App_Form_Input";
import App_Form_Select from "@/components/app_ui/App_Form_Select";
import App_Text from "@/components/app_ui/App_Text";
import { useGradingSystem } from "@/views/dashboard_view/grading_view/grading_hooks/useGradingApi";
import { useAcademicProfile } from "@/views/dashboard_view/grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import { Semester } from "@/views/dashboard_view/grading_view/inner_views/academic_info_view/academic_info_types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useCourses,
  useCreateCourse,
  useCreateCourseWithResult,
  useDeleteCourse,
} from "../../courses_view_hooks/useCourseApi";
import {
  AddCourseFormValues,
  COURSE_TYPE_OPTIONS,
} from "../../courses_view_types";

const typeOptions = COURSE_TYPE_OPTIONS.map((t) => ({ label: t, value: t }));

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

  const { data: addedCourses } = useCourses(academicYear, semester);
  const { mutate: createCourse, isPending: isAddingCurrent } =
    useCreateCourse();
  const { mutate: createCourseWithResult, isPending: isAddingPast } =
    useCreateCourseWithResult(academicYear, semester);
  const { mutate: removeCourse } = useDeleteCourse(academicYear, semester);

  const { control, handleSubmit, watch, reset } = useForm<AddCourseFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const gradeOptions = useMemo(
    () =>
      gradingSystem?.bands.map((b) => ({ label: b.letter, value: b.letter })) ??
      [],
    [gradingSystem],
  );

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
      createCourse(courseInput, { onSuccess: () => reset(DEFAULT_VALUES) });
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
      { onSuccess: () => reset(DEFAULT_VALUES) },
    );
  }

  const totalUnits = addedCourses?.reduce((sum, c) => sum + c.units, 0) ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-border"
        >
          <Feather name="chevron-left" size={20} color="#2F241F" />
        </Pressable>
        <App_Text variant="subtitle" className="text-text ml-3">
          Add Courses
        </App_Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6"
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

        <View className="gap-4 mb-4">
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
                <App_Text
                  variant="caption"
                  className="text-text-secondary -mt-2"
                >
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

        <App_Button
          title="+ Add Course"
          variant="outline"
          onPress={handleSubmit(onSubmit)}
          loading={isAdding}
          className="mb-6"
        />

        {addedCourses && addedCourses.length > 0 && (
          <>
            <App_Text variant="subtitle" className="text-text mb-3">
              Added Courses ({addedCourses.length})
            </App_Text>

            {addedCourses.map((course) => (
              <View
                key={course.id}
                className="flex-row items-center justify-between bg-surface rounded-2xl border border-border p-4 mb-3"
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="w-9 h-9 rounded-full bg-secondary-light items-center justify-center">
                    <Feather name="book-open" size={14} color="#F97360" />
                  </View>
                  <View>
                    <App_Text variant="body" className="text-text font-medium">
                      {course.title}
                    </App_Text>
                    <App_Text
                      variant="caption"
                      className="text-text-secondary mt-0.5"
                    >
                      {course.code} • {course.units} Units
                    </App_Text>
                  </View>
                </View>

                {isCurrentPeriod ? (
                  <Pressable
                    onPress={() => removeCourse(course.id)}
                    className="p-2"
                  >
                    <Feather name="trash-2" size={16} color="#EF4444" />
                  </Pressable>
                ) : (
                  <Feather name="lock" size={14} color="#A89790" />
                )}
              </View>
            ))}

            <App_Text variant="bodySmall" className="text-text-secondary mb-4">
              Total Units: {totalUnits}
            </App_Text>
          </>
        )}

        <App_Button
          title="Continue"
          onPress={() => router.back()}
          className="mt-2"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
