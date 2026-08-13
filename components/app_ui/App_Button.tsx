import { cn } from "@/libs/cn";
import React from "react";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import App_Text from "./App_Text";

type Variant = "primary" | "secondary" | "outline";

interface AppButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
  variant?: Variant;
  className?: string;
}

const CONTAINER_STYLES: Record<Variant, string> = {
  primary: "bg-primary",
  secondary: "bg-surface-soft",
  outline: "bg-transparent border border-border-strong",
};

const TEXT_STYLES: Record<Variant, string> = {
  primary: "text-white",
  secondary: "text-text",
  outline: "text-text",
};

const INDICATOR_COLOR: Record<Variant, string> = {
  primary: "white",
  secondary: "#2F241F",
  outline: "#2F241F",
};

export default function App_Button({
  title,
  loading,
  variant = "primary",
  className,
  ...props
}: AppButtonProps) {
  return (
    <Pressable
      {...props}
      className={cn(
        "h-12 rounded-xl items-center justify-center",
        CONTAINER_STYLES[variant],
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={INDICATOR_COLOR[variant]} />
      ) : (
        <App_Text
          // variant="subtitle"
          className={cn("font-semibold", TEXT_STYLES[variant])}
        >
          {title}
        </App_Text>
      )}
    </Pressable>
  );
}
