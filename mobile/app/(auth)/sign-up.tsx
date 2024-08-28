import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import Button from "@/components/common/Button";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CircleStyle from "@/components/common/CircleStyle";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter(); // Khai báo router

  const handleEmail = () => {
    // Xử lý email
    if (email) {
      Alert.alert("Notification!", "Valid Email.");
      router.push("/(auth)/confirm"); // Chuyển hướng tới trang Home
    } else {
      Alert.alert("Error!", "Invalid email, please check again.");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
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
        buttonStyle={{ backgroundColor: Colors.teal_dark }}
        textStyle={{ color: Colors.white }}
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
      <View style={{ alignSelf: "baseline", paddingLeft: 35, paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Email</Text>
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

      <TouchableOpacity style={styles.loginButton} onPress={handleEmail}>
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
});

export default SignUp;
