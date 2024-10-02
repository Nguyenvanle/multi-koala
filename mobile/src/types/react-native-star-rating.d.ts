declare module "react-native-star-rating" {
  import { Component } from "react";

  interface StarRatingProps {
    disabled?: boolean;
    maxStars?: number;
    rating?: number;
    selectedStar?: (rating: number) => void;
    starColor?: string;
    starSize?: number;
    emptyStarColor?: string;
    fullStarColor?: string;
  }

  export class StarRating extends Component<StarRatingProps> {}
  export default StarRating;
}
