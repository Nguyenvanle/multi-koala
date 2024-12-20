import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import Label from "@/components/atoms/label";
import LinkLabel from "@/feature/auth/components/atoms/link-label";
import { text } from "@/constants/Styles";
import InputLabel from "@/feature/auth/components/atoms/input-label";
import { Colors } from "@/constants/Colors";
import useRegisterForm from "@/feature/auth/hooks/useRegisterForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InputEmail = () => {
  const { loading, error, email, setEmail, onSubmit, errorMessage } =
    useRegisterForm();

  const handleEmailChange = async (value) => {
    setEmail(value);
    try {
      await AsyncStorage.setItem("userEmail", value);
    } catch (error) {
      console.error("Error saving email to AsyncStorage", error);
    }
  };

  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error("Error fetching email from AsyncStorage", error);
      }
    };

    getEmailFromStorage();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View style={{ alignSelf: "baseline", paddingTop: 24 }}>
        <InputLabel title="Email" style={{ ...text.p, fontWeight: "500" }} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.grey}
        value={email}
        onChangeText={handleEmailChange} // Update this line
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <View style={styles.termsContainer}>
        <Label
          title="By signing up for Duokoala you acknowledge that you agree to Koala Team's"
          style={{ ...text.subtitle }}
        />
        <LinkLabel
          title="Terms of Service"
          style={{ ...text.link, fontSize: 16, fontWeight: "500" }}
        />
        <Label title=" and" style={{ ...text.subtitle }} />
        <LinkLabel
          title=" Privacy Policy"
          style={{ ...text.link, fontSize: 16, fontWeight: "500" }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputEmail;

const styles = StyleSheet.create({
  termsContainer: {
    justifyContent: "flex-start",
    width: 350,
    flexDirection: "row",
    paddingTop: 8,
    gap: 6,
    flexWrap: "wrap",
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
});
