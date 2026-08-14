import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

const Empty_Course = ({
  isCurrent,
  activePeriod,
}: {
  isCurrent: boolean;
  activePeriod: any;
}) => {
  return (
    <View className="items-center justify-center flex-1">
      <View className="w-72 h-48 items-center justify-center mb-6 ">
        <Image
          source={require("@/assets/images/main/empty-book-illustration.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      <App_Text variant="title" className="text-text text-center">
        {isCurrent ? "No courses added" : "No courses recorded"}
      </App_Text>
      <App_Text
        variant="body"
        className="text-text-secondary text-center mt-2 px-4 mb-6 w-[80%]"
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
  );
};

export default Empty_Course;
