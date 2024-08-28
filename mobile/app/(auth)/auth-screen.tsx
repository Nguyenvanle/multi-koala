import { SafeAreaView } from "react-native";
import React from "react";
import { Styles } from "@/constants/Styles";
import SignIn from "./sign-in";

const AuthScreen = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <SignIn />
    </SafeAreaView>
  );
};

export default AuthScreen;
