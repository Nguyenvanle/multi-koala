import { View, Text, Image, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { text } from "@/src/constants/Styles";
import { StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { router } from "expo-router";
import useUser from "@/src/feature/user/hooks/useUser"; // Import hook để lấy thông tin người dùng

const LogoScreen = () => {
  const { user } = useUser(); // Lấy thông tin người dùng

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        // Nếu người dùng đã đăng nhập, chuyển đến trang Home
        router.replace("/(home)/home");
      } else {
        // Nếu chưa đăng nhập, chuyển đến trang Intro
        router.replace("/(auth)/sign-in");
      }
    }, 1500);

    return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount
  }, [user]); // Chạy lại khi thông tin người dùng thay đổi

  return (
    <SafeAreaView style={logoscreen.containerlogo}>
      <StatusBar barStyle="dark-content" />
      <View style={logoscreen.Logo}>
        <Image source={require("@/src/assets/images/Logo.png")} />
        <Text
          style={{ ...text.h3, fontWeight: "bold", color: Colors.teal_dark }}
        >
          Small steps - big progress
        </Text>
      </View>
      <View style={logoscreen.myteam}>
        <Text style={text.p}>©2024 Koala Team</Text>
      </View>
    </SafeAreaView>
  );
};

export default LogoScreen;

export const logoscreen = StyleSheet.create({
  containerlogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.teal_light,
    paddingBottom: 15,
  },
  Logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  myteam: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
