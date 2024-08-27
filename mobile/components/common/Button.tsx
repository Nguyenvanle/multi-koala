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
  const [isPressed, setIsPressed] = useState(false); // State để theo dõi trạng thái nhấn

  const handlePressIn = () => {
    setIsPressed(true); // Đặt trạng thái là nhấn
  };

  const handlePressOut = () => {
    setIsPressed(false); // Đặt trạng thái là không nhấn
  };

  return (
    <TouchableOpacity
      style={[
        button.Authen,
        buttonStyle,
        { backgroundColor: isPressed ? Colors.teal_dark : Colors.background }, // Thay màu nền dựa trên trạng thái
      ]}
      onPress={onPress}
      onPressIn={handlePressIn} // Khi nhấn vào
      onPressOut={handlePressOut} // Khi bỏ tay ra
    >
      <Text style={[text.p, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
