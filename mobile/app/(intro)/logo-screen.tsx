import { View, Text, Image, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { text } from "@/constants/Styles";
import IntroScreen from "./intro-screen";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const LogoScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={logoscreen.containerlogo}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={logoscreen.Logo}>
          <Image source={require("@/assets/images/Logo.png")} />
          <Text style={text.h2}>Small steps, big progress</Text>
        </View>
        <View style={logoscreen.myteam}>
          <Text style={text.large}>©2024 Koala Team</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return <IntroScreen />;
  }
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
