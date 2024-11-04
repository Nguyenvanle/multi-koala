import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  TextInput,
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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FilterModal from "@/src/feature/course/components/filter/filterCourse";

const CourseList = (): React.JSX.Element => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { tab } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const { loadingUser, isRefreshing, user, refreshUser, lastUpdate } =
    useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const data = [
    {
      id: 1,
      label: "See All",
      component: (
        <AllCourses
          searchQuery={debouncedSearchQuery}
          filter={{ types: selectedTypes, fields: selectedFields }}
        />
      ),
      param: "all",
    },
    {
      id: 2,
      label: "In Progress",
      component: (
        <InProgressCourses
          searchQuery={debouncedSearchQuery}
          filter={{ types: selectedTypes, fields: selectedFields }}
        />
      ),
      param: "inprogress",
    },
    {
      id: 3,
      label: "Finished",
      component: (
        <FinishedCourses
          searchQuery={debouncedSearchQuery}
          filter={{ types: selectedTypes, fields: selectedFields }}
        />
      ),
      param: "finished",
    },
  ];

  const handleFilterPress = () => {
    setIsFilterVisible(true);
  };

  const handleApplyFilters = (types: string[], fields: string[]) => {
    setSelectedTypes(types);
    setSelectedFields(fields);
    setIsFilterVisible(false); // Đóng modal sau khi áp dụng bộ lọc
  };

  // Debounce search query để tránh gọi API quá nhiều
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Đợi 500ms sau khi người dùng ngừng gõ

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // Xử lý token nếu cần
      }
      setLoading(false);
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

  const handlePress = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
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
          <View style={styles.searchContainer}>
            <AntDesign
              name="search1"
              size={18}
              color={Colors.dark_grey}
              style={{ marginRight: 8 }}
            />
            <TextInput
              placeholder="Search course..."
              placeholderTextColor={Colors.dark_grey}
              style={{ ...text.large, flex: 1 }}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={handleFilterPress}>
              <Ionicons name="filter" size={24} color={Colors.dark_grey} />
            </TouchableOpacity>
            <FilterModal
              visible={isFilterVisible}
              onClose={() => setIsFilterVisible(false)}
              onApplyFilters={handleApplyFilters}
            />
          </View>
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
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 365,
    height: 45,
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 20,
    marginTop: 8,
  },
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
    ...text.p,
    color: Colors.dark_grey,
    fontWeight: "500",
  },
  selectedText: {
    ...text.p,
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
