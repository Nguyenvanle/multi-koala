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
import InputLabel from "@/src/feature/auth/components/atoms/input-label";
import LinkLabel from "@/src/feature/auth/components/atoms/link-label";
import CircleStyle from "@/src/components/molecules/front-end/CircleStyle";

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
            <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
              <InputLabel
                title="Email"
                style={{ ...text.p, fontWeight: "500" }}
              />
            </View>
            <TextInput
              style={forgot.input}
              placeholder="Email"
              placeholderTextColor={Colors.grey}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
            <View style={forgot.termsContainer}>
              <Label
                title="By signing up for Duokoala you acknowledge that you agree to Koala Team's"
                style={{ ...text.subtitle }}
              />
              <LinkLabel
                title="Terms of Service"
                style={{ ...text.link, fontSize: 16, fontWeight: "500" }}
              />
              <Label title=" and" style={{ ...text.subtitle }} />
              <LinkLabel
                title=" Privacy Policy"
                style={{ ...text.link, fontSize: 16, fontWeight: "500" }}
              />
            </View>
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
  termsContainer: {
    justifyContent: "flex-start",
    width: 350,
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
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
