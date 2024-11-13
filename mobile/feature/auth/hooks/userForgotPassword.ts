import { View, Text, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";

const userForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Mảng để chứa từng số của OTP
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập OTP, 3: nhập mật khẩu mới

  const acc = [
    {
      password: "tulevippro1908",
      confirm_password: "tulevippro1908",
    },
  ];
  const handleSendOtp = () => {
    // Giả sử gọi API gửi OTP tới email dựa trên email
    if (email) {
      setStep(2);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter your email.");
    }
  };

  const handleConfirmOtp = () => {
    const otpValue = otp.join("");
    const validOtp = "123456"; // Giả sử đây là OTP đã gửi

    if (otpValue === validOtp) {
      setStep(3);
    } else {
      setOtpErrorMessage("OTP code is incorrect. Please check again.");
      setOtpSuccessMessage(""); // Đặt lại successMessage nếu OTP không đúng
    }
  };

  const handleResetPassword = () => {
    if (!newPassword && !confirmPassword) {
      setPasswordErrorMessage("Please enter your new password and confirm it."); // Thông báo lỗi khi cả hai trường đều trống
      return;
    }

    // Kiểm tra xem trường nào còn thiếu
    if (!newPassword) {
      setPasswordErrorMessage("Please enter your new password.");
      return;
    }

    if (!confirmPassword) {
      setPasswordErrorMessage("Please confirm your new password.");
      return;
    }

    const user = acc.find(
      (acc) =>
        acc.password === newPassword && acc.confirm_password === confirmPassword
    );

    if (user) {
      // Nếu tìm thấy người dùng
      setErrorMessage("");
      router.replace("/(auth)/sign-in"); // Điều hướng đến trang dăng nhập
    } else {
      // Nếu không tìm thấy người dùng
      setErrorMessage("Reset password failed. Please check again.");
    }
  };

  const otpRefs = useRef<Array<TextInput | null>>([]);

  return {
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
  };
};

export default userForgotPassword;
