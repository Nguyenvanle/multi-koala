import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import { router } from "expo-router";
import HeaderUser from "@/src/components/molecules/user/HeaderUser";
import useUser from "@/src/feature/user/hooks/useUser";
import { useEnrolled } from "@/src/feature/course/hooks/useEnrrolled";
import MyCourses from "@/src/feature/course/components/home/my-courses/MyCoures";
import NewCourses from "@/src/feature/course/components/home/new-courses/NewCourse";

const Home = ({ courseId }: { courseId: string }) => {
  const {
    loadingUser,
    isRefreshing,
    user,
    setUser,
    setErrorMessage,
    refreshUser,
  } = useUser();
  const { enrolled, errorMessage, loading } = useEnrolled(courseId);

  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <HeaderUser courseId={courseId} />
      {user ? (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 400,
              paddingHorizontal: 24,
              paddingTop: 16,
            }}
          >
            <Text style={{ ...text.h4, fontWeight: "500" }}>My Courses</Text>
            <TouchableOpacity
              onPress={() =>
                router.push("/(courses)/course-list?tab=inprogress")
              }
            >
              <Text style={{ ...text.p, color: Colors.teal_dark }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <MyCourses courseId={courseId} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 400,
              padding: 24,
              paddingTop: 0,
              paddingBottom: 8,
            }}
          >
            <Text style={{ ...text.h4, fontWeight: "500" }}>New Courses</Text>
            <TouchableOpacity
              onPress={() => router.push("/(courses)/course-list?tab=all")}
            >
              <Text style={{ ...text.p, color: Colors.teal_dark }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <NewCourses />
        </View>
      ) : (
        <View style={Styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 400,
              padding: 24,
              top: -190,
            }}
          >
            <Text style={{ ...text.h4, fontWeight: "500" }}>New Courses</Text>
            <TouchableOpacity
              onPress={() => router.push("/(courses)/course-list?tab=all")}
            >
              <Text style={{ ...text.p, color: Colors.teal_dark }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <NewCourses />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
