import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import API_MAIN from "@/src/feature/api/config";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useCourses } from "@/src/hook/course/useCourse";
import CourseItem from "./CourseItem";

const MyCoures = () => {
  const { courseData, loading, error } = useCourses();

  if (loading) {
    return <Text style={styles.statusText}>Đang tải...</Text>;
  }

  if (error) {
    return (
      <Text style={styles.statusText}>Đã xảy ra lỗi khi tải khóa học.</Text>
    );
  }

  // Lấy 2 khóa học đầu tiên
  const displayedCourses = courseData.slice(0, 2);

  return (
    <View style={styles.container}>
      {displayedCourses.map((course) => (
        <CourseItem key={course.courseId} course={course} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statusText: {
    textAlign: "center",
    padding: 16,
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  courseContainer: {
    justifyContent: "center",
    alignItems: "baseline",
    padding: 8,
  },
  courseImage: {
    width: 170,
    height: 140,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  courseTitle: {
    ...text.h4,
    color: Colors.black,
    fontWeight: "400",
    paddingTop: 8,
  },
  coursePrice: {
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "200",
    paddingTop: 8,
  },
});

export default MyCoures;
