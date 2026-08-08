import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ref } from "react";

export interface InfoSheetProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onDismiss: () => void;
  onButtonPress?: () => void;
  ref: Ref<BottomSheetModal>;
}
