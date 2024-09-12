import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Styles } from "@/src/constants/Styles";
import UserAccount from "@/src/components/common/UserAccount";

const Account = () => {
  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <UserAccount />
    </SafeAreaView>
  );
};

export default Account;
