import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Styles from "@/constants/Styles";
import { router, useLocalSearchParams } from "expo-router";

const Lesson = () => {
  const { lessonId, courseId } = useLocalSearchParams();
  return (
    <View style={Styles.container}>
      <Text>Course: {courseId}</Text>
      <Text>Lesson: {lessonId}</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Lesson;
