import { KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import FacebookButton from "../../atoms/facebook-button";
import { button } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import GoogleButton from "../../atoms/google-button";

const OtherSignIn = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70} // Điều chỉnh khoảng cách nếu cần
    >
      {/* Các button đăng nhập */}
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
    </KeyboardAvoidingView>
  );
};

export default OtherSignIn;
