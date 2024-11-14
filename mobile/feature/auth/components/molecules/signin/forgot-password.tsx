import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import LinkLabel from "../../atoms/link-label";
import { Colors } from "@/constants/Colors";

const ForgotPassword = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/(auth)/forgot")}
      style={{ alignSelf: "baseline" }}
    >
      <LinkLabel
        title="Forgot Password?"
        style={{ color: Colors.teal_dark, fontWeight: "500" }}
      />
    </TouchableOpacity>
  );
};

export default ForgotPassword;
