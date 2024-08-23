import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Styles, text } from "@/constants/Styles";
import HighlightCircle from "@/components/common/HighlightCircle";
import { Colors } from "@/constants/Colors";

const Home = () => {
  return (
    <View style={Styles.container}>
      <View style={Progress.progressing}>
        <View style={Progress.User}>
          <Text style={{ ...text.h4, justifyContent: "flex-start" }}>
            Welcome
          </Text>
          <View style={Progress.Authen}>
            <TouchableOpacity
              style={{ ...Progress.ButtonAuth, backgroundColor: Colors.dark }}
            >
              <Text style={{ ...text.p, color: Colors.white }}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...Progress.ButtonAuth, backgroundColor: Colors.white }}
            >
              <Text style={{ ...text.p, color: Colors.black }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={Course.Option_course}></View>
    </View>
  );
};

export default Home;

export const Progress = StyleSheet.create({
  progressing: {
    backgroundColor: Colors.teal_light, // Màu teal-200
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 4 }, // Độ lệch của bóng
    shadowOpacity: 0.3, // Độ mờ của bóng
    shadowRadius: 6, // Bán kính của bóng
    borderRadius: 20,
  },
  User: {
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 50,
  },
  Authen: {
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  ButtonAuth: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
  },
});

export const Course = StyleSheet.create({
  Option_course: {
    flex: 1,
    padding: 5,
    paddingTop: 10,
    backgroundColor: Colors.blue,
  },
});
