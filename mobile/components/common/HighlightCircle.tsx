import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Styles } from "@/constants/Styles";

const HighlightCircle = () => {
  return (
    <View style={styles.tealCircle}>
      <View style={styles.whiteCircle} />
    </View>
  );
};

export default HighlightCircle;

const styles = StyleSheet.create({
  tealCircle: {
    position: "absolute",
    width: 300, // 96 * 4 (vì 1 đơn vị trong Tailwind = 4px)
    height: 300, // 96 * 4
    borderRadius: 192, // Để tạo hình tròn
    backgroundColor: "#38B2A0", // Màu teal-400
    bottom: "80%", // Đặt vị trí ở giữa dưới
    transform: [{ translateX: -50 }], // Dịch chuyển sang trái
  },
  whiteCircle: {
    position: "absolute",
    width: 300, // 72 * 4
    height: 300, // 72 * 4
    borderRadius: 192, // Để tạo hình tròn
    backgroundColor: "#FFFFFF", // Màu trắng
    right: "50%", // Đặt vị trí ở giữa phải
    transform: [{ translateY: 110 }], // Dịch chuyển lên
  },
});
