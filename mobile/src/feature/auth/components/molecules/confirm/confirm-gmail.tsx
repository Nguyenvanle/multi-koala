import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import useOtp from "../../../hooks/useOtp";

const ConfirmGmail = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

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
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (email == "") {
    setErrorMessage("Please enter your Email address.");
    return;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <Text
        style={{
          ...text.h2,
          fontWeight: "bold",
          color: Colors.teal_dark,
          height: 120,
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        Confirm your Email
      </Text>

      <Text
        style={{
          ...text.large,
          alignSelf: "center",
          height: 70,
          marginHorizontal: 50,
          alignItems: "baseline",
        }}
      >
        To continue, click{" "}
        <Text
          style={{ ...text.large, fontWeight: "500" }}
          onPress={handleConfirmOtp}
        >
          Open Gmail
        </Text>
        , you will need to verify this is your email in order to continue Sign
        up
      </Text>
    </SafeAreaView>
  );
};

export default ConfirmGmail;
