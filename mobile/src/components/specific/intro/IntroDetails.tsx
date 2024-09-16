import React, { useEffect, useState } from "react";
import { CheckBox } from "react-native-elements";
import { Redirect, router } from "expo-router"; // Thay thế bằng thư viện bạn đang sử dụng
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const topics = [
  {
    title: "Unlimited Learning",
    image: require("@/src/assets/images/unlimited_learning.png"),
    description:
      "Open the door to knowledge with Duokoala where every course is at your fingertips.",
  },
  {
    title: "Diverse and Rich",
    image: require("@/src/assets/images/diverse_rich.png"),
    description:
      "Explore a colorful world of knowledge from talented teachers in many different languages.",
  },
  {
    title: "Flexible and Convenient",
    image: require("@/src/assets/images/flexible_convenient.png"),
    description:
      "Learn anytime, anywhere - Duokoala turns every moment into a learning opportunity.",
  },
  {
    title: "Community and Development",
    image: require("@/src/assets/images/community_development.png"),
    description:
      "Connect, share and grow with the learning community on Duokoala.",
  },
];

export const IntroDetails = () => {
  const [selectedIndex, setIndex] = useState(0);
  const [hasLaunched, setHasLaunched] = useState(false);

  const handlePress = (index: number) => {
    setIndex(index);
  };

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunchedValue = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunchedValue !== null) {
        setHasLaunched(false); // Đã xem intro, không cần hiển thị
      }
    };

    checkFirstLaunch();
  }, []);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("hasLaunched", "true"); // Đánh dấu đã xem intro
    router.replace("/(home)/home"); // Chuyển sang trang chính
  };

  // Nếu đã xem intro, chuyển hướng đến trang chính
  if (hasLaunched) {
    return <Redirect href={"/(home)/home"} />;
  }

  return (
    <View style={Styles.container}>
      <Text style={text.h3}>{topics[selectedIndex].title}</Text>
      <Image
        source={topics[selectedIndex].image}
        style={{ height: 550, marginVertical: 20, width: 450 }}
      />
      <View style={{ marginHorizontal: 25 }}>
        <Text style={text.blackquote}>{topics[selectedIndex].description}</Text>
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
