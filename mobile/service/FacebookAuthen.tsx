import { View, Text, Linking } from "react-native";
import React from "react";

const openFacebook = () => {
  const facebookUrl = "fb://profile"; // Mở ứng dụng Facebook
  const webUrl = "https://www.facebook.com"; // Mở trang Facebook trên trình duyệt

  Linking.canOpenURL(facebookUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(facebookUrl);
      } else {
        return Linking.openURL(webUrl);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
export default openFacebook;
