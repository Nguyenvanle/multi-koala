import CircleStyle from "@/src/components/common/CircleStyle";
import { Colors } from "@/src/constants/Colors";
import { Styles, text } from "@/src/constants/Styles";
import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./sign-in";
import { router } from "expo-router";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Mảng để chứa từng số của OTP
  const [isOtpSent, setIsOtpSent] = useState(false);
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
            <Text
              style={{
                ...text.h2,
                fontWeight: "bold",
                color: Colors.teal_dark,
                paddingTop: 20,
                paddingHorizontal: 20,
                height: 120,
              }}
            >
              Forgot Password
            </Text>

            <View
              style={{
                alignSelf: "flex-start",
                paddingTop: 10,
              }}
            >
              <Text style={{ ...text.p, fontWeight: "500" }}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={Colors.grey}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errorMessage ? (
              <Text style={forgot.error}>{errorMessage}</Text>
            ) : null}
            <TouchableOpacity
              style={{ ...styles.loginButton, marginTop: 10 }}
              onPress={handleSendOtp}
            >
              <Text style={{ ...text.h4, color: Colors.white }}>Send OTP</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 2 && (
          <>
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
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={(ref) => (otpRefs.current[index] = ref)} // Gán ref cho ô
                />
              ))}
            </View>
            {otpErrorMessage ? (
              <Text style={forgot.error}>{otpErrorMessage}</Text>
            ) : null}
            <Text style={forgot.success}>{otpSuccessMessage}</Text>
            <TouchableOpacity
              style={{ ...styles.loginButton, marginTop: 10, marginBottom: 30 }}
              onPress={handleConfirmOtp}
            >
              <Text style={{ ...text.h4, color: Colors.white }}>
                Confirm OTP
              </Text>
            </TouchableOpacity>
          </>
        )}
        {step === 3 && (
          <>
            <Text
              style={{
                ...text.h3,
                color: Colors.teal_dark,
                alignSelf: "center",
                fontWeight: "500",
                marginVertical: 30,
              }}
            >
              Please enter your new password
            </Text>
            <View
              style={{
                alignSelf: "flex-start",
                paddingTop: 10,
              }}
            >
              <Text style={{ ...text.p, fontWeight: "500" }}>New password</Text>
            </View>
            <TextInput
              style={styles.input}
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
              <Text style={{ ...text.p, fontWeight: "500" }}>
                Confirm new password
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor={Colors.grey}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {passwordErrorMessage ? (
              <Text style={forgot.error}>{passwordErrorMessage}</Text>
            ) : null}
            <TouchableOpacity
              style={{
                ...styles.loginButton,
                marginTop: 10,
                marginBottom: 30,
              }}
              onPress={handleResetPassword}
            >
              <Text style={{ ...text.h4, color: Colors.white }}>
                Reset Password
              </Text>
            </TouchableOpacity>
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
