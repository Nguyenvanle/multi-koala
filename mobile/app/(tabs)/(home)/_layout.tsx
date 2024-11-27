import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerShown: false, headerTransparent: true }}
      />
      <Stack.Screen
        name="recommend"
        options={{ headerShown: false, headerTransparent: true }}
      />
    </Stack>
  );
};

export default HomeLayout;
