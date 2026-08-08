import CustomTabBar from "@/components/shared/CustomTabBar";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="courses" />
        <Tabs.Screen name="results" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </SafeAreaView>
  );
}

// import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import DashboardFab from "@/components/dashboard/DashboardFab";

// export default function TabLayout() {
//   return (
//     <SafeAreaView className="flex-1 bg-background" edges={["bottom", "top"]}>
//       <NativeTabs>
//         <NativeTabs.Trigger name="index">
//           <Label>Dashboard</Label>
//           <Icon sf="house.fill" />
//         </NativeTabs.Trigger>

//         <NativeTabs.Trigger name="courses">
//           <Label>Courses</Label>
//           <Icon sf="book.closed.fill" />
//         </NativeTabs.Trigger>

//         <NativeTabs.Trigger name="results">
//           <Label>Results</Label>
//           <Icon sf="chart.bar.fill" />
//         </NativeTabs.Trigger>

//         <NativeTabs.Trigger name="profile">
//           <Label>Profile</Label>
//           <Icon sf="person.fill" />
//         </NativeTabs.Trigger>
//       </NativeTabs>

//       {/* Floating quick-action button, overlaid on top of the tab bar — not a tab itself */}
//       {/* <DashboardFab /> */}
//     </SafeAreaView>
//   );
// }
