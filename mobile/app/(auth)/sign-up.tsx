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
import SignIn from "./sign-in";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter(); // Khai báo router

  return (
    <View style={Styles.container}>
      <Text
        style={{
          ...text.h1,
          color: Colors.teal_dark,
          paddingBottom: 20,
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
        buttonStyle={{ backgroundColor: Colors.teal_dark }}
        textStyle={{ color: Colors.white }}
      />
      <Text style={{ ...text.p, alignSelf: "center", paddingVertical: 50 }}>
        Or
      </Text>
      <View style={{ alignSelf: "baseline", paddingLeft: 35, paddingTop: 10 }}>
        <Text style={text.p}>Email</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.grey}
        value={email}
        onChangeText={setEmail}
      />

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

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/")}
      >
        <Text style={{ ...text.h4, color: Colors.white }}>
          Continue with Email
        </Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={text.p}>Not signed in yet?</Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
          <Text style={{ ...text.link, color: Colors.teal_dark }}>
            {" "}
            Sign In
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
    marginTop: 30,
  },
});

export default SignUp;
