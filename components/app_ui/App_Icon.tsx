import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export default function App_Icon({
  name,
  size = 20,
  color = "#6B7280",
}: AppIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}
