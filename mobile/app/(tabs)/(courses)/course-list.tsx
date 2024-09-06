import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Styles } from "@/constants/Styles";
import HeaderUser from "@/components/common/HeaderUser";

const CourseList = () => {
  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <HeaderUser />
    </SafeAreaView>
  );
};

export default CourseList;
