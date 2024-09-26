// components/specific/course/smallPart/CourseItem.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";

interface CourseItemProps {
  course: CourseData;
}

const CourseItemNew: React.FC<CourseItemProps> = ({ course }) => {
  const handlePress = () => {
    router.push("/(course-details)/course-details");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.courseContainer} onPress={handlePress}>
        <Image
          source={{ uri: course.image.imageUrl }}
          style={styles.courseImage}
        />
        <View style={styles.containerText}>
          <Text style={styles.clampedText} numberOfLines={1}>
            {course.courseName}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 130,
              paddingVertical: 8,
            }}
          >
            <Text style={styles.duration}>1h 23m</Text>
            <Text style={styles.duration}>12 lessons</Text>
          </View>
          <View style={{ paddingTop: 8 }}>
            <Text style={styles.priceText}>${course.coursePrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    marginVertical: 16,
  },
  courseImage: {
    width: 110,
    height: 100,
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
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  duration: {
    ...text.small,
    color: Colors.dark_grey,
  },
  priceText: {
    ...text.p,
    color: Colors.teal_dark, // Có thể thay đổi màu sắc theo ý thích
    fontWeight: "300",
  },
});

export default CourseItemNew;
