import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FormSigUp from "@/feature/auth/components/molecules/form/form-signup";
import Button from "@/components/atoms/button";
import CircleStyle from "@/components/molecules/front-end/CircleStyle";
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import useSignUp from "@/feature/auth/hooks/useSignUp";

const Form: React.FC = () => {
  const {
    loadingSignUp,
    errorMessageSignUp,
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
    onSubmit,
  } = useSignUp();

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
            paddingHorizontal: 20,
          }}
        >
          Sign Up
        </Text>
        <FormSigUp
          username={username}
          password={password}
          firstname={firstname}
          lastname={lastname}
          email={email}
          confirm={confirm}
          setUserName={setUserName}
          setPassWord={setPassWord}
          setFirstname={setFirstname}
          setLastname={setLastname}
          setEmail={setEmail}
          setConfirm={setConfirm}
        />
        <Button
          style={{ ...styles.loginButton }}
          title={loadingSignUp ? "Signing Up..." : "Sign Up"}
          textStyle={{ ...text.h4, color: Colors.white }}
          onPress={onSubmit}
        />
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
