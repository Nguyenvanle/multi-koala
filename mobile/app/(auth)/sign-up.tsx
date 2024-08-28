import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Home from "@/app/(tabs)/(home)/home";
import Button from "@/components/common/Button";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { useRouter } from "expo-router";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Khai báo router

  const handleLogin = () => {
    // Xử lý đăng nhập
    if (username && password) {
      Alert.alert("Notification", "Sign in successfully!!!.");
      <Home />;
    } else {
      Alert.alert("Notification", "Please enter username and password.");
    }
  };

  return (
    <View style={{ ...Styles.container, flex: 0 }}>
      <Text
        style={{
          ...text.h1,
          color: Colors.teal_dark,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        Sign In
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
        buttonStyle={{ backgroundColor: Colors.teal_dark }}
        textStyle={{ color: Colors.white }}
      />
      <Text style={{ ...text.p, alignSelf: "center", paddingVertical: 50 }}>
        Or
      </Text>
      <View style={{ alignSelf: "baseline", paddingLeft: 5, paddingTop: 10 }}>
        <Text style={text.p}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={Colors.grey}
        value={username}
        onChangeText={setUsername}
      />
      <View style={{ alignSelf: "baseline", paddingLeft: 5, paddingTop: 10 }}>
        <Text style={text.p}>Password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.grey}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => Alert.alert("Forgot Password?")}
        style={{ alignSelf: "baseline" }}
      >
        <Text style={{ ...text.link, color: Colors.teal_dark }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={{ ...text.h4, color: Colors.white }}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={text.p}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => router.replace("./sign-up")}>
          <Text style={{ ...text.link, color: Colors.teal_dark }}>
            {" "}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 50,
  },
});

export default SignIn;
