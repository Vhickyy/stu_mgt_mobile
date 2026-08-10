import App_Text from "@/components/app_ui/App_Text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

interface StudentHubPromoCardProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export default function StudentHubPromoCard({
  title,
  subtitle,
  ctaLabel,
}: StudentHubPromoCardProps) {
  return (
    <View>
      <LinearGradient
        colors={["#FF9E80", "#FF8A72"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 overflow-hidden"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <App_Text variant="subtitle" className="text-white mb-1">
              {title}
            </App_Text>
            <App_Text variant="bodySmall" className="text-white/90 mb-3">
              {subtitle}
            </App_Text>

            <View className="flex-row items-center gap-1 self-start bg-white/20 rounded-full px-3 py-1.5">
              <App_Text variant="caption" className="text-white font-semibold">
                {ctaLabel}
              </App_Text>
              <Ionicons name="arrow-forward" size={12} color="white" />
            </View>
          </View>

          <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="sparkles" size={26} color="white" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
