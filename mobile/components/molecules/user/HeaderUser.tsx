import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import CircleStyle from "../front-end/CircleStyle";
import { button, text } from "@/constants/Styles";
import { Link, router } from "expo-router";
import * as Progress from "react-native-progress";
import Feather from "@expo/vector-icons/Feather";
import Button from "../../atoms/button";
import useUser from "@/feature/user/hooks/useUser";
import { useEnrolled } from "@/feature/course/hooks/useEnrrolled";
import { EnrolledBody } from "@/feature/course/types/course-enrolled";
import { UserContext } from "@/context/user/userContext";

interface HeaderUserProps {
  courseId: string;
}

const HeaderUser: React.FC<HeaderUserProps> = ({ courseId }) => {
  const { user } = useContext(UserContext); // Sử dụng UserContext
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { loadingUser: userLoading, isRefreshing, refreshUser } = useUser();
  const {
    enrolled,
    errorMessage,
    loading: enrolledLoading,
  } = useEnrolled(courseIdString);
  const [nextCourse, setNextCourse] = useState<EnrolledBody | null>(null);

  useEffect(() => {
    refreshUser(); // Gọi lại hàm refreshUser để cập nhật thông tin người dùng
    checkCompleted();
  }, [enrolled]); // Nếu enrolled có thay đổi, refreshUser sẽ được gọi

  if (userLoading || isRefreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.teal_dark} />
        <Text style={styles.loadingText}>
          {userLoading ? "Loading..." : "Updating..."}
        </Text>
      </View>
    );
  }

  const checkCompleted = () => {
    if (enrolled) {
      for (let i = 0; i < enrolled?.length; i++) {
        const latestCourse = enrolled[i];
        if (latestCourse.process === 1) {
          // Kiểm tra nếu khóa học hiện tại hoàn thành
          // Kiểm tra nếu có khóa học tiếp theo
          setNextCourse(enrolled[i + 1]); // Cập nhật khóa học tiếp theo
        } else {
          setNextCourse(enrolled[i]); // Không có khóa học tiếp theo
        }
        break;
      }
    }
  };

  if (userLoading || isRefreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.teal_dark} />
        <Text style={styles.loadingText}>
          {userLoading ? "Loading..." : "Updating..."}
        </Text>
      </View>
    );
  }

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
            {user.image ? (
              <Image
                source={{ uri: user.image.imageUrl }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 35,
                  justifyContent: "flex-end",
                }}
              />
            ) : (
              <Image
                source={require("@/assets/images/koala.png")}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 35,
                  justifyContent: "flex-end",
                }}
              />
            )}
          </View>

          {nextCourse && enrolled?.length > 0 && (
            <Link href={`/${nextCourse.course.courseId}`} asChild>
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
                          {nextCourse.course.courseName}
                        </Text>
                      </View>
                      <Text
                        style={{
                          ...text.small,
                          color: Colors.background,
                          paddingTop: 2,
                        }}
                      >
                        {nextCourse.process * 100}%
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        borderRadius: 20,
                        width: 280,
                      }}
                    >
                      <Progress.Bar
                        progress={nextCourse.process}
                        color={Colors.super_teal_dark}
                        width={280}
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
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Button
                title="Log In"
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.teal_dark,
  },
  userInfoContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    width: 364,
  },
  userTextContainer: {
    justifyContent: "center",
    alignItems: "baseline",
    flexDirection: "column",
  },
  userImage: {
    width: 75,
    height: 75,
    borderRadius: 35,
    justifyContent: "flex-end",
  },
  // ... other styles
});
