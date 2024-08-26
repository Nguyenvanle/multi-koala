import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const Home = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={home.header}>
        <View style={home.welcome}>
          <Text style={text.h4}>Welcome</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

export const home = StyleSheet.create({
  header: {
    flex: 0,
    height: 50,
    backgroundColor: Colors.teal_light,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  welcome: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
