import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React from "react";
import Label from "@/components/atoms/label";
import { forgot } from "@/app/(auth)/forgot";
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import userForgotPassword from "../../../hooks/userForgotPassword";

const InputEmail = () => {
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
    >
      <View
        style={{
          alignSelf: "flex-start",
          paddingTop: 10,
        }}
      >
        <Label title="Email" style={{ ...text.p, fontWeight: "500" }} />
      </View>
      <TextInput
        style={forgot.input}
        placeholder="Username"
        placeholderTextColor={Colors.grey}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </KeyboardAvoidingView>
  );
};

export default InputEmail;
