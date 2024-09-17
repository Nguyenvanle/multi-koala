import React from "react";
import { Stack } from "expo-router";

const CourseDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="course/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="lessons" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CourseDetailsLayout;
