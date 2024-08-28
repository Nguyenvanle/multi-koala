import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import CircleStyle from "@/components/common/CircleStyle";
import { Styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

const Home = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />

      <CircleStyle />
      <View style={{ height: 250, backgroundColor: Colors.black }}></View>
    </SafeAreaView>
  );
};

export default Home;
