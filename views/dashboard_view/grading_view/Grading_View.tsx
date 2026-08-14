import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Info_Modal from "@/components/shared/modals/Info_Modals";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSaveGradingSystem } from "./grading_hooks/useGradingApi";
import { GradingScaleType } from "./grading_types";
import Grading_Scale_Card from "./grading_view_components/Grading_Scale_Card";

interface GradingSystemSetupScreenProps {
  onContinue: () => void; // navigate to 1.2 Create First Session
  onViewDifference: () => void; // push 1.1.a
}

export default function Grading_View() {
  const [selected, setSelected] = useState<GradingScaleType>("4.0");
  const whySheetRef = useRef<BottomSheetModal>(null);
  const openWhyRef = () => whySheetRef.current?.present();
  const closeeWhyRef = () => whySheetRef.current?.dismiss();

  const { mutate: saveGradingSystem, isPending } = useSaveGradingSystem();

  function handleContinue() {
    saveGradingSystem(
      { type: selected },
      {
        onSuccess: () => router.push("/(root)/Academic_Information"),
      },
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* <> */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className=" mt-6 mb-6 gap-2">
          <App_Text variant="title">
            Choose your grading system
            {/* Choose your grading{"\n"}system */}
          </App_Text>
          <App_Text className="w-[90%]">
            This helps us calculate your GPA and CGPA accurately.
          </App_Text>
        </View>

        <Pressable onPress={openWhyRef} className="self-center mb-4">
          {/* <Pressable onPress={onViewDifference} className="self-center mb-4"> */}
          <App_Text className="text-sm font-medium text-primary">
            What's the difference? →
          </App_Text>
        </Pressable>

        <Grading_Scale_Card
          scaleLabel="4.0"
          title="4.0 Scale"
          description="Most universities use a 4.0 scale grading system."
          badge="Popular"
          selected={selected === "4.0"}
          onPress={() => setSelected("4.0")}
        />

        <Grading_Scale_Card
          scaleLabel="5.0"
          title="5.0 Scale"
          description="Some universities use a 5.0 scale grading system."
          selected={selected === "5.0"}
          onPress={() => setSelected("5.0")}
        />

        <App_Button
          title="Continue"
          onPress={handleContinue}
          loading={isPending}
          className="mt-4"
        />

        <View className="flex-row items-center gap-2 justify-center mt-4">
          <Feather name="info" size={14} color="#A89790" />
          <App_Text className="text-xs text-muted">
            You can change this later in settings.
          </App_Text>
        </View>
      </ScrollView>

      {/* <Why_Important_Modal ref={whySheetRef} onDismiss={closeeWhyRef} /> */}
      <Info_Modal
        ref={whySheetRef}
        title="Why is this important?"
        description="Your grading system affects how your GPA and CGPA are calculated across all semesters."
        onDismiss={() => whySheetRef.current?.dismiss()}
      />
      {/* <BottomSheetModal
        ref={whySheetRef}
        enableDynamicSizing
        enablePanDownToClose
        // onDismiss={onClose}
        // detached={detached}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.4}
          />
        )}
      >
        <BottomSheetView className="px-6 pt-2 pb-8">
        
          <View className="mt-2">
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Recusandae est fugit accusamus corporis libero, incidunt nemo
              expedita tempore reiciendis ducimus iure sapiente repellendus quia
              magnam, in alias, temporibus at nam!
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal> */}
      {/* </> */}
    </SafeAreaView>
  );
}
