import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useCourses } from "@/src/hook/course/useCourse";
import CourseItem from "./CourseItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { router } from "expo-router";

const MyCourses = () => {
  const { courseData, loading, error } = useCourses();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <Text style={styles.statusText}>Loading...</Text>;
  }

  if (error) {
    return (
      <Text style={styles.statusText}>Đã xảy ra lỗi khi tải khóa học.</Text>
    );
  }

  const displayedCourses = courseData.slice(0, 2);
  const handleCoursePress = (courseId: string) => {
    router.push(`/(courses)/courseDetails/${courseId}`);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {displayedCourses.map((course) => (
            <CourseItem key={course.courseId} course={course} />
          ))}
        </>
      ) : (
        <>
          <TouchableOpacity
            key={course.courseId}
            style={styles.courseContainer}
            onPress={() => handleCoursePress(course.courseId)}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1726558257~exp=1726561857~hmac=9df7c62e1d7e832b866ef00351c4d081d1d494b56fa745a35f996aca2ade320b&w=826",
              }}
              style={styles.image}
            />
            <View style={styles.containerText}>
              <Text style={styles.clampedText} numberOfLines={1}>
                English for Healthcare Professionals - Part 1
              </Text>
              <Text style={styles.price}>$149.92</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.courseContainer}
            onPress={() => handleCoursePress(course.id)}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/cute-koala-hug-coffee-cup-cartoon-vector-icon-illustration-animal-drink-icon-isolated-flat-vector_138676-12212.jpg?t=st=1726558430~exp=1726562030~hmac=551db047a599f53316ecaa95abd97dba79247162b1be6213e51a56eeb7b73c02&w=826",
              }}
              style={styles.image}
            />
            <View style={styles.containerText}>
              <Text style={styles.clampedText} numberOfLines={1}>
                English for Travel
              </Text>
              <Text style={styles.price}>$137.4</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
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

export default MyCourses;
