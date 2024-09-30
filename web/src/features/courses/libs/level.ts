// Tiếp theo, tạo một hàm để xác định màu sắc cho từng cấp độ
export const getLevelColor = (level: CourseLevel | string): string => {
  switch (level) {
    case "BEGINNER":
      return "text-teal-600"; // Màu xanh cho BEGINNER
    case "INTERMEDIATE":
      return "text-yellow-500"; // Màu vàng cho INTERMEDIATE
    case "ADVANCED":
      return "text-orange-500"; // Màu cam cho ADVANCED
    case "EXPERT":
      return "text-red-500"; // Màu đỏ cho EXPERT
    default:
      return ""; // Mặc định
  }
};
