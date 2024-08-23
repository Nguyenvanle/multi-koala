import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "./Colors";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
export const text = StyleSheet.create({
  h2: {
    fontSize: 30,
    color: Colors.black,
  },
  large: {
    fontSize: 18,
    color: Colors.dark,
  },
  h4: {
    fontSize: 20,
    color: Colors.black,
  },
  p: {
    fontSize: 16,
    color: Colors.dark,
  },
});
