import React from "react";
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
import CircleStyle from "@/src//components/common/CircleStyle";
import { button, Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import { router } from "expo-router";
import Label from "@/src/components/atoms/label";
import FacebookButton from "@/src/feature/auth/components/atoms/facebook-button";
import GoogleButton from "@/src/feature/auth/components/atoms/google-button";
import InputLabel from "@/src/feature/auth/components/atoms/input-label";
import LinkLabel from "@/src/feature/auth/components/atoms/link-label";
import Button from "@/src/components/atoms/button";
import useLoginForm from "@/src/feature/auth/hooks/useLoginForm";

const SignIn = () => {
  const {
    loading,
    error,
    onSubmit,
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
  } = useLoginForm();
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70} // Điều chỉnh khoảng cách nếu cần
      >
        <Label
          style={{
            ...text.h1,
            fontWeight: "bold",
            color: Colors.teal_dark,
            paddingTop: 20,
            paddingHorizontal: 20,
            height: 120,
          }}
          title="Sign In"
        />
        {/* Các button đăng nhập */}
        <FacebookButton
          title="Continue with Facebook"
          style={{ ...button.Authen, backgroundColor: Colors.dark }}
          textStyle={{ color: Colors.white }}
        />
        <GoogleButton
          title="Continue with Google"
          style={{ ...button.Authen, backgroundColor: Colors.teal_dark }}
          textStyle={{ color: Colors.white }}
        />
        {/* Nhập username */}
        <View
          style={{
            alignSelf: "flex-start",
            paddingTop: 10,
          }}
        >
          <InputLabel title="Username" style={{ fontWeight: "500" }} />
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
          <InputLabel title="Password" style={{ fontWeight: "500" }} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.grey}
          secureTextEntry={true}
          autoComplete="password" // Tắt gợi ý mật khẩu
          autoCorrect={false} // Tắt sửa chính tả
          value={password}
          onChangeText={setPassword}
        />
        {/* Hiển thị thông báo lỗi nếu có */}
        {(errorMessage || error) && (
          <Text style={styles.errorText}>
            {errorMessage || (error as any)?.message}
          </Text>
        )}
        {/* Liên kết quên mật khẩu */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/forgot")}
          style={{ alignSelf: "baseline" }}
        >
          <LinkLabel
            title="Forgot Password?"
            style={{ color: Colors.teal_dark, fontWeight: "500" }}
          />
        </TouchableOpacity>
        {/* Nút đăng nhập */}
        <Button
          title={loading ? "Signing In..." : "Sign In"}
          style={styles.loginButton}
          onPress={onSubmit}
          textStyle={{ ...text.h4, color: Colors.white }}
        />
        {/* Phần đăng ký tài khoản */}
        <View style={styles.registerContainer}>
          <Label title="Don't have an account yet?" />
          <TouchableOpacity onPress={() => router.replace("./sign-up")}>
            <LinkLabel
              title=" Sign Up"
              style={{
                ...text.link,
                color: Colors.teal_dark,
                fontWeight: "500",
              }}
            />
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
