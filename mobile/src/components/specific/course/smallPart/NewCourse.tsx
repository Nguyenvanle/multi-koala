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
import { router } from "expo-router";

const NewCourses = () => {
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

  if (loading || error) {
    return null; // Hoặc hiển thị loading/error state
  }

  // Giả sử khóa học mới là 5 khóa học đầu tiên
  const newCourses = courseData.slice(0, 2);
  const handleCoursePress = (courseId: string) => {
    router.push(`/(courses)/courseDetails/${courseId}`);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {newCourses.map((course) => (
            <CourseItemNew key={course.courseId} course={course} />
          ))}
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.courseContainer}
            onPress={() => handleCoursePress(course.id)}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/cute-baby-koala-holding-branch-wood-balloon-cartoon-vector-icon-illustration-animal-nature-isolated_138676-12522.jpg?t=st=1726559345~exp=1726562945~hmac=82d5ee89d7fec0ddc0aaa90b04c6f43ff172481e6ba0dc3228fb910e63882009&w=826",
              }}
              style={styles.courseImage}
            />
            <View style={styles.containerText}>
              <Text style={styles.clampedText} numberOfLines={1}>
                English for Healthcare Professionals - Part 1
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
                <Text style={styles.priceText}>$149.92</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.courseContainer}
            onPress={() => handleCoursePress(course.id)}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/cute-koala-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-7349.jpg?t=st=1726559704~exp=1726563304~hmac=37fbc0d73550b0d9c783eef8bbd63f7f826b5e686a982c7bfe3376474b967f64&w=826",
              }}
              style={styles.courseImage}
            />
            <View style={styles.containerText}>
              <Text style={styles.clampedText} numberOfLines={1}>
                Creative Writing in English
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
                <Text style={styles.priceText}>$87.2</Text>
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  price: {
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "300",
    paddingTop: 8,
  },
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
    height: 100,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    top: -35,
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
  priceText: {
    ...text.p,
    color: Colors.teal_dark, // Có thể thay đổi màu sắc theo ý thích
    fontWeight: "300",
  },
  duration: {
    ...text.small,
    color: Colors.dark_grey,
  },
  image: {
    width: 170,
    height: 140,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});
export default NewCourses;
