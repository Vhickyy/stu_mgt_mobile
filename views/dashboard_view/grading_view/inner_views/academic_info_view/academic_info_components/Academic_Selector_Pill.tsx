import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";

import App_Bottom_Sheet_Modal from "@/components/app_ui/App_Bottom_Sheet_Modal";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { useState } from "react";
import {
  generateAcademicYearOptions,
  SEMESTER_OPTIONS,
} from "../academic_info_data";
import { Semester } from "../academic_info_types";

interface AcademicSelectorPillProps {
  admissionYear: number;
  academicYear: string;
  semester: Semester;
  onApply: (academicYear: string, semester: Semester) => void;
}

export default function AcademicSelectorPill({
  admissionYear,
  academicYear,
  semester,
  onApply,
}: AcademicSelectorPillProps) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [draftYear, setDraftYear] = useState(academicYear);
  const [draftSemester, setDraftSemester] = useState<Semester>(semester);

  const yearOptions = generateAcademicYearOptions(admissionYear).map((y) => ({
    label: y,
    value: y,
  }));
  const semesterOptions = SEMESTER_OPTIONS.map((s) => ({ label: s, value: s }));

  function handleOpen() {
    setDraftYear(academicYear);
    setDraftSemester(semester);
    sheetRef.current?.present();
  }

  function handleApply() {
    onApply(draftYear, draftSemester);
    sheetRef.current?.dismiss();
  }

  return (
    <>
      <Pressable
        onPress={handleOpen}
        className="flex-row items-center gap-2 bg-surface border border-border rounded-xl px-4 py-3 self-start"
      >
        <Feather name="calendar" size={16} color="#7B6A64" />
        <App_Text variant="bodySmall" className="text-text font-medium">
          {academicYear} • {semester}
        </App_Text>
        <Feather name="chevron-down" size={16} color="#A89790" />
      </Pressable>

      <App_Bottom_Sheet_Modal
        ref={sheetRef}
        onClose={() => sheetRef.current?.dismiss()}
      >
        <App_Text variant="title" className="text-text mb-4">
          Switch Session
        </App_Text>

        <View className="gap-4">
          <App_Select
            label="Academic Year"
            value={draftYear}
            options={yearOptions}
            onChange={setDraftYear}
            // sheetTitle="Academic Year"
          />
          <App_Select
            label="Semester"
            value={draftSemester}
            options={semesterOptions}
            onChange={(v) => setDraftSemester(v as Semester)}
            // sheetTitle="Semester"
          />
        </View>

        <App_Button title="Apply" onPress={handleApply} className="mt-6" />
      </App_Bottom_Sheet_Modal>
    </>
  );
}
