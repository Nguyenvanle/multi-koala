import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { button, Styles, text } from "@/constants/Styles";
import Button from "@/components/common/Button";
import SignIn from "@/components/common/authen/SignIn";

const AuthScreen = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <View>
        <Button
          title="Sign In"
          onPress={() => SignIn}
          buttonStyle={button.Authen}
          textStyle={text.p}
        />
      </View>
      //tạo button Authen
      <View></View> //tạo layout Authen
    </SafeAreaView>
  );
};

export default AuthScreen;
