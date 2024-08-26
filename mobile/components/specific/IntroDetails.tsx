import { CheckBox } from "react-native-elements"; // Thư viện checkbox
import { router } from "expo-router"; // Thay thế bằng thư viện bạn đang sử dụng
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from "react-native";

const topics = [
  {
    title: "Unlimited Learning",
    image: require("@/assets/images/unlimited_learning.png"),
    description:
      "Open the door to knowledge with Duokoala where every course is at your fingertips.",
  },
  {
    title: "Diverse and Rich",
    image: require("@/assets/images/diverse_rich.png"), // Liên kết đến hình ảnh trong thư mục assets
    description:
      "Explore a colorful world of knowledge from talented teachers in many different languages.",
  },
  {
    title: "Flexible and Convenient",
    image: require("@/assets/images/flexible_convenient.png"), // Liên kết đến hình ảnh trong thư mục assets
    description:
      "Learn anytime, anywhere - Duokoala turns every moment into a learning opportunity.",
  },
  {
    title: "Community and Development",
    image: require("@/assets/images/community_development.png"),
    description:
      "Connect, share and grow with the learning community on Duokoala.",
  },
];

export const IntroDetails = () => {
  const [selectedIndex, setIndex] = React.useState(0);

  const handlePress = (index: any) => {
    setIndex(index);
  };

  return (
    <View style={Styles.container}>
      <Text style={text.h3}>{topics[selectedIndex].title}</Text>
      <Image
        source={topics[selectedIndex].image}
        style={{ height: 550, marginVertical: 20, width: 450 }}
      />
      <Image source={{ uri: topics[selectedIndex].image }} />
      <View style={{ marginHorizontal: 25 }}>
        <Text style={text.blackquote}>{topics[selectedIndex].description}</Text>
      </View>
      <View
        style={{
          ...styles.checkboxContainer,
        }}
      >
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
      <TouchableHighlight
        onPress={() => router.replace("/(home)/home")}
        style={styles.start}
      >
        <Text style={{ ...text.p, color: Colors.white }}>Get started</Text>
      </TouchableHighlight>

      {/* Hiển thị nội dung dựa trên lựa chọn */}
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
