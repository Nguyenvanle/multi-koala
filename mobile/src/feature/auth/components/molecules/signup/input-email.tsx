import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Label from "@/src/components/atoms/label";
import LinkLabel from "@/src/feature/auth/components/atoms/link-label";
import { text } from "@/src/constants/Styles";
import InputLabel from "@/src/feature/auth/components/atoms/input-label";
import { Colors } from "@/src/constants/Colors";
import useRegisterForm from "@/src/feature/auth/hooks/useRegisterForm";

const InputEmail = () => {
  const { loading, error, email, setEmail, onSubmit, errorMessage } =
    useRegisterForm();
  return (
    <KeyboardAvoidingView
      style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    ></KeyboardAvoidingView>
  );
};

export default InputEmail;

const styles = StyleSheet.create({});
