import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "../front-end/CircleStyle";
import { button, text } from "@/src/constants/Styles";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import Feather from "@expo/vector-icons/Feather";
import Button from "../../atoms/button";
import API_CONFIG from "@/src/types/api/config";
import { UserBody } from "@/src/feature/user/types/user";

const HeaderUser: React.FC = () => {
  const [user, setUser] = useState<UserBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [courseData, setCourseData] = useState<EnrolledCourseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const course = await API_CONFIG.get(
            "/enroll-courses/my-enrolled-courses",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const user = await API_CONFIG.get("/students/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (user.data.code === 200) {
            setCourseData(course.data.result);
            setUser(user.data.result);
          } else {
            setErrorMessage(user.data.message);
            setErrorMessage(course.data.message);
          }
        }
      } catch (error) {
        setErrorMessage("Please sign in to connect course data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  const displayedCourses = courseData.slice(0, 1);

  const renderCourseItem = ({ item }: { item: EnrolledCourseData }) => (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        backgroundColor: Colors.teal_dark,
        justifyContent: "space-between",
        padding: 16,
        alignItems: "center",
      }}
    >
      <View style={{ alignSelf: "baseline" }}>
        <Text style={{ ...text.h4, color: Colors.white }}>
          Continue Learning
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "baseline",
          paddingVertical: 8,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: 16,
          }}
        >
          <View style={{ flexDirection: "row", paddingVertical: 8 }}>
            <View
              style={{
                overflow: "hidden",
                alignItems: "center",
                width: 150,
                marginRight: 64,
              }}
            >
              <Text
                style={{ ...text.p, color: Colors.background }}
                numberOfLines={1}
              >
                {item.course.courseName}
              </Text>
            </View>
            <Text
              style={{ ...text.small, color: Colors.background, paddingTop: 2 }}
            >
              0/12
            </Text>
          </View>
          <View style={{ backgroundColor: Colors.white, borderRadius: 20 }}>
            <Progress.Bar
              width={280}
              progress={item.course.process}
              color={Colors.teal_light}
            />
          </View>
        </View>
        <Feather
          name="arrow-right-circle"
          size={32}
          color={Colors.background}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 240,
        padding: 16,
      }}
    >
      <CircleStyle />
      {user ? (
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 8,
              width: 364,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "baseline",
                flexDirection: "column",
              }}
            >
              <Text style={text.h4}>Welcome</Text>
              <Text style={{ ...text.h4, color: Colors.teal_dark }}>
                {user.firstname} {user.lastname}
              </Text>
            </View>
            {user.image && (
              <Image
                source={{ uri: user.image.imageUrl }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 35,
                  justifyContent: "flex-end",
                }}
              />
            )}
          </View>
          <FlatList
            data={displayedCourses}
            renderItem={renderCourseItem}
            keyExtractor={(item, index) => `${item.course.courseId}_${index}`}
          />
        </View>
      ) : (
        <View style={{ width: 364 }}>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
              padding: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Button
                title="Sign In"
                onPress={() => router.replace("/(auth)/sign-in")}
                style={{
                  ...button.Authen,
                  backgroundColor: Colors.dark,
                  width: 100,
                  borderRadius: 10,
                  marginTop: 0,
                  borderWidth: 1,
                  borderColor: Colors.grey,
                }}
                textStyle={{ color: Colors.white, fontWeight: "500" }}
              />
              <Button
                title="Sign Up"
                onPress={() => router.replace("/(auth)/sign-up")}
                style={{
                  ...button.Authen,
                  backgroundColor: Colors.white,
                  width: 100,
                  borderRadius: 10,
                  marginHorizontal: 8,
                  marginTop: 0,
                  borderWidth: 1,
                  borderColor: Colors.grey,
                }}
                textStyle={{ color: Colors.black, fontWeight: "500" }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default HeaderUser;
