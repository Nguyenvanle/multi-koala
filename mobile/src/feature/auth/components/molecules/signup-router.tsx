import Label from "@/src/components/atoms/label";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import LinkLabel from "../atoms/link-label";
import { text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export default function SignupRouter() {
  return (
    <View style={style.registerContainer}>
      <Label title="Don't have an account yet?" />
      <TouchableOpacity onPress={() => router.replace("./sign-up")}>
        <LinkLabel
          title=" Sign Up"
          style={{
            ...text.link,
            color: Colors.teal_dark,
            fontWeight: "500",
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export const style = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});
