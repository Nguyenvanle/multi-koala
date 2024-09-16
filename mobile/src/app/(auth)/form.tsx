import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Styles, text } from "@/src/constants/Styles";
import CircleStyle from "@/src/components/common/CircleStyle";
import { Redirect } from "expo-router";

const Form: React.FC = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Z][A-Za-z0-9]*[0-9]+$/;
    return usernameRegex.test(username);
  };

  const validateFirstname = (firstname: string) => {
    const firstnameRegex =
      /^[A-ZÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ][a-zA-ZÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ\s]*$/;
    return firstnameRegex.test(firstname);
  };

  const validateLastname = (lastname: string) => {
    const lastnameRegex =
      /^[A-ZÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ][a-zA-ZÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ\s]*$/;
    return lastnameRegex.test(lastname);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    const newErrors = {
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
    };

    if (!validateUsername(username)) {
      newErrors.username =
        "Tên người dùng không hợp lệ. Vui lòng kiểm tra lại.";
    }
    if (!validateFirstname(firstname)) {
      newErrors.firstname = "Tên không hợp lệ. Vui lòng kiểm tra lại.";
    }
    if (!validateLastname(lastname)) {
      newErrors.lastname = "Họ không hợp lệ. Vui lòng kiểm tra lại.";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một số.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp.";
    }

    setErrors(newErrors);

    // Kiểm tra xem có lỗi nào không
    if (!Object.values(newErrors).some((error) => error)) {
      // Nếu không có lỗi, hiển thị thông báo thành công
      Alert.alert("Notification", "Sign Up Successfully.");
      return <Redirect href={"/(home)/home"} />;

      // Thực hiện hành động tiếp theo (ví dụ: gửi thông tin đăng ký)
    } else {
      // Nếu có lỗi, hiển thị thông báo thất bại

      Alert.alert("Notification", "Sign Up Failed.");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <KeyboardAvoidingView
        style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Điều chỉnh khoảng cách nếu cần
      >
        <Text
          style={{
            ...text.h1,
            fontWeight: "bold",
            color: Colors.teal_dark,
            paddingTop: 20,
            height: 120,
            paddingHorizontal: 20,
          }}
        >
          Sign Up
        </Text>

        <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
          <Text style={{ ...text.p, fontWeight: "500" }}>Email</Text>
        </View>
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
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={{ alignSelf: "baseline", paddingTop: 10 }}>
          <Text style={{ ...text.p, fontWeight: "500" }}>
            {" "}
            Confirm Password
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.grey}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={{ ...styles.loginButton }}
          onPress={handleSubmit}
        >
          <Text style={{ ...text.h4, color: Colors.white }}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
