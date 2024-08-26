import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Styles } from "@/constants/Styles";

const Account = () => {
  return (
    <View style={Styles.container}>
      <Link href={"/(auth)/auth-screen"} replace>
        Log Out
      </Link>
    </View>
  );
};

export default Account;
