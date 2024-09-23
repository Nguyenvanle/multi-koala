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
    <View style={forgot.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={forgot.otpInput}
          value={digit}
          onChangeText={(text) => {
            const newOtp = [...otp];

            if (text.length <= 1 && /^[0-9]*$/.test(text)) {
              // Chỉ cho phép nhập 1 ký tự số
              newOtp[index] = text;
              setOtp(newOtp);

              // Chuyển đến ô tiếp theo nếu có giá trị nhập vào
              if (text) {
                const nextInput = index + 1;
                if (nextInput < otp.length) {
                  otpRefs.current[nextInput]?.focus();
                }
              }
            } else if (text.length === 0) {
              // Nếu xóa ký tự, cập nhật giá trị
              newOtp[index] = "";
              setOtp(newOtp);
            }
          }}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (otpRefs.current[index] = ref)} // Gán ref cho ô
        />
      ))}
    </View>
  );
};

export default InputOtpForgotPassword;
