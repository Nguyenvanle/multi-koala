import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { useRouter } from "expo-router";

const Form: React.FC = () => {
  const router = useRouter(); // Khai báo router

  return (
    <View style={Styles.container}>
      <Text
        style={{
          ...text.h2,
          fontWeight: "bold",
          color: Colors.teal_dark,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        Confirm your Email
      </Text>

      <Text
        style={{
          ...text.large,
          alignSelf: "center",
          paddingTop: 50,
          paddingHorizontal: 30,
        }}
      >
        To continue signing up, click the link that we emailed to abc@gmail.com.
      </Text>

      <TouchableOpacity
        style={{
          ...styles.loginButton,
          backgroundColor: Colors.dark,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={() => router.push("/(auth)/sign-up")}
      >
        <Text style={{ ...text.h3, color: Colors.white }}>Open Gmail</Text>
      </TouchableOpacity>
    </View>
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

export default Form;
