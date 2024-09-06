import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CircleStyle from "@/components/common/CircleStyle";
import { button, Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HeaderUser from "@/components/common/HeaderUser";
import MyCoures from "@/components/common/MyCoures";
import NewCoures from "@/components/common/NewCoures";

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
        <TouchableOpacity onPress={() => router.replace("/(account)/account")}>
          <Text style={{ ...text.link, color: Colors.teal_dark }}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ top: -40, height: 200, marginHorizontal: 10 }}
      >
        <MyCoures />
      </ScrollView>
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
          onPress={() => router.replace("/(courses)/course-list")}
        >
          <Text style={{ ...text.link, color: Colors.teal_dark }}>See All</Text>
        </TouchableOpacity>
      </View>
      <NewCoures />
    </SafeAreaView>
  );
};

export default Home;
