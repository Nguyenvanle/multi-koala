import React from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CircleStyle from "@/src/components/molecules/front-end/CircleStyle";
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import Label from "@/src/components/atoms/label";
import Button from "@/src/components/atoms/button";
import useLoginForm from "@/src/feature/auth/hooks/useLoginForm";
import OtherSignIn from "@/src/feature/auth/components/molecules/signin/other-signin";
import SignUpRouter from "@/src/feature/auth/components/molecules/signin/signup-router";
import ForgotPassword from "@/src/feature/auth/components/molecules/signin/forgot-password";
import InputSignIn from "@/src/feature/auth/components/molecules/signin/input-signin";
import { router } from "expo-router";

const SignIn: React.FC = () => {
  const {
    loading,
    error,
    username,
    setUsername,
    password,
    setPassword,
    onSubmit,
  } = useLoginForm();

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content" />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
      >
        <Label
          style={{
            ...text.h1,
            fontWeight: "bold",
            color: Colors.teal_dark,
            paddingTop: 20,
            paddingHorizontal: 20,
            height: 120,
          }}
          title="Log In"
        />
        <OtherSignIn />

        <InputSignIn
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />

        <ForgotPassword />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button
          title={loading ? "Signing In..." : "Sign In"}
          style={styles.loginButton}
          onPress={onSubmit}
          textStyle={{ ...text.h4, color: Colors.white }}
        />
        <SignUpRouter />
        {/* Nút trở về Home */}
        <TouchableOpacity
          onPress={() => router.replace("/(home)/home")} //Điều hướng về trang Home
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  homeButtonText: {
    ...text.link,
    color: Colors.teal_dark,
    fontWeight: "bold",
  },
  loginButton: {
    width: 350,
    backgroundColor: Colors.teal_dark,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 16,
  },
  errorText: {
    color: Colors.red,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 16,
  },
});

export default SignIn;
