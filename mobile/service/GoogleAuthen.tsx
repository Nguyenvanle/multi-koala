import { Linking } from "react-native";

const openGmail = () => {
  const gmailUrl = "googlegmail://"; // URL để mở ứng dụng Gmail
  const webUrl = "https://mail.google.com"; // URL để mở Gmail trên trình duyệt

  Linking.canOpenURL(gmailUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(gmailUrl);
      } else {
        return Linking.openURL(webUrl);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
export default openGmail;
