import { LabelProps } from "@/components/atoms/label";
import { text } from "@/constants/Styles";
import { Text } from "react-native";

export default function LinkLabel({ title, style }: LabelProps) {
  return <Text style={[text.link, style]}>{title}</Text>;
}
