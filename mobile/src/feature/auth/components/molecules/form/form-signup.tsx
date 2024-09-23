import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import useRegisterForm from "../../../hooks/useRegisterForm";

const FormSigUp = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    loading,
    error,
    onSubmit,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    errorMessage,
    setErrorMessage,
  } = useRegisterForm();

  return (
    <KeyboardAvoidingView
      style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100} // Điều chỉnh khoảng cách nếu cần
    >
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Email</Text>
      </View>
      <Text style={{ ...text.p, fontWeight: "500" }}>{email}</Text>
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={Colors.grey}
        value={username}
        onChangeText={setUsername}
      />
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>First Name</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor={Colors.grey}
        value={firstName}
        onChangeText={setFirstName}
      />
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Last Name</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor={Colors.grey}
        value={lastName}
        onChangeText={setLastName}
      />
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
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
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}> Confirm Password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={Colors.grey}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
    </KeyboardAvoidingView>
  );
};

export default FormSigUp;

export const styles = StyleSheet.create({
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
