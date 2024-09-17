import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";

const CircleStyle = () => {
  return (
    <View style={styles.container}>
      <View style={{ top: -200, left: -200 }}>
        <View style={styles.tealCircle}>
          <View style={styles.tealHalf} />
        </View>
      </View>
      <View style={{ left: -350, top: -200 }}>
        <View style={styles.whiteCircle}>
          <View style={styles.whiteHalf} />
        </View>
      </View>
    </View>
  );
};

export default CircleStyle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Đặt sát góc trên bên trái
    alignItems: "flex-start",
    backgroundColor: Colors.background,
  },
  tealCircle: {
    width: 300,
    height: 300,
    backgroundColor: Colors.teal_light, // Màu xanh
    borderRadius: 150, // Bán kính để tạo hình tròn
    overflow: "hidden",
    position: "absolute",
    top: 0, // Đặt ở phía trên cùng
    left: 0, // Đặt ở phía bên trái
    shadowOpacity: 1,
    shadowColor: Colors.grey,
  },
  tealHalf: {
    width: "100%",
    height: "50%", // Chỉ hiển thị nửa trên
    backgroundColor: Colors.teal_light,
    position: "absolute",
    top: 0, // Đặt nửa trên ở phía trên
    borderColor: Colors.grey,
  },
  whiteCircle: {
    width: 300,
    height: 300,
    backgroundColor: Colors.white,
    borderRadius: 150,
    overflow: "hidden",
    position: "absolute",
    top: 150, // Để nó nằm ở dưới hình tròn xanh
    left: 0,
    shadowOpacity: 1,
    shadowColor: Colors.grey,
  },
  whiteHalf: {
    width: "50%", // Chỉ hiển thị nửa bên trái
    height: "100%",
    backgroundColor: Colors.white,
    position: "absolute",
    left: 0, // Đặt ở bên trái
    borderColor: Colors.grey,
  },
});
