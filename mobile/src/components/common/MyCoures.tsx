import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";

const MyCoures = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatusAndFetchCourses = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          const response = await API_MAIN.get("/courses/my-enrolled-courses");
          if (response.data.code === 200) {
            const lastTwoCourses = response.data.result.slice(-2);
            setEnrolledCourses(lastTwoCourses);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(
          "Error while checking login or retrieving course data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatusAndFetchCourses();
  }, []);

  const renderCourseItem = (imageSource, title, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.courseContainer,
        index === 0 && styles.firstCourseContainer,
      ]}
    >
      <Image source={imageSource} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const renderCourses = () => {
    if (isLoggedIn && enrolledCourses.length > 0) {
      return enrolledCourses.map((course, index) =>
        renderCourseItem(
          { uri: course.image.imageUrl },
          course.courseName,
          index
        )
      );
    } else {
      // Khóa học mặc định
      return [
        renderCourseItem(
          require("@/src/assets/images/Toeic.png"),
          "Toeic 650+",
          0
        ),
        renderCourseItem(
          require("@/src/assets/images/Toeic.png"),
          "Toeic 650+",
          1
        ),
      ];
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.teal_dark} />;
  }

  return <View style={styles.container}>{renderCourses()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginBottom: 20,
  },
  courseContainer: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.grey,
    shadowOpacity: 1,
    marginRight: 14,
  },
  firstCourseContainer: {
    marginRight: 14,
  },
  courseImage: {
    width: 190,
    height: 150,
    borderRadius: 20,
    marginVertical: 5,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  courseTitle: {
    ...text.p,
    color: Colors.black,
  },
});

export default MyCoures;
