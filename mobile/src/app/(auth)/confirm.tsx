import React from "react";
import { Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Styles, text } from "@/src/constants/Styles";
import CircleStyle from "@/src/components/common/CircleStyle";
import { forgot } from "./forgot";
import useOtp from "@/src/feature/auth/hooks/useOtp";
import ConfirmGmail from "@/src/feature/auth/components/molecules/confirm/confirm-gmail";
import Button from "@/src/components/atoms/button";
import EnterOTP from "@/src/feature/auth/components/molecules/confirm/enter-otp";

const Confirm: React.FC = () => {
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
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      {!isOtpSent ? (
        <>
          <ConfirmGmail />
          <Button
            style={{
              ...styles.loginButton,
              backgroundColor: Colors.dark,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
            title="Open Gmail"
            textStyle={{ ...text.h3, color: Colors.white }}
            onPress={handleSendOtp}
          />
        </>
      ) : (
        <>
          <StatusBar barStyle={"light-content"} />
          <EnterOTP />
          {otpErrorMessage ? (
            <Text style={forgot.error}>{otpErrorMessage}</Text>
          ) : null}
          <Text style={forgot.success}>{otpSuccessMessage}</Text>
          <Button
            style={{ ...styles.loginButton, marginTop: 10, marginBottom: 30 }}
            onPress={handleConfirmOtp}
            textStyle={{ ...text.h4, color: Colors.white }}
            title="Confirm OTP"
          ></Button>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: 350,
    backgroundColor: Colors.teal_dark,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
});

export default Confirm;
