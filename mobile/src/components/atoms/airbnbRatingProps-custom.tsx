import React from "react";
import { AirbnbRating as OriginalAirbnbRating } from "react-native-ratings";
import { ViewStyle, StyleProp } from "react-native";

interface AirbnbRatingProps {
  count?: number;
  defaultRating?: number;
  reviews?: string[];
  onFinishRating?: (rating: number) => void;
  showRating?: boolean;
  isDisabled?: boolean;
  size?: number;
  starContainerStyle?: StyleProp<ViewStyle>;
  // Thêm các props khác nếu cần
}

const AirbnbRating: React.FC<AirbnbRatingProps> = (props) => {
  const defaultProps: Partial<AirbnbRatingProps> = {
    count: 5,
    showRating: false,
    isDisabled: true,
    size: 20,
    starContainerStyle: { padding: 0 },
    onFinishRating: () => {},
  };

  return <OriginalAirbnbRating {...defaultProps} {...props} />;
};

export default AirbnbRating;
