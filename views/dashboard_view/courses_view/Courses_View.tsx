import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import Dashboard_Layout from "../components/Dashboard_Layout";
import { useSemesterHistory } from "../grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import { SemesterHistoryEntry } from "../grading_view/inner_views/academic_info_view/academic_info_types";
import Course_Pill from "./courses_view_components/Course_Pill";
import Course_Row from "./courses_view_components/Course_Row";
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
      <View className="flex-row items-center justify-between pt-2 pb-4">
        <App_Text variant="subtitle" className="text-text">
          Courses
        </App_Text>
        {isCurrent && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/courses/add",
                params: {
                  academicYear: activePeriod?.academicYear,
                  semester: activePeriod?.semester,
                  current: String(activePeriod?.isCurrent ?? true),
                },
              })
            }
            className="w-10 h-10 rounded-full bg-primary items-center justify-center"
          >
            <Feather name="plus" size={18} color="white" />
          </Pressable>
        )}
      </View>

      <View className=" mb-4">
        {activePeriod && (
          <Course_Pill
            academicYear={activePeriod.academicYear}
            semester={activePeriod.semester}
            isCurrent={activePeriod.isCurrent}
            onPress={() => historySheetRef.current?.present()}
          />
        )}
      </View>

      {courses?.length == 0 ? (
        <View className="items-center justify-center flex-1">
          <View className="w-72 h-60 items-center justify-center mb-6 ">
            <Image
              source={require("@/assets/images/main/empty-book-illustration.png")}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <App_Text variant="heading" className="text-text text-center">
            {isCurrent ? "No courses added" : "No courses recorded"}
          </App_Text>
          <App_Text
            variant="body"
            className="text-text-secondary text-center mt-2 px-4 mb-6"
          >
            {isCurrent
              ? "You haven't added any courses for this semester yet."
              : "There's no course record for this semester."}
          </App_Text>

          {/* {isCurrent && ( */}
          <App_Button
            title={isCurrent ? "Add Your First Course" : "Add a Past Course"}
            onPress={() =>
              router.push({
                pathname: "/courses/add",
                params: {
                  academicYear: activePeriod?.academicYear,
                  semester: activePeriod?.semester,
                  current: String(activePeriod?.isCurrent ?? true),
                },
              })
            }
            className="w-full"
          />
          {/* )} */}
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          // contentContainerClassName="px-5"
          showsVerticalScrollIndicator={false}
        >
          {isLoading && (
            <View className="gap-3">
              <View className="h-20 bg-surface rounded-2xl border border-border" />
              <View className="h-20 bg-surface rounded-2xl border border-border" />
            </View>
          )}
          {courses && courses.length > 0 && (
            <>
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
                  onPress={() => openEdit(course)}
                />
              ))}
            </>
          )}
        </ScrollView>
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
