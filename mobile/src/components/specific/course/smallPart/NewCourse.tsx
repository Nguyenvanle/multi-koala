import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";
import { text } from "@/src/constants/Styles";
import { useCourses } from "@/src/hook/course/useCourse";
import CourseItemNew from "./CourseItemNew";

const NewCourses = () => {
  const { courseData, loading, error } = useCourses();

  if (loading || error) {
    return null; // Hoặc hiển thị loading/error state
  }

  // Giả sử khóa học mới là 5 khóa học đầu tiên
  const newCourses = courseData.slice(0, 2);

  return (
    <View style={styles.container}>
      {newCourses.map((course) => (
        <CourseItemNew key={course.courseId} course={course} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  courseContainer: {
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
    flexDirection: "row",
    width: 350,
    borderRadius: 15,
    padding: 8,
    marginTop: 12,
  },
  courseImage: {
    width: 110,
    height: 90,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  containerText: {
    overflow: "hidden",
    width: 200,
    paddingHorizontal: 8,
  },
  clampedText: {
    // Styles can be adjusted according to your needs
    ...text.h4,
    color: Colors.black,
    fontWeight: "400",
  },
  priceText: {
    ...text.p,
    color: Colors.teal_dark, // Có thể thay đổi màu sắc theo ý thích
    fontWeight: "300",
  },
  duration: {
    ...text.small,
    color: Colors.dark_grey,
  },
});
export default NewCourses;
