import { LabelProps } from "@/src/components/atoms/label";
import { text } from "@/src/constants/Styles";
import { Text } from "react-native";

export default function InputLabel({ title, style }: LabelProps) {
  return <Text style={[style, text.p]}>{title}</Text>;
}
