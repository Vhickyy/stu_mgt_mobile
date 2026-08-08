import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { FlatList, Modal, Pressable, View } from "react-native";
import App_Text from "./App_Text";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MAX_MENU_HEIGHT = 260;

export default function App_Select({
  label,
  value,
  options,
  onChange,
  placeholder = "Select",
}: SelectFieldProps) {
  const triggerRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<TriggerLayout | null>(null);

  const selectedOption = options.find((o) => o.value === value);

  function handleOpen() {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
      setOpen(true);
    });
  }

  return (
    <View className="w-full gap-2">
      {label && (
        <App_Text variant="bodySmall" className="text-text font-medium">
          {label}
        </App_Text>
      )}

      <Pressable
        ref={triggerRef}
        onPress={handleOpen}
        className="border border-border rounded-xl flex-row items-center justify-between px-4 h-14 bg-surface"
      >
        <App_Text
          variant="body"
          className={selectedOption ? "text-text" : "text-muted"}
        >
          {selectedOption?.label ?? placeholder}
        </App_Text>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#A89790"
        />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable className="flex-1" onPress={() => setOpen(false)}>
          {layout && (
            <View
              style={{
                position: "absolute",
                top: layout.y + layout.height + 6,
                left: layout.x,
                width: layout.width,
                maxHeight: MAX_MENU_HEIGHT,
              }}
              className="bg-surface rounded-xl border border-border overflow-hidden"
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                bounces={false}
                renderItem={({ item }) => {
                  const isSelected = item.value === value;
                  return (
                    <Pressable
                      onPress={() => {
                        onChange(item.value);
                        setOpen(false);
                      }}
                      className="flex-row items-center justify-between px-4 py-3 border-b border-border"
                    >
                      <App_Text
                        variant="body"
                        className={
                          isSelected ? "text-primary font-medium" : "text-text"
                        }
                      >
                        {item.label}
                      </App_Text>
                      {isSelected && (
                        <Feather name="check" size={16} color="#FF8A72" />
                      )}
                    </Pressable>
                  );
                }}
              />
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}
