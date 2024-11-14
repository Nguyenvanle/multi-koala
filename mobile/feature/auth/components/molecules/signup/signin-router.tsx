import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { text } from "@/constants/Styles";
import Button from "@/components/atoms/button";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const SignInRouter = () => {
  return (
    <View style={styles.registerContainer}>
      <Text style={text.p}>Not signed in yet?</Text>
      <Button
        onPress={() => router.replace("/(auth)/sign-in")}
        title=" Sign In"
        textStyle={styles.signInText}
      />
    </View>
  );
};

export default SignInRouter;

const styles = StyleSheet.create({
  registerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  signInText: {
    ...text.link,
    color: Colors.teal_dark,
    fontWeight: "500",
  },
});
