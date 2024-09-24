import {
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import InputLabel from "../../atoms/input-label";
import { Colors } from "@/src/constants/Colors";
import useLoginForm from "../../../hooks/useLoginForm";

const InputSignIn = () => {
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
    <KeyboardAvoidingView
      style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70} // Điều chỉnh khoảng cách nếu cần
    >
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
    </KeyboardAvoidingView>
  );
};

export default InputSignIn;

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    marginVertical: 10,
    paddingLeft: 10,
  },
});
