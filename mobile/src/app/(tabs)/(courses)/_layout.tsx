import React from "react";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/src/constants/Colors";
import { color } from "react-native-elements/dist/helpers";

const CourseLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="course-list" options={{ headerShown: false }} />
      <Stack.Screen
        name="courseDetails"
        options={{
          headerTitle: "Details",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.teal_dark,
          },
          // headerLeft: () => (
          //   <View style={{ marginBottom: 8 }}>
          //     <TouchableOpacity onPress={() => router.back()}>
          //       <AntDesign name="left" size={24} color={Colors.white} />
          //     </TouchableOpacity>
          //   </View>
          // ),
        }}
      />
    </Stack>
  );
};

export default CourseLayout;
