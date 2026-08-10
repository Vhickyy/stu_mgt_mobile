import App_Text from "@/components/app_ui/App_Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import Dashboard_Layout from "../components/Dashboard_Layout";
import { useAcademicProfile } from "../grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import Attendance_Card from "./overview_components/AttendanceCard";
import Overview_Header from "./overview_components/Overview_Header";
import Overview_Pill from "./overview_components/Overview_Pill";
import Overview_Skeleton from "./overview_components/Overview_Skeleton";
import Overview_Stats_Row from "./overview_components/Overview_Stats_Row";
import Quick_Overview_Grid from "./overview_components/Quick_Overview_Grid";
import ResultsPreviewCard from "./overview_components/ResultsPreviewCard";
import StudentHubPromoCard from "./overview_components/StudentHubPromoCard";
import Upcoming_Class_Card from "./overview_components/Upcoming_Class_Card";
import { useDashboardOverview } from "./overview_hook/useOverviewApi";

export default function Overview_View() {
  const { data: profile } = useAcademicProfile();
  const { data: overview, isLoading } = useDashboardOverview();

  const summarySheetRef = useRef<BottomSheetModal>(null);

  return (
    <Dashboard_Layout>
      <Overview_Header />

      <ScrollView
        className="flex-1"
        contentContainerClassName="py-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <App_Text variant="heading" className="text-text">
            Good morning, Vic 👋
          </App_Text>
          <App_Text variant="body" className="text-text-secondary mt-0.5">
            Here's your academic overview
          </App_Text>
        </View>

        {profile && (
          <Overview_Pill
            academicYear={profile.currentAcademicYear}
            semester={profile.currentSemester}
          />
        )}

        {isLoading || !overview ? (
          <Overview_Skeleton />
        ) : (
          <>
            <Overview_Stats_Row
              cgpa={overview.cgpa}
              cgpaScale={overview.cgpaScale}
              standing={overview.standing}
              totalUnits={overview.totalUnitsRegistered}
              onPressCgpa={() => summarySheetRef.current?.present()}
            />

            <Quick_Overview_Grid
              stats={overview.quickOverview}
              onViewAll={() => router.push("/(root)/(tabs)/courses")}
            />

            <ResultsPreviewCard
              results={overview.recentResults}
              onViewAll={() => router.push("/(root)/(tabs)/results")}
            />

            <StudentHubPromoCard
              title="Explore Student Hub"
              subtitle="Study tips, tools and resources picked for you."
              ctaLabel="Take a look"
            />

            {overview.upcomingClass && (
              <Upcoming_Class_Card
                upcomingClass={overview.upcomingClass}
                onPress={() => router.push("/(auth)/Sign_In")}
              />
            )}

            <Attendance_Card
              attendance={overview.attendance}
              onViewPress={() => router.push("/(root)/(tabs)/courses")}
            />
          </>
        )}
      </ScrollView>

      {/* {overview && (
        <SessionSummarySheet
          ref={summarySheetRef}
          cgpa={overview.cgpa}
          totalUnits={overview.totalUnitsRegistered}
          attendancePercent={overview.attendance.percent}
          nextClassIn={
            overview.upcomingClass ? `In ${overview.upcomingClass.minutesUntil} mins` : "—"
          }
          onDismiss={() => summarySheetRef.current?.dismiss()}
          onViewAnalytics={() => {
            summarySheetRef.current?.dismiss();
            onViewDetailedAnalytics();
          }}
        />
      )} */}
    </Dashboard_Layout>
  );
}
