import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";
import * as Progress from "react-native-progress";

const InProgressCourses = () => {
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);

        if (!token) {
          return;
        }
        // Add the token to the request headers
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await API_MAIN.get(
          "/courses/my-enrolled-courses",
          config
        );
        console.log(response.data);
        if (response.data.code === 200) {
          setCourseData(response.data.result);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage("Please sign in to fetch course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);
  const uniqueValidCourseData = Array.from(
    new Set(courseData.map((course) => course.courseId))
  )
    .map((id) => courseData.find((course) => course.courseId === id))
    .filter((course) => course && typeof course.courseId === "string");

  const renderCourseItem = ({ item }: { item: CourseData }) => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        marginTop: 28,
      }}
    >
      <Image
        source={{ uri: item.image.imageUrl }}
        style={{
          width: 350,
          height: 200,
          borderRadius: 15,
          borderColor: Colors.grey,
          borderWidth: 1,
        }}
      />
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "baseline",
            width: 345,
            padding: 8,
            paddingBottom: 0,
          }}
        >
          <Text
            style={{
              ...text.h4,
              color: Colors.black,
              fontWeight: "300",
            }}
          >
            {item.courseName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 8,
          }}
        >
          <Text
            style={{
              ...text.small,
              color: Colors.teal_dark,
            }}
          >
            10/12
          </Text>
        </View>
        <Progress.Bar
          progress={0.8}
          width={330}
          color={Colors.teal_dark}
          style={{ marginLeft: 8 }}
        />
        <View style={{ marginVertical: 5, padding: 8, paddingTop: 0 }}>
          <Text
            style={{
              ...text.large,
              fontWeight: "300",
              color: Colors.dark,
            }}
          >
            {item.uploadedByTeacher.firstname} {item.uploadedByTeacher.lastname}
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: Colors.teal_dark,
              alignItems: "center",
              height: 50,
              width: 330,
              marginTop: 8,
              marginBottom: 8,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...text.h4,
                fontWeight: "500",
                color: Colors.white,
              }}
            >
              ${item.coursePrice}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
      }}
    >
      {loading ? (
        <Text style={{ ...text.p, color: Colors.teal_dark }}>Loading...</Text>
      ) : errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={uniqueValidCourseData}
          renderItem={renderCourseItem}
          keyExtractor={(item, index) => `${item.courseId}_${index}`}
          style={{ marginBottom: -25 }}
        />
      )}
    </View>
  );
};

export default InProgressCourses;
