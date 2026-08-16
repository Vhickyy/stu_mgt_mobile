import App_Text from "@/components/app_ui/App_Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import Dashboard_Layout from "../components/Dashboard_Layout";
import { useSemesterHistory } from "../grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import { SemesterHistoryEntry } from "../grading_view/inner_views/academic_info_view/academic_info_types";
import Course_Header from "./courses_view_components/Course_Header";
import Course_Row from "./courses_view_components/Course_Row";
import Empty_Course from "./courses_view_components/Empty_Course";
import { useCourses } from "./courses_view_hooks/useCourseApi";
import Semester_History_Modal from "./courses_view_modals/Semester_History_Modal";
import { Course } from "./courses_view_types";

export default function Courses_View() {
  const { data: history } = useSemesterHistory();
  const [selectedPeriod, setSelectedPeriod] =
    useState<SemesterHistoryEntry | null>(null);

  const activePeriod =
    selectedPeriod ?? history?.find((h) => h.isCurrent) ?? null;

  const { data: courses, isLoading } = useCourses(
    activePeriod?.academicYear ?? "",
    activePeriod?.semester ?? "1st Semester",
  );

  const historySheetRef = useRef<BottomSheetModal>(null);
  const editSheetRef = useRef<BottomSheetModal>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  function openEdit(course: Course) {
    setEditingCourse(course);
    editSheetRef.current?.present();
  }

  const isCurrent = activePeriod?.isCurrent ?? true;
  const totalUnits = courses?.reduce((sum, c) => sum + c.units, 0) ?? 0;

  return (
    <Dashboard_Layout>
      <Course_Header
        isCurrent={isCurrent}
        activePeriod={activePeriod}
        historySheetRef={historySheetRef}
      />
      {isLoading && (
        <View className="gap-3">
          <View className="h-20 bg-surface rounded-2xl border border-border" />
          <View className="h-20 bg-surface rounded-2xl border border-border" />
        </View>
      )}
      {courses && courses?.length ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between mb-3">
            <App_Text variant="bodySmall" className="text-text-secondary">
              {courses.length} course{courses.length !== 1 ? "s" : ""} •{" "}
              {totalUnits} units
            </App_Text>
            {!isCurrent && (
              <App_Text variant="caption" className="text-muted">
                View only
              </App_Text>
            )}
          </View>
          {courses.map((course) => (
            <Course_Row
              key={course.id}
              course={course}
              editable={isCurrent}
              // onPress={() => router.push(`/(root)/(tabs)/courses/${course.id}`)}
              onPress={() =>
                router.push({
                  pathname: "/(root)/course/[id]",
                  params: { id: course.id },
                })
              }
            />
          ))}
        </ScrollView>
      ) : (
        <Empty_Course activePeriod={activePeriod} isCurrent={isCurrent} />
      )}
      <Semester_History_Modal
        ref={historySheetRef}
        selectedId={activePeriod?.id ?? null}
        onDismiss={() => historySheetRef.current?.dismiss()}
        onSelect={(entry) => {
          setSelectedPeriod(entry);
          historySheetRef.current?.dismiss();
        }}
      />
      {/* <EditCourseSheet
        course={editingCourse}
        onDismiss={() => {
          editSheetRef.current?.dismiss();
          setEditingCourse(null);
        }}
      /> */}
    </Dashboard_Layout>
  );
}
