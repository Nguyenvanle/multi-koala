import { text } from "@/constants/Styles";
import { StyleProp, Text, TextStyle } from "react-native";

export interface LabelProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export default function Label({ title, style }: LabelProps) {
  return <Text style={[text.p, style]}>{title}</Text>;
}
