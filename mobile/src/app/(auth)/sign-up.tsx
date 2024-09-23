import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Styles, text } from "@/src/constants/Styles";
import { StatusBar } from "react-native";
import CircleStyle from "@/src/components/common/CircleStyle";
import InputEmail from "@/src/feature/auth/components/molecules/signup/input-email";
import OtherSignUp from "@/src/feature/auth/components/molecules/signup/other-signup";
import Button from "@/src/components/atoms/button";
import SignInRouter from "@/src/feature/auth/components/molecules/signup/signin-router";
import useRegisterForm from "@/src/feature/auth/hooks/useRegisterForm";
import { router } from "expo-router";

const SignUp: React.FC = () => {
  const {
    loading,
    error,
    onSubmit,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    errorMessage,
    setErrorMessage,
  } = useRegisterForm();

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
          onPress={() => router.push("/(auth)/confirm")}
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
