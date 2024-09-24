import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Styles, text } from "@/src/constants/Styles";
import useRegisterForm from "@/src/feature/auth/hooks/useRegisterForm";
import FormSigUp from "@/src/feature/auth/components/molecules/form/form-signup";
import Button from "@/src/components/atoms/button";
import CircleStyle from "@/src/components/molecules/front-end/CircleStyle";

const Form: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
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
        keyboardVerticalOffset={100} // Điều chỉnh khoảng cách nếu cần
      >
        <Text
          style={{
            ...text.h1,
            fontWeight: "bold",
            color: Colors.teal_dark,
            paddingTop: 20,
            height: 120,
            paddingHorizontal: 20,
          }}
        >
          Sign Up
        </Text>
        <FormSigUp />
        <Button
          style={{ ...styles.loginButton }}
          onPress={onSubmit}
          title="Sign Up"
          textStyle={{ ...text.h4, color: Colors.white }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
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
