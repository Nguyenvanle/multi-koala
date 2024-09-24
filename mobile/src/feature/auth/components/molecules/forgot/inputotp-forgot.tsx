import { View, Text, TextInput } from "react-native";
import React from "react";
import { forgot } from "@/src/app/(auth)/forgot";
import userForgotPassword from "../../../hooks/userForgotPassword";

const InputOtpForgotPassword = () => {
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
   
  );
};

export default InputOtpForgotPassword;
