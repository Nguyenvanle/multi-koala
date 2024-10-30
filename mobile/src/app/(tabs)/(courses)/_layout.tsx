import { Stack } from "expo-router";
import React from "react";

const CourseLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="course-list" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CourseLayout;
