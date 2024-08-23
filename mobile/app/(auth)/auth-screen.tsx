import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Styles from "@/constants/Styles";
import { router } from "expo-router";

const AuthScreen = () => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => router.replace("/(home)/home")}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <Text>Sign Up</Text>
      <Text>Confirm Email</Text>
      <Text>Forgot Password?</Text>
    </View>
  );
};

export default AuthScreen;
