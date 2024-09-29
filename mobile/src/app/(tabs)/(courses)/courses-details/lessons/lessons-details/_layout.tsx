import React from "react";
import { Stack } from "expo-router";

const LessonsDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[lessonId]"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
};

export default LessonsDetailsLayout;
