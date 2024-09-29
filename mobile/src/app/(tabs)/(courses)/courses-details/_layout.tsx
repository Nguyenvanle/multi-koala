import React from "react";
import { router, Stack } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CourseDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(lesson)"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default CourseDetailsLayout;
