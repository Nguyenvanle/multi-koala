import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Styles } from "@/src/constants/Styles";
import { IntroDetails } from "@/src/components/specific/intro/IntroDetails";

const IntroScreen = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <IntroDetails />
    </SafeAreaView>
  );
};

export default IntroScreen;
