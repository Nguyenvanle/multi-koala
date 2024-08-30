import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CircleStyle from "@/components/common/CircleStyle";

const Confirm: React.FC = () => {
  const router = useRouter(); // Khai báo router

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <Text
        style={{
          ...text.h2,
          fontWeight: "bold",
          color: Colors.teal_dark,
          height: 120,
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        Confirm your Email
      </Text>

      <Text
        style={{
          ...text.large,
          alignSelf: "center",
          height: 70,
          marginHorizontal: 50,
          alignItems: "baseline",
        }}
      >
        To continue, click{" "}
        <Text style={{ ...text.large, fontWeight: "500" }}>Open Gmail</Text>,
        you will need to verify this is your email in order to continue Sign up
      </Text>

      <TouchableOpacity
        style={{
          ...styles.loginButton,
          backgroundColor: Colors.dark,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={() => router.replace("/(auth)/form")}
      >
        <Text style={{ ...text.h3, color: Colors.white }}>Open Gmail</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    marginVertical: 10,
    paddingLeft: 10,
  },
  loginButton: {
    width: 350,
    backgroundColor: Colors.teal_dark,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
});

export default Confirm;
