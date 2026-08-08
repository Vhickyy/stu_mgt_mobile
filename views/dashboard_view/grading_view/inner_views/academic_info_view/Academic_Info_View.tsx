import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import Info_Modal from "@/components/shared/modals/Info_Modals";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  formatAcademicYear,
  generateAcademicYearOptions,
  generateAdmissionYearOptions,
  parseAcademicYearEnd,
  parseAcademicYearStart,
  SEMESTER_OPTIONS,
} from "./academic_info_data";
import {
  useSaveAcademicProfile,
  useSkipAcademicProfile,
} from "./academic_info_hooks/useAcademicInfoApi";
import { Semester } from "./academic_info_types";

export default function Academic_Info_View() {
  const currentCalendarYear = new Date().getFullYear();

  const [admissionYear, setAdmissionYear] = useState(currentCalendarYear);
  const [currentAcademicYear, setCurrentAcademicYear] = useState(
    formatAcademicYear(currentCalendarYear),
  );
  const [currentSemester, setCurrentSemester] =
    useState<Semester>("1st Semester");

  const infoSheetRef = useRef<BottomSheetModal>(null);

  const { mutate: saveProfile, isPending: isSaving } = useSaveAcademicProfile();
  const { mutate: skipProfile, isPending: isSkipping } =
    useSkipAcademicProfile();

  const admissionYearOptions = useMemo(
    () =>
      generateAdmissionYearOptions().map((year) => ({
        label: String(year),
        value: String(year),
      })),
    [],
  );

  const academicYearOptions = useMemo(
    () =>
      generateAcademicYearOptions(admissionYear).map((year) => ({
        label: year,
        value: year,
      })),
    [admissionYear],
  );

  const semesterOptions = SEMESTER_OPTIONS.map((s) => ({ label: s, value: s }));

  const startYear = parseAcademicYearStart(currentAcademicYear);
  const endYear = parseAcademicYearEnd(currentAcademicYear);
  const showPreviousYearsBanner = admissionYear < startYear;

  function handleSaveAndContinue() {
    saveProfile(
      { admissionYear, currentAcademicYear, currentSemester },
      { onSuccess: () => router.push("/(root)/(tabs)/profile") },
    );
  }

  function handleSkip() {
    skipProfile();
    // skipProfile({ onSuccess: () => onContinue() });
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-border"
        >
          <Feather name="chevron-left" size={20} color="#2F241F" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <App_Text variant="heading" className="text-text mb-1">
          Academic Information
        </App_Text>
        <App_Text variant="body" className="text-text-secondary mb-6">
          This helps us personalize your experience.
        </App_Text>

        <View className="gap-4">
          <App_Select
            label="Year of Admission"
            value={String(admissionYear)}
            options={admissionYearOptions}
            onChange={(value) => setAdmissionYear(Number(value))}
            // sheetTitle="Year of Admission"
          />

          {showPreviousYearsBanner && (
            <View className="flex-row items-start gap-3 bg-secondary-light rounded-xl p-4">
              <Ionicons name="information-circle" size={18} color="#F97360" />
              <View className="flex-1">
                <App_Text variant="bodySmall" className="text-text-secondary">
                  It looks like you were admitted before {endYear}. To get an
                  accurate CGPA, we recommend you add your previous academic
                  years' results later.
                </App_Text>
                <Pressable
                  onPress={() => infoSheetRef.current?.present()}
                  className="mt-1"
                >
                  <App_Text
                    variant="bodySmall"
                    className="text-primary font-medium"
                  >
                    Learn more
                  </App_Text>
                </Pressable>
              </View>
            </View>
          )}

          <App_Select
            label="Current Academic Year"
            value={currentAcademicYear}
            options={academicYearOptions}
            onChange={setCurrentAcademicYear}
            // sheetTitle="Current Academic Year"
          />

          <App_Select
            label="Current Semester"
            value={currentSemester}
            options={semesterOptions}
            onChange={(value) => setCurrentSemester(value as Semester)}
            // sheetTitle="Current Semester"
          />
        </View>

        <App_Button
          title="Save & Continue"
          onPress={handleSaveAndContinue}
          loading={isSaving}
          className="mt-6"
        />

        <Pressable
          onPress={handleSkip}
          className="items-center mt-4"
          disabled={isSkipping}
        >
          <App_Text variant="bodySmall" className="text-text-secondary">
            {isSkipping ? "Skipping..." : "I'll do this later"}
          </App_Text>
        </Pressable>
      </ScrollView>

      <Info_Modal
        ref={infoSheetRef}
        title="Why we ask for your admission year?"
        description="This helps us know if you need to add previous academic years' results to calculate your CGPA correctly."
        onDismiss={() => infoSheetRef.current?.dismiss()}
      />
    </SafeAreaView>
  );
}
