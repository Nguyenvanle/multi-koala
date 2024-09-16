import React from "react";
import { Stack } from "expo-router";

const CourseLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="course-list" options={{ headerShown: false }} />
      <Stack.Screen name="courseDetails" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CourseLayout;
