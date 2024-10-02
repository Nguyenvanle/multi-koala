import React from "react";
import { StarRating as OriginalStarRating } from "react-native-star-rating";
import { ViewStyle } from "react-native";

// Định nghĩa các props của StarRating
interface StarRatingProps {
  // Tham số từ thư viện react-native-star-rating
  disabled?: boolean;
  maxStars?: number;
  rating?: number;
  selectedStar?: (rating: number) => void;
  starColor?: string;
  starSize?: number;
  emptyStarColor?: string;
  fullStarColor?: string;
  // Các props bổ sung khác nếu cần
}

// Extend StarRatingProps với các props bổ sung nếu cần
interface ExtendedStarRatingProps extends StarRatingProps {
  // Thêm các props bổ sung ở đây nếu cần
}

// Component StarRating
const StarRating: React.FC<ExtendedStarRatingProps> = (props) => {
  const defaultProps: Partial<ExtendedStarRatingProps> = {
    disabled: false,
    maxStars: 5,
    rating: 0,
    starColor: "#f1c40f",
    starSize: 30,
    emptyStarColor: "#ccc",
    fullStarColor: "#f1c40f",
  };

  return <OriginalStarRating {...defaultProps} {...props} />;
};

export default StarRating;
