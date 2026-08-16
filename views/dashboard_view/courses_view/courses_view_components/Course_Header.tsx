import App_Text from "@/components/app_ui/App_Text";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import Course_Pill from "./Course_Pill";

const Course_Header = ({
  activePeriod,
  historySheetRef,
}: {
  isCurrent: boolean;
  activePeriod: any;
  historySheetRef: any;
}) => {
  return (
    <>
      <View className="flex-row items-center justify-between pt-2 pb-4">
        <App_Text variant="title" className="text-text">
          Courses
        </App_Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/courses/add",
              params: {
                academicYear: activePeriod?.academicYear,
                semester: activePeriod?.semester,
                current: String(activePeriod?.isCurrent),
              },
            })
          }
          className="w-10 h-10 rounded-full bg-primary items-center justify-center"
        >
          <Feather name="plus" size={18} color="white" />
        </Pressable>
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
    </>
  );
};

export default Course_Header;
