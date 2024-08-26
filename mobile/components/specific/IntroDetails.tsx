import { router } from "expo-router";
import { Styles, text } from "@/constants/Styles";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

interface Slide {
  key: number;
  title: string;
  image: any;
  description: string;
}

const topics: Slide[] = [
  {
    key: 0,
    title: "Unlimited Learning",
    image: require("@/assets/images/unlimited_learning.png"),
    description:
      "Open the door to knowledge with Duokoala where every course is at your fingertips.",
  },
  {
    key: 1,
    title: "Diverse and Rich",
    image: require("@/assets/images/diverse_rich.png"),
    description:
      "Explore a colorful world of knowledge from talented teachers in many different languages.",
  },
  {
    key: 2,
    title: "Flexible and Convenient",
    image: require("@/assets/images/flexible_convenient.png"),
    description:
      "Learn anytime, anywhere - Duokoala turns every moment into a learning opportunity.",
  },
  {
    key: 3,
    title: "Community and Development",
    image: require("@/assets/images/community_development.png"),
    description:
      "Connect, share and grow with the learning community on Duokoala.",
  },
];

const IntroDetails = () => {
  const renderItem = ({ item }: { item: Slide }) => {
    console.log("Rendering item:", item); // Kiểm tra item đang render
    return (
      <View style={Styles.container}>
        <Text style={text.h3}>{item.title}</Text>
        <Image
          source={item.image}
          style={{ height: 550, marginVertical: 20, width: 450 }}
        />
        <Text style={text.blackquote}>{item.description}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={topics}
      onDone={() => router.replace("/(home)/home")}
    />
  );
};

export default IntroDetails;
