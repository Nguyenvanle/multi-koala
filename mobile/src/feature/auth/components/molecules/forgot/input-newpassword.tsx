import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React from "react";
import userForgotPassword from "../../../hooks/userForgotPassword";
import Label from "@/src/components/atoms/label";
import { text } from "@/src/constants/Styles";
import { forgot } from "@/src/app/(auth)/forgot";
import { Colors } from "@/src/constants/Colors";

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
    >
      <View
        style={{
          alignSelf: "flex-start",
          paddingTop: 10,
        }}
      >
        <Label
          title="New password"
          style={{ ...text.p, fontWeight: "500" }}
        ></Label>
      </View>
      <TextInput
        style={forgot.input}
        placeholder="Password"
        placeholderTextColor={Colors.grey}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <View
        style={{
          alignSelf: "flex-start",
          paddingTop: 10,
        }}
      >
        <Label
          title="Confirm new password"
          style={{ ...text.p, fontWeight: "500" }}
        ></Label>
      </View>
      <TextInput
        style={forgot.input}
        placeholder="Confirm password"
        placeholderTextColor={Colors.grey}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
    </KeyboardAvoidingView>
  );
};

export default InputNewPassword;
