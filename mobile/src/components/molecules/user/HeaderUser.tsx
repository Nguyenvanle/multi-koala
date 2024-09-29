import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "../front-end/CircleStyle";
import { button, text } from "@/src/constants/Styles";
import { Link, router } from "expo-router";
import * as Progress from "react-native-progress";
import Feather from "@expo/vector-icons/Feather";
import Button from "../../atoms/button";
import API_CONFIG from "@/src/types/api/config";
import useUser from "@/src/feature/user/hooks/useUser";
import { useEnrolled } from "@/src/feature/course/hooks/useEnrrolled";
import { EnrolledBody } from "@/src/feature/course/types/course-enrolled";

const HeaderUser: React.FC = () => {
  const { user } = useUser();
  const { enrolled, errorMessage, loading } = useEnrolled();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  // Lấy khóa học đầu tiên từ mảng enrolled
  const latestCourse = enrolled?.[0];

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

          {latestCourse ? (
            <Link href={`/(courses)/courses-details`} asChild>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: Colors.teal_dark,
                  justifyContent: "space-between",
                  padding: 16,
                  alignItems: "center",
                  marginTop: 16,
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
                          marginRight: 90,
                        }}
                      >
                        <Text
                          style={{ ...text.p, color: Colors.background }}
                          numberOfLines={1}
                        >
                          {latestCourse.course.courseName}
                        </Text>
                      </View>
                      <Text
                        style={{
                          ...text.small,
                          color: Colors.background,
                          paddingTop: 2,
                        }}
                      >
                        {latestCourse.process}%
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        borderRadius: 20,
                        width: 260,
                      }}
                    >
                      <Progress.Bar
                        progress={latestCourse.process * 0.01}
                        color={Colors.teal_light}
                        width={260}
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
            </Link>
          ) : (
            <Text style={{ ...text.h4, color: Colors.black, marginTop: 16 }}>
              No courses enrolled.
            </Text>
          )}
        </View>
      ) : (
        <View style={{ width: 364 }}>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
              top: -160,
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
                  marginLeft: 8,
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
