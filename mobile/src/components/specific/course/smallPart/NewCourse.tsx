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

  const renderCourseItem = (imageSource, title, price, index) => (
    <TouchableOpacity key={index} style={[styles.courseContainer]}>
      <Image source={imageSource} style={styles.courseImage} />
      <View style={styles.containerText}>
        <Text style={styles.clampedText} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.priceText}>${price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCourses = () => {
    if (isLoggedIn && newCourses.length > 0) {
      return newCourses.map((course, index) =>
        renderCourseItem(
          { uri: course.image.imageUrl },
          course.courseName,
          course.coursePrice, // Lấy giá tiền từ dữ liệu
          index
        )
      );
    } else {
      // Khóa học mặc định
      return [
        renderCourseItem(
          require("@/src/assets/images/koala.png"),
          "Toeic 650+",
          "87.2", // Giá tiền mặc định
          0
        ),
        renderCourseItem(
          require("@/src/assets/images/koala.png"),
          "Toeic 650+",
          "87.2", // Giá tiền mặc định
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
});

export default NewCoures;
