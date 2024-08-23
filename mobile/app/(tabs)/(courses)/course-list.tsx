import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Styles from "@/constants/Styles";
import { Link, router } from "expo-router";

const CourseList = () => {
  return (
    <View style={Styles.container}>
      <Link href={"/courseDetails/123"}>123</Link>
    </View>
  );
};

export default CourseList;
