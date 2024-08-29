import CircleStyle from "@/components/common/CircleStyle";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { styles } from "./sign-in";

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // Mảng để chứa từng số của OTP
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendOtp = () => {
    // Giả sử gọi API gửi OTP tới email dựa trên username
    if (username) {
      setIsOtpSent(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter your username.");
    }
  };

  const handleConfirmOtp = () => {
    const otpValue = otp.join("");
    const validOtp = "1234"; // Giả sử đây là OTP đã gửi

    if (otpValue === validOtp) {
      setErrorMessage("");
      setSuccessMessage("OTP confirmed successfully!"); // Cập nhật successMessage
      // Bạn có thể thêm code cần thiết khác ở đây
    } else {
      setErrorMessage("OTP code is incorrect. Please check again.");
      setSuccessMessage(""); // Đặt lại successMessage nếu OTP không đúng
    }
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Vui lòng điền vào cả hai trường mật khẩu.");
      setSuccessMessage(""); // Đặt lại successMessage nếu mật khẩu không hợp lệ
      return;
    }

    if (newPassword === confirmPassword) {
      setSuccessMessage("Mật khẩu đã được đặt lại thành công!");
      setErrorMessage("");
      // Thực hiện gọi API để lưu mật khẩu mới
      console.log("Đặt lại mật khẩu thành công:", newPassword);
    } else {
      setErrorMessage("Mật khẩu xác nhận không trùng khớp.");
      setSuccessMessage(""); // Đặt lại successMessage nếu mật khẩu không trùng khớp
    }
  };

  const otpRefs = useRef<Array<TextInput | null>>([]);

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"light-content"} />
      <CircleStyle />
      {!isOtpSent ? (
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
              marginHorizontal: 35,
              alignSelf: "flex-start",
              paddingTop: 10,
            }}
          >
            <Text style={{ ...text.p, fontWeight: "500" }}>Username</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={Colors.grey}
            value={username}
            onChangeText={setUsername}
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
      ) : (
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

                    // Chuyển về ô trước đó nếu không phải ô đầu tiên
                    if (index > 0) {
                      const prevInput = index - 1;
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
          <TouchableOpacity
            style={{ ...styles.loginButton, marginTop: 10, marginBottom: 30 }}
            onPress={handleConfirmOtp}
          >
            <Text style={{ ...text.h4, color: Colors.white }}>Confirm OTP</Text>
          </TouchableOpacity>

          {successMessage && (
            <>
              <Text
                style={{
                  ...text.h3,
                  color: Colors.teal_dark,
                  alignSelf: "center",
                  fontWeight: "500",
                  marginTop: 30,
                }}
              >
                Please enter your new password
              </Text>
              <View
                style={{
                  marginHorizontal: 35,
                  alignSelf: "flex-start",
                  paddingTop: 10,
                }}
              >
                <Text style={{ ...text.p, fontWeight: "500" }}>
                  New password
                </Text>
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
                  marginHorizontal: 35,
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
              {errorMessage ? (
                <Text style={forgot.error}>{errorMessage}</Text>
              ) : null}
              <Text style={forgot.success}>{successMessage}</Text>
              {errorMessage ? (
                <Text style={forgot.error}>{errorMessage}</Text>
              ) : null}
              {/* Nếu OTP đúng, hiển thị ô nhập mật khẩu mới */}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const forgot = StyleSheet.create({
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
    height: 60,
    width: 60,
    borderColor: Colors.dark,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 10,
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
