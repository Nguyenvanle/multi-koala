import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
} from "react-native"; // Hoặc các thành phần tương ứng với thư viện bạn đang sử dụng
import { CheckBox } from "react-native-elements"; // Thư viện checkbox
import { Stack } from "expo-router"; // Thay thế bằng thư viện bạn đang sử dụng
import { Styles, text } from "@/constants/Styles";

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

const IntroDetails = () => {
  const [selectedIndex, setIndex] = React.useState(0);

  const handlePress = (index: any) => {
    setIndex(index);
  };

  return (
    <View style={Styles.container}>
      <Text style={{ ...text.h3, marginBottom: 20 }}>
        {topics[selectedIndex].title}
      </Text>
      <Image
        source={topics[selectedIndex].image}
        style={{ height: 550, marginVertical: 20, width: 450 }}
      />
      <View style={{ marginHorizontal: 25, paddingBottom: 20 }}>
        <Text style={text.blackquote}>{topics[selectedIndex].description}</Text>
      </View>
      <View style={{ ...styles.checkboxContainer, flexDirection: "row" }}>
        {topics.map((topic, index) => (
          <CheckBox
            key={index}
            checked={selectedIndex === index}
            onPress={() => handlePress(index)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={styles.checkbox}
          />
        ))}
      </View>

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
  checkbox: {
    marginTop: 20,
  },
});

export default IntroDetails;
