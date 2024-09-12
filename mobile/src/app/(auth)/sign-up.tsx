import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "@/src/components/common/Button";
import { Colors } from "@/src/constants/Colors";
import { Styles, text } from "@/src/constants/Styles";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CircleStyle from "@/src/components/common/CircleStyle";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter(); // Khai báo router
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy để kiểm tra định dạng email
    return emailRegex.test(email);
  };

  const handleEmail = () => {
    if (!email) {
      setErrorMessage("Please enter your Email address.");
      return;
    }
    // Xử lý email

    if (validateEmail(email)) {
      // Xử lý dữ liệu email hợp lệ ở đây
      router.push("/(auth)/confirm"); // Chuyển hướng tới trang Confirm
    } else {
      // Hiển thị thông báo lỗi nếu email không hợp lệ
      setErrorMessage("Please enter a valid email address.");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80} // Điều chỉnh khoảng cách nếu cần
      >
        <Text
          style={{
            ...text.h1,
            fontWeight: "bold",
            color: Colors.teal_dark,
            height: 120,
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
        >
          Sign Up
        </Text>

        <Button
          title="Continue with Facebook"
          onPress={() => Alert.alert("Facebook Login")}
          buttonStyle={{ backgroundColor: Colors.dark }}
          textStyle={{ color: Colors.white }}
        />
        <Button
          title="Continue with Google"
          onPress={() => Alert.alert("Google Login")}
          buttonStyle={{ backgroundColor: Colors.teal_dark, marginBottom: 30 }}
          textStyle={{ color: Colors.white }}
        />

        <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
          <Text style={{ ...text.p, fontWeight: "500" }}>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.grey}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Đặt kiểu bàn phím là email
          autoCapitalize="none" // Không tự động viết hoa chữ cái đầu
          textContentType="emailAddress" // Hỗ trợ tự động điền trên iOS
        />

        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View
          style={{
            alignItems: "baseline",
            justifyContent: "center",
            width: 350,
            marginTop: 5,
          }}
        >
          <Text style={text.subtitle}>
            By signing up for Duokoala you acknowledge that you agree to Koala
            Team's{" "}
            <Text style={{ ...text.link, fontWeight: "500" }}>
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text style={{ ...text.link, fontWeight: "500" }}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleEmail}>
          <Text style={{ ...text.h4, color: Colors.white }}>
            Continue with Email
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={text.p}>Not signed in yet?</Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
            <Text
              style={{
                ...text.link,
                color: Colors.teal_dark,
                fontWeight: "500",
              }}
            >
              {" "}
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
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
  loginButton: {
    width: 350,
    backgroundColor: Colors.teal_dark,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  errorText: {
    color: Colors.red, // Màu cho thông báo lỗi
    textAlign: "center",
    marginVertical: 10,
  },
});

export default SignUp;
