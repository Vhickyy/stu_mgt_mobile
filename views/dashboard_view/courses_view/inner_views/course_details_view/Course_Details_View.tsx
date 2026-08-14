import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { useSemesterHistory } from "@/views/dashboard_view/grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useCourse,
  useDeleteCourse,
  useResultForCourse,
} from "../../courses_view_hooks/useCourseApi";
import Edit_Course_Modal from "../../courses_view_modals/Edit_Course_Modal";
import Course_Result_Card from "./course_details_components/Course_Result_Card";

export default function Course_DetailS_View() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: course, isLoading } = useCourse(id);
  const { data: result } = useResultForCourse(id);
  const { data: history } = useSemesterHistory();

  const editSheetRef = useRef<BottomSheetModal>(null);

  const period = history?.find(
    (h) =>
      h.academicYear === course?.academicYear &&
      h.semester === course?.semester,
  );
  const isCurrent = period?.isCurrent ?? true;

  const { mutate: removeCourse, isPending: isDeleting } = useDeleteCourse(
    course?.academicYear ?? "",
    course?.semester ?? "1st Semester",
  );

  function handleDelete() {
    if (!course) return;
    Alert.alert("Delete Course", `Remove ${course.title} from this semester?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          removeCourse(course.id, { onSuccess: () => router.back() }),
      },
    ]);
  }

  if (isLoading || !course) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <App_Text variant="body" className="text-text-secondary">
            Loading course...
          </App_Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-border"
        >
          <Feather name="chevron-left" size={20} color="#2F241F" />
        </Pressable>

        {isCurrent && (
          <Pressable
            onPress={() => editSheetRef.current?.present()}
            className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-border"
          >
            <Feather name="edit-2" size={16} color="#2F241F" />
          </Pressable>
        )}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View className="flex-row items-center gap-2 mb-1">
            <App_Text variant="heading" className="text-text">
              {course.title}
            </App_Text>
            <View
              className={
                isCurrent
                  ? "bg-success/10 rounded-full px-2 py-0.5"
                  : "bg-muted/15 rounded-full px-2 py-0.5"
              }
            >
              <App_Text
                variant="caption"
                className={
                  isCurrent
                    ? "text-success font-medium"
                    : "text-text-secondary font-medium"
                }
              >
                {isCurrent ? "Current" : "Completed"}
              </App_Text>
            </View>
          </View>
          <App_Text variant="body" className="text-text-secondary">
            {course.code} • {course.academicYear} • {course.semester}
          </App_Text>
        </View>

        <View className="bg-surface rounded-2xl border border-border p-4">
          <View className="flex-row justify-between mb-2">
            <App_Text variant="bodySmall" className="text-text-secondary">
              Units
            </App_Text>
            <App_Text variant="bodySmall" className="text-text font-medium">
              {course.units}
            </App_Text>
          </View>
          {course.type && (
            <View className="flex-row justify-between">
              <App_Text variant="bodySmall" className="text-text-secondary">
                Type
              </App_Text>
              <App_Text variant="bodySmall" className="text-text font-medium">
                {course.type}
              </App_Text>
            </View>
          )}
        </View>

        {result ? (
          <Course_Result_Card result={result} />
        ) : (
          <Pressable
            onPress={() => router.push(`/(root)/(tabs)`)}
            className="flex-row items-center justify-between bg-surface-soft rounded-2xl p-4"
          >
            <App_Text variant="body" className="text-text font-medium">
              {isCurrent ? "Enter Result" : "No result recorded"}
            </App_Text>
            <Feather name="chevron-right" size={16} color="#A89790" />
          </Pressable>
        )}

        {result && (
          <Pressable
            onPress={() => router.push(`/(root)/(tabs)`)}
            className="flex-row items-center justify-center gap-2"
          >
            <App_Text variant="bodySmall" className="text-primary font-medium">
              View in Results
            </App_Text>
            <Feather name="arrow-right" size={14} color="#FF8A72" />
          </Pressable>
        )}

        {isCurrent && (
          <App_Button
            title={isDeleting ? "Deleting..." : "Delete Course"}
            variant="secondary"
            onPress={handleDelete}
            className="mt-2"
          />
        )}
      </ScrollView>

      <Edit_Course_Modal
        course={course}
        onDismiss={() => editSheetRef.current?.dismiss()}
      />
    </SafeAreaView>
  );
}
