import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import { router } from "expo-router";
import HeaderUser from "@/src/components/specific/user/HeaderUser";
import MyCoures from "@/src/components/specific/course/smallPart/MyCoures";
import CircleStyle from "@/src/components/common/CircleStyle";
import NewCoures from "./../../../components/specific/course/smallPart/NewCourse";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <HeaderUser />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 400,
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 0,
        }}
      >
        <Text style={{ ...text.h4, fontWeight: "500" }}>My Courses</Text>
        <TouchableOpacity
          onPress={() =>
            router.replace("/(courses)/course-list?tab=inprogress")
          }
        >
          <Text style={{ ...text.p, color: Colors.teal_dark }}>See All</Text>
        </TouchableOpacity>
      </View>
      <MyCoures />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 400,
          paddingTop: 24,
          padding: 24,
          paddingBottom: 0,
        }}
      >
        <Text style={{ ...text.h4, fontWeight: "500" }}>New Courses</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(courses)/course-list?tab=all")}
        >
          <Text style={{ ...text.p, color: Colors.teal_dark }}>See All</Text>
        </TouchableOpacity>
      </View>
      <NewCoures />
    </SafeAreaView>
  );
};

export default Home;
