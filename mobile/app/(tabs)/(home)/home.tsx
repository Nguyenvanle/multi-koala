import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import HeaderUser from "@/components/molecules/user/HeaderUser";
import useUser from "@/feature/user/hooks/useUser";
import { useEnrolled } from "@/feature/course/hooks/useEnrrolled";
import MyCourses from "@/feature/course/components/home/my-courses/MyCoures";
import NewCourses from "@/feature/course/components/home/new-courses/NewCourse";
import { UserContext } from "@/context/user/userContext";

const Home = ({ courseId }: { courseId: string }) => {
  const { user } = useContext(UserContext); // Sử dụng UserContext

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
            <Text style={{ ...text.h4, fontWeight: "500" }}>
              Recommend Courses
            </Text>
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
