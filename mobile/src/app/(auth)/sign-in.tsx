import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import CircleStyle from "@/src//components/common/CircleStyle";
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import Button from "@/src/components/common/Button";
import { router } from "expo-router";

const API_URL = "https://humbly-thankful-mackerel.ngrok-free.app/auth/login"; // Đặt URL của bạn ở đây

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Please enter your Username and Password");
      return;
    }
    try {
      const response = await axios.post(API_URL, { username, password });
      if (response.data.code === 200) {
        console.log(response.data);
        router.replace("/(home)/home");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Sign In failed. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70} // Điều chỉnh khoảng cách nếu cần
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
          onPress={() => "openFacebook"}
          buttonStyle={{ backgroundColor: Colors.dark }}
          textStyle={{ color: Colors.white }}
          icon="logo-facebook"
        />
        <Button
          title="Continue with Google"
          onPress={() => "openGmail"}
          buttonStyle={{ backgroundColor: Colors.teal_dark }}
          textStyle={{ color: Colors.white }}
          icon="logo-google"
        />
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
          secureTextEntry={true}
          autoComplete="password" // Tắt gợi ý mật khẩu
          autoCorrect={false} // Tắt sửa chính tả
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
            style={{
              ...text.link,
              color: Colors.teal_dark,
              fontWeight: "500",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Nút đăng nhập */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
