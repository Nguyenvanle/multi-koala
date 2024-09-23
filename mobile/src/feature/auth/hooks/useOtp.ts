import { View, Text, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

const useOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const otpRefs = useRef<Array<TextInput | null>>([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { email } = useLocalSearchParams();
  const validOtp = "123456";
  useEffect(() => {
    if (email) {
      setIsOtpSent(true);
    }
  }, [email]);

  const handleConfirmOtp = () => {
    const otpValue = otp.join("");
    if (otpValue === validOtp) {
      setOtpErrorMessage("");
      router.replace("/(auth)/form");
    } else {
      setOtpErrorMessage("OTP code is incorrect. Please check again.");
      setOtpSuccessMessage(""); // Đặt lại successMessage nếu OTP không đúng
    }
  };

  const handleSendOtp = () => {
    // Giả sử gọi API gửi OTP tới email dựa trên username
    setIsOtpSent(true);
  };

  return {
    otp,
    otpErrorMessage,
    otpSuccessMessage,
    otpRefs,
    isOtpSent,
    email,
    handleConfirmOtp,
    handleSendOtp,
    setOtp,
  };
};

export default useOtp;
