import App_Text from "@/components/app_ui/App_Text";
import React from "react";
import { View } from "react-native";

const Step_Progress = ({ currentStep }: { currentStep: number }) => {
  const stepLabels = ["Personal", "University"];

  return (
    <View className="w-full mt-4">
      <View className="flex-row items-center">
        {stepLabels.map((label, index) => (
          <React.Fragment key={label}>
            <View className="items-center">
              <View
                className={`w-7 h-7 rounded-full items-center justify-center ${
                  index <= currentStep ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <App_Text
                  variant="caption"
                  style={{ color: index <= currentStep ? "#fff" : "#888" }}
                >
                  {index + 1}
                </App_Text>
              </View>
              <App_Text variant="caption" className="mt-1">
                {label}
              </App_Text>
            </View>

            {index < stepLabels.length - 1 && (
              <View
                className={`flex-1 h-[2px] mx-2 ${
                  index < currentStep ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default Step_Progress;
