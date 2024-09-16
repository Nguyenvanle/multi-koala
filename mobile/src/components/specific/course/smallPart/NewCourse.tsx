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

const NewCoures = () => {
  const [newCourses, setNewCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatusAndFetchCourses = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          const response = await API_MAIN.get("/courses");
          if (response.data.code === 200) {
            const lastTwoCourses = response.data.result.slice(0, 2);
            setNewCourses(lastTwoCourses);
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
    <TouchableOpacity key={index} style={[styles.courseContainer]}>
      <Image source={imageSource} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const renderCourses = () => {
    if (isLoggedIn && newCourses.length > 0) {
      return newCourses.map((course, index) =>
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
  courseContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: 400,
    height: 110,
    backgroundColor: Colors.white,
    flexDirection: "row",
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor: Colors.grey,
    marginBottom: 10,
    shadowOpacity: 1,
  },
  courseImage: {
    width: 120,
    height: 100,
    borderRadius: 20,
    marginVertical: 5,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  courseTitle: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: "500",
    marginLeft: 80,
    width: 250,
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    top: -30,
  },
});

export default NewCoures;
