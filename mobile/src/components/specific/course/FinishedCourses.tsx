import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";

const FinishedCourses = () => {
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setErrorMessage("No token found. Please log in.");
          console.error("Token not found");
          return;
        }

        const response = await API_MAIN.get("/courses");
        console.log(response.data);
        if (response.data.code === 200) {
          setCourseData(response.data.result);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setErrorMessage("Failed to fetch course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  const renderCourseItem = ({ item }: { item: CourseData }) => (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.grey,
        shadowOpacity: 1,
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: item.image.imageUrl }}
        style={{
          width: 380,
          height: 200,
          borderRadius: 20,
          marginBottom: 10,
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
            alignSelf: "center",
            paddingBottom: 5,
          }}
        >
          <Text
            style={{
              ...text.p,
              color: Colors.black,
            }}
          >
            {item.courseName}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={{ ...text.small, color: Colors.grey, marginRight: 10 }}>
            1h 50m
          </Text>
          <Text style={{ ...text.small, color: Colors.grey }}>12 lessons</Text>
          <Text
            style={{
              ...text.small,
              color: Colors.teal_dark,
              marginLeft: 180,
            }}
          >
            10/12
          </Text>
        </View>
        <View
          style={{
            height: 8,
            backgroundColor: Colors.white,
            width: 350,
            borderRadius: 20,
            marginTop: 5,
            alignSelf: "center",
          }}
        />
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text
            style={{
              ...text.large,
              fontWeight: "500",
              color: Colors.teal_dark,
            }}
          >
            {item.uploadedByTeacher.firstname} {item.uploadedByTeacher.lastname}
          </Text>
          <Text
            style={{
              ...text.large,
              fontWeight: "500",
              color: Colors.red,
              marginLeft: 210,
            }}
          >
            ${item.coursePrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
      }}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={courseData}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.courseId}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      )}
    </View>
  );
};

export default FinishedCourses;
