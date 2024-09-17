import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Styles, text } from "@/src/constants/Styles";
import HeaderUser from "@/src/components/specific/user/HeaderUser";
import { Colors } from "@/src/constants/Colors";
import AllCourses from "@/src/components/specific/course/AllCourses";
import InProgressCourses from "@/src/components/specific/course/InProgressCourses";
import FinishedCourses from "@/src/components/specific/course/FinishedCourses";

const CourseList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { tab } = useLocalSearchParams();

  const data = [
    { id: 1, label: "See All", component: <AllCourses />, param: "all" },
    {
      id: 2,
      label: "In Progress",
      component: <InProgressCourses />,
      param: "inprogress",
    },
    {
      id: 3,
      label: "Finished",
      component: <FinishedCourses />,
      param: "finished",
    },
  ];

  useEffect(() => {
    if (tab) {
      const index = data.findIndex((item) => item.param === tab);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [tab]);

  const handlePress = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={{ ...Styles.container, top: -62 }}>
      <StatusBar barStyle="dark-content" />
      <HeaderUser />
      <View style={styles.tabContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePress(index)}
            style={[
              selectedIndex === index
                ? styles.selectedBackground
                : styles.defaultBackground,
            ]}
          >
            <Text
              style={[
                text.p,
                selectedIndex === index
                  ? styles.selectedText
                  : styles.defaultText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>
        {data[selectedIndex].component}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
    height: 60,
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 50,
    shadowOpacity: 0.05,
    marginTop: 32,
  },
  contentContainer: {
    height: 450,
  },
  defaultText: {
    color: Colors.dark_grey,
  },
  selectedText: {
    color: Colors.white,
  },
  selectedBackground: {
    backgroundColor: Colors.teal_dark,
    padding: 12,
    borderRadius: 50,
  },
  defaultBackground: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 50,
  },
});

export default CourseList;
