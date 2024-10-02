import React from "react";
import { AirbnbRating as OriginalAirbnbRating } from "react-native-ratings";
import { TapRatingProps } from "react-native-ratings/dist/TapRating";

// Extend TapRatingProps với các props bổ sung nếu cần
interface ExtendedAirbnbRatingProps extends TapRatingProps {
  // Thêm các props bổ sung ở đây nếu cần
}

const AirbnbRating: React.FC<ExtendedAirbnbRatingProps> = (props) => {
  const defaultProps: Partial<ExtendedAirbnbRatingProps> = {
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
