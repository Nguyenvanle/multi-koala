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
  h3: {
    fontSize: 24,
    color: Colors.black,
  },
  h4: {
    fontSize: 20,
    color: Colors.black,
  },
  p: {
    fontSize: 16,
    color: Colors.dark,
  },
  large: {
    fontSize: 18,
    color: Colors.dark,
  },
  blackquote: {
    fontSize: 16,
    color: Colors.dark,
    fontStyle: "italic",
  },
});
