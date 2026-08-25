import { COLORS } from "@/constants/theme";
import { cn } from "@/libs/cn";
import { typography } from "@/libs/fonts";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import App_Icon, { IconName } from "./App_Icon";
import App_Text from "./App_Text";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  isValid?: boolean;
}

export default function App_Input({
  label,
  error,
  className,
  leftIcon,
  rightIcon,
  isValid,
  ...props
}: AppInputProps) {
  const iconColor = isValid ? COLORS.primary : "#6B7280";

  return (
    <View className="w-full gap-1">
      {label && (
        <App_Text
          className="text-sm font-medium text-gray-700"
          style={{ fontSize: typography.bodySmall.fontSize }}
        >
          {label}
        </App_Text>
      )}

      <View
        className={cn(
          "border rounded-xl flex-row items-center px-4 h-12",
          error
            ? "border-red-500"
            : isValid
              ? "border-primary"
              : "border-gray-300",
        )}
      >
        {leftIcon && <App_Icon name={leftIcon} color={iconColor} />}
        <TextInput
          {...props}
          className={cn(
            "text-base flex-1",
            error && "border-red-500",
            className,
          )}
          placeholderTextColor="#9CA3AF"
        />
        {rightIcon && <App_Icon name={rightIcon} color={iconColor} />}
      </View>

      {error && (
        <App_Text variant="caption" className="text-sm text-[#EF4444]">
          {error}
        </App_Text>
      )}
    </View>
  );
}
