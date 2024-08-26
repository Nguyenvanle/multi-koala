import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { Styles, text } from "@/constants/Styles";
import { IntroDetails } from "@/components/specific/IntroDetails";

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
