import App_Bottom_Sheet_Modal from "@/components/app_ui/App_Bottom_Sheet_Modal";
import App_Button from "@/components/app_ui/App_Button";
import App_Icon from "@/components/app_ui/App_Icon";
import App_Text from "@/components/app_ui/App_Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { Ref } from "react";
import { View } from "react-native";

interface Auth_Modal_Props {
  ref: Ref<BottomSheetModal>;
  onDismiss: () => void;
  title: string;
  message: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
  showBtn?: boolean;
  loading?: boolean;
}

const Success_Error_Modal = ({
  ref,
  onDismiss,
  title,
  message,
  buttonLabel = "Close",
  showBtn = false,
  onButtonPress,
  loading = false,
}: Auth_Modal_Props) => {
  return (
    <App_Bottom_Sheet_Modal detached ref={ref} onClose={onDismiss}>
      {loading ? (
        <View>
          <App_Text variant="subtitle">Processing...</App_Text>
        </View>
      ) : (
        <View>
          <View
            className="w-14 h-14 rounded-full items-center justify-center mx-auto mb-4 bg-primary"
            // style={{ backgroundColor: `${ICON_COLOR}1A` }}
          >
            {/* <Ionicons name="alert-circle" size={28} color={ICON_COLOR} /> */}
            <App_Icon name="alert-circle" />
          </View>

          <App_Text variant="subtitle" className="text-text mb-2 text-center">
            {title}
          </App_Text>

          <App_Text
            variant="bodySmall"
            className="text-text-secondary text-center mb-6"
          >
            {message}
          </App_Text>

          {showBtn && (
            <App_Button
              title={buttonLabel}
              onPress={() => {
                onDismiss();
                onButtonPress && onButtonPress();
              }}
              className="w-full"
            />
          )}
        </View>
      )}
    </App_Bottom_Sheet_Modal>
  );
};

export default Success_Error_Modal;
