import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { useRouter } from "expo-router";

const Form: React.FC = () => {
  const router = useRouter(); // Khai báo router
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignUp = () => {
    // Xử lý đăng nhập
    if (username && password) {
      Alert.alert("Notification!", "Sign up successfully.");
      router.replace("/(home)/home");
    } else {
      Alert.alert("Error!", "Invalid information, please check again.");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Text
        style={{
          ...text.h1,
          fontWeight: "bold",
          color: Colors.teal_dark,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        Sign Up
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
      <View style={{ alignSelf: "baseline", paddingLeft: 35, paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={Colors.grey}
        value={username}
        onChangeText={setUsername}
      />
      <View style={{ alignSelf: "baseline", paddingLeft: 35, paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>First Name</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor={Colors.grey}
        value={fname}
        onChangeText={setFname}
      />
      <View style={{ alignSelf: "baseline", paddingLeft: 35, paddingTop: 10 }}>
        <Text style={{ ...text.p, fontWeight: "500" }}>Last Name</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor={Colors.grey}
        value={lname}
        onChangeText={setLname}
      />
      <View style={{ alignSelf: "baseline", paddingLeft: 35, paddingTop: 10 }}>
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
      <View style={{ alignSelf: "baseline", paddingLeft: 35, paddingTop: 10 }}>
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

      <TouchableOpacity
        style={{ ...styles.loginButton }}
        onPress={handleSignUp}
      >
        <Text style={{ ...text.h4, color: Colors.white }}>Sign Up</Text>
      </TouchableOpacity>
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

export default Form;
