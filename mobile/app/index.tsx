import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href={"/(tabs)/(account)/account"} />;
};

export default Index;
