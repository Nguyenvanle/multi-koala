import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          height: 90,
          paddingBottom: 0,
        },
        headerTitleStyle: {
          fontFamily: "Poly-Regular",
          fontWeight: "600",
          fontSize: 35,
        },
        tabBarItemStyle: {
          gap: -10,
          paddingVertical: 10,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={35}
              color={focused ? Colors.teal_dark : Colors.black} // Thay đổi màu sắc ở đây
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(courses)"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="school-outline"
              size={35}
              color={focused ? Colors.teal_dark : Colors.black} // Thay đổi màu sắc ở đây
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={35}
              color={focused ? Colors.teal_dark : Colors.black} // Thay đổi màu sắc ở đây
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
