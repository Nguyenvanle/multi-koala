declare module "react-native-star-view" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  type StarViewProps = {
    starCount?: number; // Số lượng sao
    onStarPress?: (rating: number) => void; // Hàm gọi lại khi nhấp vào sao
    rating?: number; // Đánh giá hiện tại
    starStyle?: ViewStyle; // Kiểu dáng sao
    emptyStarColor?: string; // Màu sao rỗng
    fullStarColor?: string; // Màu sao đầy
    starSize?: number; // Kích thước sao
  };

  export class StarView extends Component<StarViewProps> {}
  export default StarView;
}
