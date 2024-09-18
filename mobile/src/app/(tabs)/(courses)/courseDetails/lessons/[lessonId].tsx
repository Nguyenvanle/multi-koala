import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Styles } from "@/src/constants/Styles";

const Lesson = () => {
  const { lessonId, courseId } = useLocalSearchParams();
  return (
    <View style={Styles.container}>
      <Text>Course: {courseId}</Text>
      <Text>Lesson: {lessonId}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Lesson;
