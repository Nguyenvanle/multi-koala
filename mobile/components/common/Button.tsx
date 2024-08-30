import { Colors } from "@/constants/Colors";
import { button, text } from "@/constants/Styles";
import React, { useState } from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";

interface ButtonProps {
  title: string; // Tiêu đề của button
  onPress: () => void; // Hàm gọi khi button được nhấn
  buttonStyle?: ViewStyle; // Tùy chọn cho style của button
  textStyle?: TextStyle; // Tùy chọn cho style của text
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[button.Authen, buttonStyle]} onPress={onPress}>
      <Text style={[text.p, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
