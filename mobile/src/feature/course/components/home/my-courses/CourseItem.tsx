// components/specific/course/smallPart/CourseItem.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";

interface CourseItemProps {
  course: CourseData;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const handlePress = () => {
    router.push("/(course-details)/course-details");
  };

  return (
    <TouchableOpacity style={styles.courseContainer} onPress={handlePress}>
      <Image source={{ uri: course.image.imageUrl }} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.clampedText} numberOfLines={1}>
          {course.courseName}
        </Text>
        <Text style={styles.price}>${course.coursePrice.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    alignItems: "center",
    width: 186,
    height: 221,
    padding: 8,
  },
  image: {
    width: 170,
    height: 140,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructor: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "300",
    paddingTop: 8,
  },
  containerText: {
    overflow: "hidden",
    width: 170,
    padding: 8,
  },
  clampedText: {
    // Styles can be adjusted according to your needs
    ...text.p,
    color: Colors.black,
    fontWeight: "400",
  },
});

export default CourseItem;
