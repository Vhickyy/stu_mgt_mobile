import { typography } from "@/libs/fonts";
import { Text, TextProps } from "react-native";

type Variant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: Variant;
  className?: string;
}

export default function App_Text({
  variant = "body",
  className,
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text {...props} className={className} style={[typography[variant], style]}>
      {children}
    </Text>
  );
}
