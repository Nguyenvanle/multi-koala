import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Styles, text } from "@/src/constants/Styles";
import HeaderUser from "@/src/components/common/HeaderUser";
import { Colors } from "@/src/constants/Colors";
import AllCourses from "@/src/components/common/AllCourses";
import InProgressCourses from "@/src/components/common/InProgressCourses";
import FinishedCourses from "@/src/components/common/FinishedCourses";

const CourseList = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const data = [
    { id: 1, label: "See All", component: <AllCourses /> },
    { id: 2, label: "In Progress", component: <InProgressCourses /> },
    { id: 3, label: "Finished", component: <FinishedCourses /> },
  ];

  const handlePress = (index) => {
    setSelectedIndex(index); // Cập nhật chỉ số đã chọn
  };
  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <HeaderUser />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 380,
          height: 60,
          top: -40,
          paddingHorizontal: 30,
          backgroundColor: Colors.white,
          borderRadius: 50,
          shadowOpacity: 0.05,
        }}
      >
        {data.map((item, index) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(index)}>
            <Text
              style={[
                text.p,
                selectedIndex === index
                  ? styles.selectedText
                  : styles.defaultText, // Đổi màu chữ
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Hiển thị component dữ liệu tương ứng */}
      {selectedIndex !== null && (
        <ScrollView showsVerticalScrollIndicator={false} style={{ top: -40 }}>
          {data[selectedIndex].component}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  defaultButton: {
    color: Colors.white, // Màu mặc định
  },
  selectedButton: {
    color: Colors.teal_dark, // Màu khi được chọn
  },
  dataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "80%", // Đảm bảo kích thước phù hợp
  },
  defaultText: {
    color: Colors.black, // Màu chữ mặc định
  },
  selectedText: {
    color: Colors.teal_light, // Màu chữ khi được chọn
  },
});

export default CourseList;
