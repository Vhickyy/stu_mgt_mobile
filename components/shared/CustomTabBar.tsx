import { cn } from "@/libs/cn";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import App_Text from "../app_ui/App_Text";

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  index: { active: "home", inactive: "home-outline" },
  courses: { active: "book", inactive: "book-outline" },
  results: { active: "bar-chart", inactive: "bar-chart-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

const TAB_LABELS: Record<string, string> = {
  index: "Dashboard",
  courses: "Courses",
  results: "Results",
  profile: "Profile",
};

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const actionsSheetRef = useRef<BottomSheetModal>(null);
  const noteSheetRef = useRef<BottomSheetModal>(null);

  // Order matches the mock: Dashboard, Courses, [+], Results, Profile
  const leftRoutes = state.routes.filter(
    (r) => r.name === "index" || r.name === "courses",
  );
  const rightRoutes = state.routes.filter(
    (r) => r.name === "results" || r.name === "profile",
  );

  function renderTabButton(route: (typeof state.routes)[number]) {
    const routeIndex = state.routes.findIndex((r) => r.key === route.key);
    const isFocused = state.index === routeIndex;
    const icons = TAB_ICONS[route.name];

    function handlePress() {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    }

    return (
      <Pressable
        key={route.key}
        onPress={handlePress}
        accessibilityRole="tab"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={TAB_LABELS[route.name]}
        className="flex-1 items-center justify-center gap-1 py-2"
      >
        <Ionicons
          name={isFocused ? icons.active : icons.inactive}
          size={22}
          color={isFocused ? "#FF8A72" : "#A89790"}
        />
        <App_Text
          variant="caption"
          className={cn(
            "font-medium",
            isFocused ? "text-primary" : "text-muted",
          )}
        >
          {TAB_LABELS[route.name]}
        </App_Text>
      </Pressable>
    );
  }

  return (
    <>
      <View
        className="flex-row items-center bg-surface border-t border-border rounded-t-3xl"
        style={{ paddingBottom: insets.bottom, paddingTop: 8 }}
      >
        {leftRoutes.map(renderTabButton)}

        <View className="flex-1 items-center justify-center">
          <Pressable
            onPress={() => actionsSheetRef.current?.present()}
            accessibilityRole="button"
            accessibilityLabel="Quick actions"
            className="w-14 h-14 rounded-full bg-primary items-center justify-center -mt-8"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 6,
            }}
          >
            <Feather name="plus" size={24} color="white" />
          </Pressable>
        </View>

        {rightRoutes.map(renderTabButton)}
      </View>

      {/* <QuickActionsSheet
        ref={actionsSheetRef}
        onDismiss={() => actionsSheetRef.current?.dismiss()}
        onAddCourse={() => {
          actionsSheetRef.current?.dismiss();
          router.push("/courses/add");
        }}
        onAddResult={() => {
          actionsSheetRef.current?.dismiss();
          router.push("/results/add");
        }}
        onAddQuickNote={() => {
          actionsSheetRef.current?.dismiss();
          noteSheetRef.current?.present();
        }}
        onMarkAttendance={() => {
          actionsSheetRef.current?.dismiss();
          router.push("/attendance/mark");
        }}
      />

      <QuickNoteSheet ref={noteSheetRef} onDismiss={() => noteSheetRef.current?.dismiss()} /> */}
    </>
  );
}
