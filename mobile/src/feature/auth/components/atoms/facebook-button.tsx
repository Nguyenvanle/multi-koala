import { ButtonProps } from "@/src/components/atoms/button";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FacebookButton({
  title,
  style,
  onPress,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={textStyle}>{title}</Text>
        <Ionicons
          name="logo-facebook"
          size={25}
          style={{ paddingLeft: 5, color: Colors.white }}
        />
      </View>
    </TouchableOpacity>
  );
}
