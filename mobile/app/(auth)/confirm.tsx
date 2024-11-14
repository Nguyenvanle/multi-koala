import React from "react";
import { Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { forgot } from "./forgot";
import useOtp from "@/feature/auth/hooks/useOtp";
import ConfirmGmail from "@/feature/auth/components/molecules/confirm/confirm-gmail";
import Button from "@/components/atoms/button";
import EnterOTP from "@/feature/auth/components/molecules/confirm/enter-otp";
import CircleStyle from "@/components/molecules/front-end/CircleStyle";
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

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
