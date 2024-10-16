import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import AllCourses from "@/src/feature/course/components/courses/all-courses/AllCourses";
import InProgressCourses from "@/src/feature/course/components/courses/progress-courses/InProgressCourses";
import FinishedCourses from "@/src/feature/course/components/courses/finished-courses/FinishedCourses";
import HeaderUser from "@/src/components/molecules/user/HeaderUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUser from "@/src/feature/user/hooks/useUser";
import FavouriteCourses from "@/src/feature/course/components/courses/favourite-courses/FavouriteCourses";

const CourseList = (): React.JSX.Element => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { tab } = useLocalSearchParams();
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải
  const { user, setUser } = useUser();

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
      label: "Favourite",
      component: <FavouriteCourses />,
      param: "favourite",
    },
    {
      id: 4,
      label: "Finished",
      component: <FinishedCourses />,
      param: "finished",
    },
  ];

  useEffect(() => {
    // Hàm để lấy dữ liệu người dùng từ AsyncStorage
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // Nếu có token, giả định người dùng đã đăng nhập
      }
      setLoading(false); // Đặt trạng thái tải về false khi hoàn tất
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (tab) {
      const index = data.findIndex((item) => item.param === tab);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [tab]);

  const handlePress = (index: any) => {
    setSelectedIndex(index);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ ...Styles.container }}>
        <StatusBar barStyle="dark-content" />
        <HeaderUser courseId={courseId || ""} />
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ ...Styles.container }}>
      <StatusBar barStyle="dark-content" />
      {courseId ? (
        <HeaderUser courseId={courseId} />
      ) : (
        <HeaderUser courseId="" />
      )}
      {user ? (
        <View>
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
                    text.small,
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
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {data[selectedIndex].component}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 365,
    height: 60,
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 50,
    shadowOpacity: 0.05,
    marginTop: 16,
  },
  contentContainer: {
    height: 455,
    alignItems: "center",
  },
  defaultText: {
    color: Colors.dark_grey,
    fontWeight: "500",
  },
  selectedText: {
    color: Colors.white,
    fontWeight: "500",
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
