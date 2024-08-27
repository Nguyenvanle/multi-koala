import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "@/components/common/Button"; // Đường dẫn tới file Button.tsx
import Home from "@/app/(tabs)/(home)/home";
import { button, text } from "@/constants/Styles";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Xử lý đăng nhập
    if (username && password) {
      Alert.alert("Thông báo", "Đăng nhập thành công");
      <Home />;
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập tên người dùng và mật khẩu");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Button
        title="Sign in with Facebook"
        onPress={() => Alert.alert("Facebook Login")}
        buttonStyle={button.Authen}
        textStyle={text.h4}
      />
      <Button
        title="Sign in with Google"
        onPress={() => Alert.alert("Google Login")}
        buttonStyle={button.Authen}
        textStyle={text.h4}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => Alert.alert("Forgot Password?")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  forgotPassword: {
    color: "#007BFF",
    textAlign: "center",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#38B2A0",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default SignIn;
