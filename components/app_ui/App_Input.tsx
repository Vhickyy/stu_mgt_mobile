import { cn } from "@/libs/cn";
import { typography } from "@/libs/fonts";
import React, { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function App_Input({
  label,
  error,
  className,
  leftIcon,
  rightIcon,
  ...props
}: AppInputProps) {
  return (
    <View className="w-full gap-2">
      {label && (
        <Text
          className="text-sm font-medium text-gray-700"
          style={{ fontSize: typography.bodySmall.fontSize }}
        >
          {label}
        </Text>
      )}

      <View className="border border-gray-300 rounded-xl flex-row items-center px-4 h-14">
        {leftIcon}
        <TextInput
          {...props}
          className={cn(
            "text-base flex-1",
            error && "border-red-500",
            className,
          )}
          placeholderTextColor="#9CA3AF"
        />
        {rightIcon}
      </View>

      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  );
}
