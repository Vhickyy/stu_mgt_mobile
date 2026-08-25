import App_Text from "@/components/app_ui/App_Text";
import React, { useState } from "react";
import { Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Date_Picker = ({
  value,
  onChange,
  placeholder = "Select date",
  maximumDate,
  minimumDate,
}: {
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)}>
        <App_Text>{value ? value.toLocaleDateString() : placeholder}</App_Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        date={value ?? new Date()}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        onConfirm={(date) => {
          onChange(date);
          setIsVisible(false);
        }}
        onCancel={() => setIsVisible(false)}
      />
    </>
  );
};

export default Date_Picker;
