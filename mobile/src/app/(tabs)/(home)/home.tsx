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
import HeaderUser from "@/src/components/common/HeaderUser";
import MyCoures from "@/src/components/common/MyCoures";
import NewCoures from "@/src/components/common/NewCoures";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <HeaderUser />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 410,
          top: -40,
          paddingLeft: 20,
          paddingRight: 10,
        }}
      >
        <Text style={{ ...text.h4, fontWeight: "500" }}>My Courses</Text>
        <TouchableOpacity
          onPress={() =>
            router.replace("/(courses)/course-list?tab=inprogress")
          }
        >
          <Text style={{ ...text.link, color: Colors.teal_dark }}>See All</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ top: -40, height: 200, marginHorizontal: 10, marginLeft: 25 }}
      >
        <MyCoures />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 410,
          paddingLeft: 20,
          paddingRight: 10,
          top: -40,
        }}
      >
        <Text style={{ ...text.h4, fontWeight: "500" }}>New Courses</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(courses)/course-list?tab=all")}
        >
          <Text style={{ ...text.link, color: Colors.teal_dark }}>See All</Text>
        </TouchableOpacity>
      </View>
      <NewCoures />
    </SafeAreaView>
  );
};

export default Home;
