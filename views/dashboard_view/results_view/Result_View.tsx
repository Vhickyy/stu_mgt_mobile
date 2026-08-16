import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { cn } from "@/libs/cn";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import Dashboard_Layout from "../components/Dashboard_Layout";
import { useGradingSystem } from "../grading_view/grading_hooks/useGradingApi";
import { useSemesterHistory } from "../grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import { SemesterHistoryEntry } from "../grading_view/inner_views/academic_info_view/academic_info_types";
import Result_Course_Row from "./result_view_components/Result_Course_Row";
import ResultsStatsRow from "./result_view_components/Results_Stats_Row";
import { useResultsForPeriod } from "./result_view_hook/useResultApi";
import { ResultsSortOption } from "./result_view_types/imdex";

type ResultsTab = "all" | "entered";

function sortCourses(
  courses: NonNullable<
    ReturnType<typeof useResultsForPeriod>["data"]
  >["courses"],
  sort: ResultsSortOption,
) {
  const list = [...courses];
  switch (sort) {
    case "title_asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "title_desc":
      return list.sort((a, b) => b.title.localeCompare(a.title));
    case "grade_desc":
      return list.sort(
        (a, b) => (b.result?.gradePoints ?? -1) - (a.result?.gradePoints ?? -1),
      );
    case "grade_asc":
      return list.sort(
        (a, b) => (a.result?.gradePoints ?? 99) - (b.result?.gradePoints ?? 99),
      );
  }
}

export default function Result_View() {
  const { data: history } = useSemesterHistory();
  const { data: gradingSystem } = useGradingSystem();
  const [selectedPeriod, setSelectedPeriod] =
    useState<SemesterHistoryEntry | null>(null);
  const [activeTab, setActiveTab] = useState<ResultsTab>("all");
  const [sort, setSort] = useState<ResultsSortOption>("title_asc");

  const activePeriod =
    selectedPeriod ?? history?.find((h) => h.isCurrent) ?? null;

  const { data, isLoading } = useResultsForPeriod(
    activePeriod?.academicYear ?? "",
    activePeriod?.semester ?? "1st Semester",
  );

  const historySheetRef = useRef<BottomSheetModal>(null);
  const filterSheetRef = useRef<BottomSheetModal>(null);

  const isCurrent = activePeriod?.isCurrent ?? true;

  const visibleCourses = useMemo(() => {
    if (!data) return [];
    const filtered =
      activeTab === "entered"
        ? data.courses.filter((c) => c.result)
        : data.courses;
    return sortCourses(filtered, sort);
  }, [data, activeTab, sort]);

  return (
    <Dashboard_Layout>
      <View className="flex-row items-center justify-between">
        <App_Text variant="subtitle" className="text-text">
          Results
        </App_Text>
        <Pressable
          onPress={() => filterSheetRef.current?.present()}
          className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-border"
        >
          <Feather name="sliders" size={16} color="#2F241F" />
        </Pressable>
      </View>

      <View className="px-5 mb-4">
        {/* {activePeriod && (
          <CoursesPill
            academicYear={activePeriod.academicYear}
            semester={activePeriod.semester}
            isCurrent={activePeriod.isCurrent}
            onPress={() => historySheetRef.current?.present()}
          />
        )} */}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {isLoading || !data ? (
          <View className="gap-3">
            <View className="h-24 bg-surface rounded-2xl border border-border" />
            <View className="h-20 bg-surface rounded-2xl border border-border" />
            <View className="h-20 bg-surface rounded-2xl border border-border" />
          </View>
        ) : (
          <>
            <ResultsStatsRow
              stats={data.stats}
              gpaScale={gradingSystem?.scale ?? 5.0}
            />

            {isCurrent && (
              <App_Button
                title="+ Add Result"
                // onPress={() => router.push("/results/add")}
                className="mt-4"
              />
            )}

            <View className="flex-row mt-5 mb-2 border-b border-border">
              {(["all", "entered"] as ResultsTab[]).map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <Pressable
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    className={cn(
                      "mr-6 pb-3 border-b-2",
                      isActive ? "border-primary" : "border-transparent",
                    )}
                  >
                    <App_Text
                      variant="bodySmall"
                      className={cn(
                        "font-medium",
                        isActive ? "text-primary" : "text-text-secondary",
                      )}
                    >
                      {tab === "all" ? "All Courses" : "Completed"}
                    </App_Text>
                  </Pressable>
                );
              })}
            </View>

            {visibleCourses?.length === 0 ? (
              <View className="items-center mt-8 flex-1 justify-center">
                <View className="w-72 h-52 items-center justify-center">
                  <Image
                    source={require("@/assets/images/main/empty-book-illustration.png")}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
                <App_Text
                  variant="body"
                  className="text-text-secondary text-center"
                >
                  {activeTab === "entered"
                    ? "No results entered yet."
                    : "No courses for this semester."}
                </App_Text>
              </View>
            ) : (
              <View className="mt-3">
                {visibleCourses?.map((course) => (
                  <Result_Course_Row
                    key={course.courseId}
                    course={course}
                    isCurrent={isCurrent}
                    onPress={() => {}}
                    // onPress={() => router.push(`/results/${course.courseId}`)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* <SemesterHistorySheet
        ref={historySheetRef}
        selectedId={activePeriod?.id ?? null}
        onDismiss={() => historySheetRef.current?.dismiss()}
        onSelect={(entry) => {
          setSelectedPeriod(entry);
          historySheetRef.current?.dismiss();
        }}
      /> */}

      {/* <ResultsFilterSheet
        ref={filterSheetRef}
        sort={sort}
        onDismiss={() => filterSheetRef.current?.dismiss()}
        onApply={(newSort) => {
          setSort(newSort);
          filterSheetRef.current?.dismiss();
        }}
        onReset={() => {
          setSort("title_asc");
          filterSheetRef.current?.dismiss();
        }}
      /> */}
    </Dashboard_Layout>
  );
}
