import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { Redirect, useRouter } from "expo-router";
import CircleStyle from "@/components/common/CircleStyle";
import { forgot } from "./forgot";

const Confirm: React.FC = () => {
  const router = useRouter(); // Khai báo router
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const otpRefs = useRef<Array<TextInput | null>>([]);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleConfirmOtp = () => {
    const otpValue = otp.join("");
    const validOtp = "123456"; // Giả sử đây là OTP đã gửi

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

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      {!isOtpSent ? (
        <>
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
            , you will need to verify this is your email in order to continue
            Sign up
          </Text>

          <TouchableOpacity
            style={{
              ...styles.loginButton,
              backgroundColor: Colors.dark,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={handleSendOtp}
          >
            <Text style={{ ...text.h3, color: Colors.white }}>Open Gmail</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <StatusBar barStyle={"light-content"} />
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
            <Text style={{ ...text.h4, color: Colors.white }}>Confirm OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  modalTitle: {
    ...text.h2,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
  closeButton: {
    color: Colors.teal_dark,
    marginTop: 15,
    fontWeight: "bold",
  },
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
