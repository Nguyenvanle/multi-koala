import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Styles } from "@/constants/Styles";
import { IntroDetails } from "@/feature/intro/components/introdetails";

const IntroScreen = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <IntroDetails />
    </SafeAreaView>
  );
};

export default IntroScreen;
