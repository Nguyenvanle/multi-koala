import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useCourseDetails } from "@/src/feature/api/course-details";
import { useCourseDetailsProgress } from "@/src/feature/coursedetailsprogress";

// Giả định rằng bạn có một hook hoặc function để fetch dữ liệu khóa học

const CourseDetails = () => {
  const { courseId } = useGlobalSearchParams();
  const { courseDetails, loading, error } = useCourseDetails(
    courseId as string
  );
  // const {
  //   courseDetailsProgress: courseDetails,
  //   loading,
  //   error,
  // } = useCourseDetailsProgress(courseId as string);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!courseDetails) {
    return <Text>No course</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      {/* <Image
        source={{ uri: courseDetails.course.image.imageUrl }}
        style={styles.image}
      /> */}
      <View style={styles.content}>
        <Text style={styles.instructor}>
          Instructor | {courseDetails.uploadedByTeacher?.firstname}{" "}
          {courseDetails.uploadedByTeacher?.lastname}
        </Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <AntDesign
              key={star}
              name={star <= courseDetails.courseRating ? "star" : "staro"}
              size={16}
              color={Colors.red}
            />
          ))}
          <Text style={styles.ratingText}>
            {courseDetails.courseRating.toFixed(1)}
          </Text>
        </View>
        <Text style={styles.title}>{courseDetails.courseName}</Text>
        <Text style={styles.duration}>Lessons</Text>
        <Text style={styles.price}>
          ${courseDetails.coursePrice.toFixed(2)}
        </Text>
        <Text style={styles.sectionTitle}>About This Course</Text>
        <Text style={styles.description}>
          {courseDetails.courseDescription}
        </Text>
        <Text style={styles.readMore}>Read More...</Text>
        <Text style={styles.sectionTitle}>Course Content</Text>
        {/* {courseDetails..map((lesson, index) => (
          <View key={index} style={styles.lessonItem}>
            <Image
              source={{ uri: lesson.thumbnailUrl }}
              style={styles.lessonThumbnail}
            />
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDuration}>{lesson.duration}</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="playcircleo" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        ))} */}
      </View>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>
          Buy Now | ${courseDetails.coursePrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 15,
  },
  instructor: {
    ...text.small,
    color: Colors.red,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    ...text.small,
    marginLeft: 5,
    color: Colors.red,
  },
  title: {
    ...text.h2,
    color: Colors.black,
    marginVertical: 5,
  },
  duration: {
    ...text.small,
    color: Colors.red,
  },
  price: {
    ...text.h3,
    color: Colors.red,
    marginVertical: 10,
  },
  sectionTitle: {
    ...text.h4,
    color: Colors.black,
    marginTop: 15,
    marginBottom: 10,
  },
  description: {
    ...text.p,
    color: Colors.red,
  },
  readMore: {
    ...text.small,
    color: Colors.red,
    marginTop: 5,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  lessonThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 10,
  },
  lessonTitle: {
    ...text.p,
    color: Colors.black,
  },
  lessonDuration: {
    ...text.small,
    color: Colors.red,
  },
  buyButton: {
    backgroundColor: Colors.red,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  buyButtonText: {
    ...text.h4,
    color: Colors.white,
  },
});

export default CourseDetails;
