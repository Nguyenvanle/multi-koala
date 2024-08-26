import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "./Colors";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
export const text = StyleSheet.create({
  h2: {
    fontSize: 30,
    color: Colors.black,
  },
  h3: {
    fontSize: 24,
    color: Colors.black,
  },
  h4: {
    fontSize: 20,
    color: Colors.black,
  },
  p: {
    fontSize: 16,
    color: Colors.dark,
  },
  large: {
    fontSize: 18,
    color: Colors.dark,
  },
  blackquote: {
    fontSize: 16,
    color: Colors.dark,
    fontStyle: "italic",
  },
});

export const circle = StyleSheet.create({
  tealCircle: {
    position: "absolute",
    width: 300, // 96 * 4 (vì 1 đơn vị trong Tailwind = 4px)
    height: 300, // 96 * 4
    borderRadius: 192, // Để tạo hình tròn
    backgroundColor: "#38B2A0", // Màu teal-400
    // top: -530, // Để đưa hình tròn lên trên
    // transform: [{ translateX: -200 }], // Dịch chuyển sang trái
  },
  whiteCircle: {
    position: "absolute",
    width: 300, // 72 * 4
    height: 300, // 72 * 4
    borderRadius: 192, // Để tạo hình tròn
    backgroundColor: "#FFFFFF", // Màu trắng
    // right: "50%", // Đặt vị trí ở giữa phải
    // transform: [{ translateY: 110 }], // Dịch chuyển lên
  },
});
