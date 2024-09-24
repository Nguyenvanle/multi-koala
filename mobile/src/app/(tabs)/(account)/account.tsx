import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Styles } from "@/src/constants/Styles";
import UserAccount from "@/src/feature/user/components/UserAccount";

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
