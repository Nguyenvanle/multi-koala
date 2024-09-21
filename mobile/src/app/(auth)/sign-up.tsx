import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { button, Styles, text } from "@/src/constants/Styles";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CircleStyle from "@/src/components/common/CircleStyle";
import FacebookButton from "@/src/feature/auth/components/atoms/facebook-button";
import GoogleButton from "@/src/feature/auth/components/atoms/google-button";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmail = () => {
    if (!email) {
      setErrorMessage("Please enter your Email address.");
      return;
    }

    if (validateEmail(email)) {
      // Pass the email to the confirm page
      router.push({
        pathname: "/(auth)/confirm",
        params: { email: encodeURIComponent(email) },
      });
    } else {
      setErrorMessage("Please enter a valid email address.");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <Text style={styles.title}>Sign Up</Text>

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

        <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
          <Text style={{ ...text.p, fontWeight: "500" }}>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.grey}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.termsContainer}>
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
            <Text style={styles.signInText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...text.h1,
    fontWeight: "bold",
    color: Colors.teal_dark,
    height: 120,
    paddingTop: 20,
    paddingHorizontal: 20,
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
    color: Colors.red,
    textAlign: "center",
    marginVertical: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  termsContainer: {
    alignItems: "baseline",
    justifyContent: "center",
    width: 350,
    marginTop: 5,
  },
  signInText: {
    ...text.link,
    color: Colors.teal_dark,
    fontWeight: "500",
  },
});

export default SignUp;
