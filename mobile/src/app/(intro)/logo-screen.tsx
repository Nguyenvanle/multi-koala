import { View, Text, Image, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { text } from "@/src/constants/Styles";
import { StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { router } from "expo-router";

const LogoScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(intro)/intro-screen");
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={logoscreen.containerlogo}>
      <StatusBar barStyle="dark-content"></StatusBar>
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
