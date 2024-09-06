import { Colors } from "@/constants/Colors";
import { button, text } from "@/constants/Styles";
import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Hoặc thư viện icon bạn đang sử dụng

interface ButtonProps {
  title: string; // Tiêu đề của button
  onPress: () => void; // Hàm gọi khi button được nhấn
  buttonStyle?: ViewStyle; // Tùy chọn cho style của button
  textStyle?: TextStyle; // Tùy chọn cho style của text
  icon?: string; // Tên icon để hiển thị
  iconPosition?: "left" | "right"; // Vị trí của icon
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  icon,
  iconPosition = "left", // Mặc định hiển thị icon bên trái
}) => {
  return (
    <TouchableOpacity style={[button.Authen, buttonStyle]} onPress={onPress}>
      <View
        style={{
          flexDirection: iconPosition === "left" ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={25}
            color={Colors.white}
            style={{
              marginRight: iconPosition === "left" ? 5 : 0,
              marginLeft: iconPosition === "right" ? 5 : 0,
            }}
          />
        )}
        <Text style={[text.p, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
