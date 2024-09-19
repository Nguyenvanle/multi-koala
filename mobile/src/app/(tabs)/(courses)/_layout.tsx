import React from "react";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/src/constants/Colors";

const CourseLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="course-list" options={{ headerShown: false }} />
      <Stack.Screen
        name="courseDetails"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CourseLayout;
