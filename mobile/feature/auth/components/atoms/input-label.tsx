import { LabelProps } from "@/components/atoms/label";
import { text } from "@/constants/Styles";
import { Text } from "react-native";

export default function InputLabel({ title, style }: LabelProps) {
  return <Text style={[style, text.p]}>{title}</Text>;
}
