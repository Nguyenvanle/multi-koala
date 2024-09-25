import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import { Link } from "expo-router";
import API_CONFIG from "@/src/types/api/config";

const FinishedCourses = () => {
  const [courseData, setCourseData] = useState<EnrolledCourseData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await API_CONFIG.get(
            "/enroll-courses/my-enrolled-courses",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (
            response.data.code === 200 &&
            response.data.result.process == 1.0
          ) {
            setCourseData(response.data.result);
            // console.log(courseData);
            // console.log(response.data.result[0].course.image);
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

  const renderCourseItem = ({ item }: { item: EnrolledCourseData }) => (
    <Link href={`/${item.course.courseId}`} asChild>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 350,
          marginTop: 28,
        }}
      >
        <Image
          source={{ uri: item.course.image?.imageUrl }}
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
              {item.course.courseName}
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
            width={346}
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
              {item.course.uploadedByTeacher?.firstname}{" "}
              {item.course.uploadedByTeacher?.lastname}
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
                ${item.course.coursePrice}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Link>
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
        <Text style={{ color: "red" }}></Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={courseData}
          renderItem={renderCourseItem}
          keyExtractor={(item, index) => `${item.course.courseId}_${index}`}
        />
      )}
    </View>
  );
};

export default FinishedCourses;
