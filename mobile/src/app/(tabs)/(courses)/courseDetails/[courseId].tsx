import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Styles } from "@/src/constants/Styles";

const CourseDetails = () => {
  const { courseId } = useLocalSearchParams();

  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => router.push(`./lessons/abc`)}>
        <Text>Course Details: {courseId}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CourseDetails;
