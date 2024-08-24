import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const Home = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={home.header}>
        <View style={home.welcome}>
          <View style={circle.tealCircle}>
            <View style={circle.whiteCircle}>
              <Text style={text.h4}>Welcome</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

export const home = StyleSheet.create({
  header: {
    flex: 0,
    height: 50,
    backgroundColor: Colors.teal_light,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  welcome: {
    flexDirection: "row",
    justifyContent: "space-between",
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
