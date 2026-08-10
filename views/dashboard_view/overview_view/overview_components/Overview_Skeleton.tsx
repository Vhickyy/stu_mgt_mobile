import React from "react";
import { View } from "react-native";

const Overview_Skeleton = () => {
  return (
    <View className="gap-4">
      <View className="flex-row gap-3">
        <View className="flex-1 bg-surface rounded-2xl border border-border h-24" />
        <View className="flex-1 bg-surface rounded-2xl border border-border h-24" />
      </View>
      <View className="bg-surface rounded-2xl border border-border h-28" />
      <View className="bg-surface rounded-2xl border border-border h-32" />
      <View className="bg-surface rounded-2xl border border-border h-24" />
      <View className="bg-surface rounded-2xl border border-border h-32" />
    </View>
  );
};

export default Overview_Skeleton;
