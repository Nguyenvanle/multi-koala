import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import useRegisterForm from "../../../hooks/useRegisterForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormSignUp = () => {
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
    <View
      style={{
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 24,
      }}
    >
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Email</Text>
      </View>
      <TextInput
        style={{
          ...text.large,
          fontWeight: "500",
          width: 350,
          marginVertical: 10,
          paddingLeft: 10,
          color: Colors.teal_dark,
        }}
        value={email}
        editable={false}
      />
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
    </View>
  );
};

export default FormSignUp;

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
