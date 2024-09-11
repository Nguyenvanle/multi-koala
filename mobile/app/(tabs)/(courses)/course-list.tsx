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
import { Colors } from "@/constants/Colors";

const CourseList = () => {
  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <HeaderUser />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 410,
          top: -40,
          paddingLeft: 20,
          paddingRight: 10,
        }}
      >
        <Text>See All</Text>
        <Text>In Progress</Text>
        <Text>Finished</Text>
      </View>
    </SafeAreaView>
  );
};

export default CourseList;
