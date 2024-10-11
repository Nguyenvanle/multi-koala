import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputLabel from "../../atoms/input-label";
import { Colors } from "@/src/constants/Colors";

interface InputSignInProps {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

const InputSignIn: React.FC<InputSignInProps> = ({
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
      <View style={{ alignSelf: "flex-start", paddingTop: 10 }}>
        <InputLabel title="Username" style={{ fontWeight: "500" }} />
      </View>
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={Colors.grey}
        value={username}
        onChangeText={setUsername}
      />
      <View style={{ alignSelf: "flex-start", paddingTop: 10 }}>
        <InputLabel title="Password" style={{ fontWeight: "500" }} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.grey}
        secureTextEntry={true}
        autoComplete="password"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
    </KeyboardAvoidingView>
  );
};

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

export default InputSignIn;
