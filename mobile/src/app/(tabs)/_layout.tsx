import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { text } from "@/src/constants/Styles";
import API_CONFIG from "@/src/types/api/config";
import { UserBody } from "@/src/feature/user/types/user";

const TabsLayout = () => {
  const [userData, setUserData] = useState<UserBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const user = await API_CONFIG.get("/students/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (user.data.code === 200) {
            setUserData(user.data.result);
          } else {
            setErrorMessage(user.data.message);
          }
        }
      } catch (error) {
        setErrorMessage("Please sign in to connect course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);
  if (loading) {
    return (
      <Text style={{ ...text.p, color: Colors.teal_dark, paddingVertical: 10 }}>
        Loading...
      </Text>
    );
  }
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
      {userData ? (
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
      ) : (
        <Tabs.Screen
          name="(account)"
          options={{
            href: null,
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
      )}
    </Tabs>
  );
};

export default TabsLayout;
