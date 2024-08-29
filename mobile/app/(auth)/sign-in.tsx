import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
  Linking,
} from "react-native";
import Button from "@/components/common/Button";
import { Colors } from "@/constants/Colors";
import { Styles, text } from "@/constants/Styles";
import { useRouter } from "expo-router";
import CircleStyle from "@/components/common/CircleStyle";
import openFacebook from "@/service/FacebookAuthen";
import openGmail from "@/service/GoogleAuthen";

const acc = [
  {
    username: "Tule",
    password: "0102",
  },
];
const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Khai báo router

  const handleSignIn = () => {
    // Kiểm tra nếu chưa nhập username hoặc password
    if (!username || !password) {
      Alert.alert("Error!", "Please enter your Username and Password");
      return; // Dừng hàm nếu không có dữ liệu
    }

    // Xử lý đăng nhập
    const user = acc.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (user) {
      // Nếu tìm thấy người dùng
      Alert.alert("Notification", "Sign In Successfully.");
      router.replace("/(home)/home"); // Điều hướng đến trang chính
    } else {
      // Nếu không tìm thấy người dùng
      Alert.alert(
        "Error!",
        "Username or Password not true Please check again."
      );
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <Text
        style={{
          ...text.h1,
          fontWeight: "bold",
          color: Colors.teal_dark,
          paddingTop: 20,
          paddingHorizontal: 20,
          height: 120,
        }}
      >
        Sign In
      </Text>
      <Button
        title="Continue with Facebook"
        onPress={openFacebook}
        buttonStyle={{ backgroundColor: Colors.dark }}
        textStyle={{ color: Colors.white }}
      />
      <Button
        title="Continue with Google"
        onPress={openGmail}
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
      <View
        style={{
          marginHorizontal: 35,
          alignSelf: "flex-start",
          paddingTop: 10,
        }}
      >
        <Text style={{ ...text.p, fontWeight: "500" }}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={Colors.grey}
        value={username}
        onChangeText={setUsername}
      />
      <View
        style={{
          marginHorizontal: 35,
          alignSelf: "flex-start",
          paddingTop: 10,
        }}
      >
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
      <TouchableOpacity
        onPress={() => router.push("/(auth)/forgot")}
        style={{ alignSelf: "baseline", marginHorizontal: 35 }}
      >
        <Text
          style={{ ...text.link, color: Colors.teal_dark, fontWeight: "500" }}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={{ ...text.h4, color: Colors.white }}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={text.p}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => router.replace("./sign-up")}>
          <Text
            style={{
              ...text.link,
              color: Colors.teal_dark,
              fontWeight: "500",
            }}
          >
            {" "}
            Sign Up
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

export default SignIn;
