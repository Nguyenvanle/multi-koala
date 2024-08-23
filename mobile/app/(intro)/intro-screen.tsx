import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Styles } from "@/constants/Styles";

const IntroScreen = () => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => router.replace("/home")}>
        <Text>Intro</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroScreen;
