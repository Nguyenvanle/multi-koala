import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { StatusBar } from "react-native";
import CircleStyle from "@/components/molecules/front-end/CircleStyle";
import InputEmail from "@/feature/auth/components/molecules/signup/input-email";
import OtherSignUp from "@/feature/auth/components/molecules/signup/other-signup";
import Button from "@/components/atoms/button";
import SignInRouter from "@/feature/auth/components/molecules/signup/signin-router";
import useRegisterForm from "@/feature/auth/hooks/useRegisterForm";
import { router } from "expo-router";

const SignUp: React.FC = () => {
  const { loading, errorMessage } = useRegisterForm();

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <Text style={styles.title}>Sign Up</Text>
        <OtherSignUp />
        <InputEmail />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Button
          title={loading ? "Please wait..." : "Continue with Email"}
          style={styles.loginButton}
          onPress={() => router.push("/(auth)/form")}
          textStyle={{ ...text.h4, color: Colors.white }}
        />
        <SignInRouter />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...text.h1,
    fontWeight: "bold",
    color: Colors.teal_dark,
    height: 120,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  loginButton: {
    width: 350,
    backgroundColor: Colors.teal_dark,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  errorText: {
    color: Colors.red,
    textAlign: "center",
    marginVertical: 10,
  },

  termsContainer: {
    justifyContent: "flex-start",
    width: 350,
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default SignUp;
