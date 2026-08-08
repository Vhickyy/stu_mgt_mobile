import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { ViewStyle } from "react-native";

interface AppGradientProps extends LinearGradientProps {
  className?: string;
  style?: ViewStyle;
}

export default function App_Gradient({
  colors = ["#4F46E5", "#7C3AED"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  children,
  className,
  style,
  ...props
}: AppGradientProps) {
  return (
    <LinearGradient
      {...props}
      colors={colors}
      start={start}
      end={end}
      className={className}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
