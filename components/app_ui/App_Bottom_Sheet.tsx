import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
import { Text } from "react-native";

interface Props {
  title: string;
  children: ReactNode;
  snapPoints?: string[];
}
type IRef = BottomSheetMethods;

const App_Bottom_Sheet = forwardRef<IRef, Props>((props, ref) => {
  const snaps = useMemo(() => props?.snapPoints ?? ["25%", "50%"], []);
  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );
  return (
    <BottomSheet
      snapPoints={snaps}
      index={0}
      backdropComponent={renderBackDrop}
      backgroundStyle={{ backgroundColor: "white" }}
      ref={ref}
      enablePanDownToClose
      handleIndicatorStyle={{ display: "none" }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{props.title}</Text>
        {props.children}
      </BottomSheetView>
    </BottomSheet>
  );
});

export default App_Bottom_Sheet;
