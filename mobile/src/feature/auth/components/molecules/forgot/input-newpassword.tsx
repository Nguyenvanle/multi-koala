import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React from "react";
import Label from "@/src/components/atoms/label";
import { text } from "@/src/constants/Styles";
import { forgot } from "@/src/app/(auth)/forgot";
import { Colors } from "@/src/constants/Colors";
import userForgotPassword from "../../../hooks/userForgotPassword";

const InputNewPassword = () => {
  const {
    email,
    setEmail,
    newPassword,
    setNewPassword,
    otp,
    setOtp,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    setErrorMessage,
    otpErrorMessage,
    setOtpErrorMessage,
    otpSuccessMessage,
    setOtpSuccessMessage,
    passwordErrorMessage,
    step,
    setStep,
    handleSendOtp,
    otpRefs,
    handleConfirmOtp,
    handleResetPassword,
  } = userForgotPassword();
  return (
    <KeyboardAvoidingView
      style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100} // Điều chỉnh khoảng cách nếu cần
    ></KeyboardAvoidingView>
  );
};

export default InputNewPassword;
