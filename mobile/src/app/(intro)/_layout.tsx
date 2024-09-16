import React from "react";
import { Stack } from "expo-router";

const IntroLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="logo-screen" options={{ headerShown: false }} />
      <Stack.Screen name="intro-screen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default IntroLayout;
