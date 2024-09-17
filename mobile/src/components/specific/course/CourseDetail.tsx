// components/CourseDetails.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CourseDetails: React.FC<{ course: CourseData }> = ({ course }) => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: course.image.imageUrl }}
        style={styles.courseImage}
      />

      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>{course.courseName}</Text>
        <Text style={styles.instructorName}>
          {course.uploadedByTeacher.firstname}{" "}
          {course.uploadedByTeacher.lastname}
        </Text>
        <Text style={styles.courseLevel}>{course.courseLevel}</Text>
        <Text style={styles.courseRating}>
          Đánh giá: {course.courseRating}/5
        </Text>
        <Text style={styles.courseDescription}>{course.courseDescription}</Text>
      </View>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>
          Mua ngay | ${course.coursePrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  courseImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  courseInfo: {
    marginBottom: 16,
  },
  courseName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  instructorName: {
    fontSize: 16,
    marginBottom: 4,
  },
  courseLevel: {
    fontSize: 14,
    marginBottom: 4,
  },
  courseRating: {
    fontSize: 14,
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
  },
  buyButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CourseDetails;
