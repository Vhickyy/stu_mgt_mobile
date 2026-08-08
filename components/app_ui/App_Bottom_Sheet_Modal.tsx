import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { BackHandler, Pressable, View } from "react-native";

interface Props {
  title?: string;
  children: ReactNode;
  snapPoints?: string[];
  onClose: () => void;
  showCloseButton?: boolean;
  detached?: boolean;
}

const App_Bottom_Sheet_Modal = forwardRef<BottomSheetModal, Props>(
  (
    {
      title,
      children,
      snapPoints,
      onClose,
      showCloseButton = true,
      detached = false,
    },
    ref,
  ) => {
    const isOpenRef = useRef(false);

    useEffect(() => {
      const backAction = () => {
        if (
          isOpenRef.current &&
          ref &&
          typeof ref === "object" &&
          ref.current
        ) {
          ref.current.dismiss();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction,
      );

      return () => backHandler.remove();
    }, [ref]);

    const handleChange = useCallback((index: number) => {
      isOpenRef.current = index !== -1;
    }, []);

    const snaps = useMemo(
      () => (snapPoints?.length ? snapPoints : ["25%", "40%"]),
      [snapPoints],
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          {...props}
        />
      ),
      [],
    );

    const CustomBackground = useCallback(
      ({ style }: BottomSheetBackgroundProps) => (
        <View style={[style]}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              flex: 1,
              overflow: "hidden",
            }}
          />
        </View>
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={!detached ? snapPoints : undefined}
        enableDynamicSizing={detached}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: "#ccc" }}
        index={!detached ? 1 : undefined}
        enablePanDownToClose={true}
        android_keyboardInputMode="adjustResize"
        enableOverDrag={false}
        backgroundStyle={{ borderRadius: 0 }}
        style={{
          marginHorizontal: detached ? 15 : 0,
          overflow: "hidden",
        }}
        enableDismissOnClose={true}
        bottomInset={detached ? 50 : 0}
        backgroundComponent={CustomBackground}
        detached={detached}
        onChange={handleChange}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="none"
      >
        <BottomSheetView style={{ paddingBottom: 16 }}>
          {showCloseButton && (
            <Pressable
              onPress={onClose}
              className="absolute top-0 right-6 w-8 h-8 rounded-full bg-surface-soft items-center justify-center z-10"
            >
              <Feather name="x" size={16} color="#7B6A64" />
            </Pressable>
          )}
          <View className="mt-2 px-4">{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default App_Bottom_Sheet_Modal;
