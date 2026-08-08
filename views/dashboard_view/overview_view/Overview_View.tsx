import App_Text from "@/components/app_ui/App_Text";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Dashboard_Layout from "../components/Dashboard_Layout";
import { useAcademicProfile } from "../grading_view/inner_views/academic_info_view/academic_info_hooks/useAcademicInfoApi";
import Attendance_Card from "./overview_components/AttendanceCard";
import Overview_Pill from "./overview_components/Overview_Pill";
import Overview_Stats_Row from "./overview_components/Overview_Stats_Row";
import Quick_Overview_Grid from "./overview_components/Quick_Overview_Grid";
import Upcoming_Class_Card from "./overview_components/Upcoming_Class_Card";
import { useDashboardOverview } from "./overview_hook/useOverviewApi";

interface DashboardScreenProps {
  //   studentFirstName: string;
  //   onOpenMenu: () => void;
  //   onOpenNotifications: () => void;
  //   onViewAllCourses: () => void;
  //   onPressUpcomingClass: () => void;
  //   onViewAttendance: () => void;
  //   onViewDetailedAnalytics: () => void;
}

function StatSkeleton() {
  return (
    <View className="bg-surface rounded-2xl border border-border p-4 h-24" />
  );
}

export default function Overview_View() {
  const { data: profile } = useAcademicProfile();
  const { data: overview, isLoading } = useDashboardOverview();

  const summarySheetRef = useRef<BottomSheetModal>(null);

  return (
    <Dashboard_Layout>
      <View className="flex-row items-center justify-between pt-2 pb-4">
        <Pressable
          onPress={() => {}}
          className="w-10 h-10 items-center justify-center"
        >
          <Feather name="menu" size={20} color="#2F241F" />
        </Pressable>
        <App_Text variant="subtitle" className="text-text">
          Dashboard
        </App_Text>
        <Pressable
          onPress={() => {}}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons name="notifications-outline" size={22} color="#2F241F" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24 gap-4"
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
          <View className="flex-row gap-3">
            <StatSkeleton />
            <StatSkeleton />
          </View>
        ) : (
          <Overview_Stats_Row
            cgpa={overview.cgpa}
            cgpaScale={overview.cgpaScale}
            standing={overview.standing}
            totalUnits={overview.totalUnitsRegistered}
            onPressCgpa={() => summarySheetRef.current?.present()}
          />
        )}

        {overview && (
          <Quick_Overview_Grid
            stats={overview.quickOverview}
            onViewAll={() => router.push("/(root)/(tabs)/courses")}
          />
        )}

        {overview?.upcomingClass && (
          <Upcoming_Class_Card
            upcomingClass={overview.upcomingClass}
            onPress={() => {}}
          />
        )}

        {overview && (
          <Attendance_Card
            attendance={overview.attendance}
            onViewPress={() => {}}
          />
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
