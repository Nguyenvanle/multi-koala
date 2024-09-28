import { Stack } from "expo-router";
import React from "react";

const LessonLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="lesson-list"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="lesson-details" options={{ headerShown: false }} />
    </Stack>
  );
};

export default LessonLayout;
