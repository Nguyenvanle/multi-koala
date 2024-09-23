import CircleStyle from "@/src/components/common/CircleStyle";
import { Colors } from "@/src/constants/Colors";
import { Styles, text } from "@/src/constants/Styles";
import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./sign-in";
import userForgotPassword from "@/src/feature/auth/hooks/userForgotPassword";
import Label from "@/src/components/atoms/label";
import Button from "@/src/components/atoms/button";
import InputEmail from "@/src/feature/auth/components/molecules/signup/input-email";
import InputOtpForgotPassword from "@/src/feature/auth/components/molecules/forgot/inputotp-forgot";
import InputNewPassword from "@/src/feature/auth/components/molecules/forgot/input-newpassword";

const ForgotPasswordScreen = () => {
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
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"light-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Điều chỉnh khoảng cách nếu cần
      >
        {step === 1 && (
          <>
            <Label
              title="Forgot Password"
              style={{
                ...text.h2,
                fontWeight: "bold",
                color: Colors.teal_dark,
                paddingTop: 20,
                paddingHorizontal: 20,
                height: 120,
              }}
            />
            <InputEmail />
            {errorMessage ? (
              <Text style={forgot.error}>{errorMessage}</Text>
            ) : null}
            <Button
              title="Send OTP"
              textStyle={{ ...text.h4, color: Colors.white }}
              style={{ ...styles.loginButton, marginTop: 10 }}
              onPress={handleSendOtp}
            />
          </>
        )}
        {step === 2 && (
          <>
            <View style={{ height: 80, marginTop: 40 }}>
              <Label
                title="Please enter OTP code"
                style={{
                  ...text.h2,
                  color: Colors.teal_dark,
                  fontWeight: "bold",
                }}
              />
            </View>
            <InputOtpForgotPassword />
            {otpErrorMessage ? (
              <Label title={otpErrorMessage} style={forgot.error} />
            ) : null}
            <Label title={otpSuccessMessage} style={forgot.success} />
            <Button
              title="Confirm OTP"
              textStyle={{ ...text.h4, color: Colors.white }}
              style={{ ...styles.loginButton, marginTop: 10, marginBottom: 30 }}
              onPress={handleConfirmOtp}
            />
          </>
        )}
        {step === 3 && (
          <>
            <Label
              title="Please enter your new password"
              style={{
                ...text.h3,
                color: Colors.teal_dark,
                alignSelf: "center",
                fontWeight: "500",
                marginVertical: 30,
              }}
            />
            <InputNewPassword />
            {passwordErrorMessage ? (
              <Label title={passwordErrorMessage} style={forgot.error}></Label>
            ) : null}
            <Button
              title="Reset Password"
              style={{
                ...styles.loginButton,
                marginTop: 10,
                marginBottom: 30,
              }}
              textStyle={{ ...text.h4, color: Colors.white }}
              onPress={handleResetPassword}
            ></Button>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const forgot = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    marginVertical: 10,
    paddingLeft: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  otpInput: {
    height: 50,
    width: 50,
    borderColor: Colors.dark,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 5,
  },
  otpTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: Colors.red,
    fontWeight: "bold",
  },
  success: {
    color: Colors.teal_dark,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
