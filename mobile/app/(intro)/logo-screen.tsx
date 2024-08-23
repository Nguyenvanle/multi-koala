import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Styles from "@/constants/Styles";
import { Link, router } from "expo-router";

const LogoScreen = () => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => router.replace("/intro-screen")}>
        <Text>Logo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoScreen;
