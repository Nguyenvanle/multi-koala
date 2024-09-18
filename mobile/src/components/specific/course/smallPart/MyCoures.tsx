import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { router } from "expo-router";
import API_MAIN from "@/src/feature/api/config";

const MyCourses = () => {
  const [courseData, setCourseData] = useState<EnrolledCourseData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await API_MAIN.get(
            "/enroll-courses/my-enrolled-courses",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const user = await API_MAIN.get("/students/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.code === 200) {
            setCourseData(response.data.result);
            setUserData(user.data.result);
          } else {
            setErrorMessage(response.data.message);
          }
        }
      } catch (error) {
        setErrorMessage("Please sign in to connect course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);
  if (loading) {
    return (
      <Text style={{ ...text.p, color: Colors.teal_dark, paddingVertical: 10 }}>
        Loading...
      </Text>
    );
  }
  const limitedCourses = courseData.slice(0, 5);
  const getToken = AsyncStorage.getItem("token");
  const renderCourseItem = ({ item }: { item: EnrolledCourseData }) => (
    <TouchableOpacity style={styles.courseContainer}>
      <Image
        source={{ uri: item.course.image.imageUrl }}
        style={styles.image}
      />
      <View style={styles.containerText}>
        <Text style={styles.clampedText} numberOfLines={1}>
          {item.course.courseName}
        </Text>
        <Text style={styles.price}>${item.course.coursePrice.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {userData ? (
        <FlatList
          horizontal={true}
          data={limitedCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item, index) => `${item.course.courseId}_${index}`}
          style={{ paddingHorizontal: 16 }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/sign-in")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 300,
          }}
        >
          <Text style={{ ...styles.clampedText, color: Colors.red }}>
            Please sign in to connect your courses
          </Text>
        </TouchableOpacity>
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
    width: 300,
    height: 221,
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
