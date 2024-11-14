import { View, Text, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { forgot } from "@/app/(auth)/forgot";
import useOtp from "../../../hooks/useOtp";

const EnterOTP = () => {
  const {
    otp,
    otpErrorMessage,
    otpSuccessMessage,
    otpRefs,
    isOtpSent,
    email,
    handleConfirmOtp,
    handleSendOtp,
    setOtp,
  } = useOtp();

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{ height: 80, marginTop: 40 }}>
        <Text
          style={{
            ...text.h2,
            color: Colors.teal_dark,
            fontWeight: "bold",
          }}
        >
          Please enter OTP code
        </Text>
      </View>
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
                const prevInput = index - 1;
                if (prevInput < otp.length) {
                  otpRefs.current[prevInput]?.focus();
                }
              }
            }}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (otpRefs.current[index] = ref)} // Gán ref cho ô
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default EnterOTP;
