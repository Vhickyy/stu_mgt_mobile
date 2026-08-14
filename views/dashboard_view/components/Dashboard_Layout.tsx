import React, { ReactNode } from "react";
import { View } from "react-native";

const Dashboard_Layout = ({ children }: { children: ReactNode }) => {
  return <View className="flex-1 px-5 pt-3 bg-background">{children}</View>;
};

export default Dashboard_Layout;
