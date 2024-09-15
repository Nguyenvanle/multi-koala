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
import HeaderUser from "@/src/components/common/HeaderUser";
import { Colors } from "@/src/constants/Colors";
import AllCourses from "@/src/components/common/AllCourses";
import InProgressCourses from "@/src/components/common/InProgressCourses";
import FinishedCourses from "@/src/components/common/FinishedCourses";

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
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content" />
      <HeaderUser />
      <View style={styles.tabContainer}>
        {data.map((item, index) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(index)}>
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
    width: 380,
    height: 60,
    marginTop: -40,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    borderRadius: 50,
    shadowOpacity: 0.05,
  },
  contentContainer: {
    marginTop: 20,
    height: 450,
  },
  defaultText: {
    color: Colors.black,
  },
  selectedText: {
    color: Colors.teal_light,
  },
});

export default CourseList;
