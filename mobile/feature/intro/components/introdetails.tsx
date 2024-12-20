import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { router } from "expo-router"; // Thay thế bằng thư viện bạn đang sử dụng
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from "react-native";
import { topics } from "@/feature/intro/types/intro-info";

export const IntroDetails = () => {
  const [selectedIndex, setIndex] = useState(0);
  const [hasLaunched, setHasLaunched] = useState(false);

  const handlePress = (index: number) => {
    setIndex(index);
  };

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     const hasLaunchedValue = await AsyncStorage.getItem("hasLaunched");
  //     if (hasLaunchedValue !== null) {
  //       setHasLaunched(false); // Đã xem intro, không cần hiển thị
  //     }
  //   };

  //   checkFirstLaunch();
  // }, []);

  const handleGetStarted = async () => {
    // await AsyncStorage.setItem("hasLaunched", "true"); // Đánh dấu đã xem intro
    router.replace("/(home)/home"); // Chuyển sang trang chính
  };

  // Nếu đã xem intro, chuyển hướng đến trang chính

  return (
    <View style={Styles.container}>
      <Text style={{ ...text.h3, color: Colors.teal_dark, fontWeight: "bold" }}>
        {topics[selectedIndex].title}
      </Text>
      <Image
        source={topics[selectedIndex].image}
        style={{ height: 550, marginVertical: 20, width: 450 }}
      />
      <View style={{ marginHorizontal: 25 }}>
        <Text style={{ ...text.blackquote, color: Colors.black }}>
          {topics[selectedIndex].description}
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        {topics.map((topic, index) => (
          <CheckBox
            key={index}
            checked={selectedIndex === index}
            onPress={() => handlePress(index)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        ))}
      </View>
      <TouchableHighlight onPress={handleGetStarted} style={styles.start}>
        <Text style={{ ...text.p, color: Colors.white }}>Get started</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  start: {
    marginTop: 10,
    backgroundColor: Colors.teal_dark,
    borderRadius: 25,
    width: 350,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
