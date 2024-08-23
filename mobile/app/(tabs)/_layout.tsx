import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" options={{ headerShown: false }} />
      <Tabs.Screen name="(courses)" options={{ headerShown: false }} />
      <Tabs.Screen name="(account)" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
