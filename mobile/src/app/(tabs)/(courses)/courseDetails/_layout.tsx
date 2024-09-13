import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CourseDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[courseId]" options={{ headerShown: false }} />
      <Stack.Screen name="lessons" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CourseDetailsLayout;
