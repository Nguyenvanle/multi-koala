import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Styles } from "@/src/constants/Styles";
import { IntroDetails } from "@/src/components/specific/IntroDetails";

const IntroScreen = () => {
  const [selectedIndex, setIndex] = React.useState(0);
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <IntroDetails />
    </SafeAreaView>
  );
};

export default IntroScreen;
