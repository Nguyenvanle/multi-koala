import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSignUp from "@/feature/auth/hooks/useSignUp";

interface InputSignUpProps {
  username: string;
  setUserName: (username: string) => void;
  password: string;
  setPassWord: (password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  firstname: string;
  setFirstname: (firstname: string) => void;
  lastname: string;
  setLastname: (lastname: string) => void;
  confirm: string;
  setConfirm: (confirm: string) => void;
}

const FormSignUp: React.FC<InputSignUpProps> = ({
  username,
  setUserName,
  password,
  setPassWord,
  email,
  setEmail,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  confirm,
  setConfirm,
}) => {
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
        autoCapitalize="words"
        placeholderTextColor={Colors.grey}
        value={username}
        onChangeText={setUserName}
      />
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>First Name</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First name"
        autoCapitalize="words"
        placeholderTextColor={Colors.grey}
        value={firstname}
        onChangeText={setFirstname}
      />
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Last Name</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor={Colors.grey}
        autoCapitalize="words"
        value={lastname}
        onChangeText={setLastname}
      />
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.grey}
        value={password}
        onChangeText={setPassWord}
        secureTextEntry
      />
      <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}> Confirm Password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={Colors.grey}
        value={confirm}
        onChangeText={setConfirm}
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
