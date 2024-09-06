import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "@/components/common/Button";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { useRouter } from "expo-router";
import CircleStyle from "@/components/common/CircleStyle";
import openFacebook from "@/service/FacebookAuthen";
import openGmail from "@/service/GoogleAuthen";

const acc = [
  {
    username: "Tule",
    password: "0102",
  },
];

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
  const router = useRouter(); // Khai báo router

  const handleSignIn = () => {
    // Kiểm tra nếu chưa nhập username hoặc password
    if (!username && !password) {
      setErrorMessage("Please enter your Username and Password");
      return; // Dừng hàm nếu không có dữ liệu
    }

    if (!username) {
      setErrorMessage("Please enter your Username");
      return; // Dừng hàm nếu không có username
    }

    if (!password) {
      setErrorMessage("Please enter your Password");
      return; // Dừng hàm nếu không có password
    }

    // Xử lý đăng nhập
    const user = acc.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (user) {
      // Nếu tìm thấy người dùng
      router.replace("/(home)/home"); // Điều hướng đến trang chính
    } else {
      // Nếu không tìm thấy người dùng
      setErrorMessage("Sign In failed. Please check again.");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0} // Điều chỉnh khoảng cách nếu cần
      >
        <Text
          style={{
            ...text.h1,
            fontWeight: "bold",
            color: Colors.teal_dark,
            paddingTop: 20,
            paddingHorizontal: 20,
            height: 120,
          }}
        >
          Sign In
        </Text>

        {/* Các button đăng nhập */}
        <Button
          title="Continue with Facebook"
          onPress={openFacebook}
          buttonStyle={{ backgroundColor: Colors.dark }}
          textStyle={{ color: Colors.white }}
          icon="logo-facebook"
        />
        <Button
          title="Continue with Google"
          onPress={openGmail}
          buttonStyle={{ backgroundColor: Colors.teal_dark }}
          textStyle={{ color: Colors.white }}
          icon="logo-google"
        />
        <Text
          style={{
            ...text.p,
            alignSelf: "center",
            paddingVertical: 50,
            fontWeight: "500",
          }}
        >
          Or
        </Text>

        {/* Nhập username */}
        <View
          style={{
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

        {/* Nhập password */}
        <View
          style={{
            alignSelf: "flex-start",
            paddingTop: 10,
          }}
        >
          <Text style={{ ...text.p, fontWeight: "500" }}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.grey}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Liên kết quên mật khẩu */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/forgot")}
          style={{ alignSelf: "baseline" }}
        >
          <Text
            style={{ ...text.link, color: Colors.teal_dark, fontWeight: "500" }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Nút đăng nhập */}
        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
          <Text style={{ ...text.h4, color: Colors.white }}>Sign In</Text>
        </TouchableOpacity>

        {/* Phần đăng ký tài khoản */}
        <View style={styles.registerContainer}>
          <Text style={text.p}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => router.replace("./sign-up")}>
            <Text
              style={{
                ...text.link,
                color: Colors.teal_dark,
                fontWeight: "500",
              }}
            >
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
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

export default SignIn;
