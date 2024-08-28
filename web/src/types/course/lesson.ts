export interface Lesson {
  lessonId: string;
  lessonTitle: string;
  lessonDuration: number; // Thời gian học (ví dụ: "10 phút" hoặc "1 giờ")
  lessonContent: string; // Tóm tắt nội dung bài học
}

export const lessons = [
  {
    lessonId: "1",
    lessonTitle: "Giới thiệu về React",
    lessonDuration: 15,
    lessonContent: "Tìm hiểu về lịch sử và cách hoạt động của React.",
  },
  {
    lessonId: "2",
    lessonTitle: "Cài đặt và cấu hình môi trường phát triển",
    lessonDuration: 30,
    lessonContent: "Hướng dẫn cài đặt Node.js và tạo ứng dụng React đầu tiên.",
  },
  {
    lessonId: "3",
    lessonTitle: "Component và Props",
    lessonDuration: 20,
    lessonContent: "Tìm hiểu cách tạo và sử dụng component trong React.",
  },
  {
    lessonId: "4",
    lessonTitle: "State và Lifecycle",
    lessonDuration: 25,
    lessonContent:
      "Hiểu về state trong React và cách quản lý lifecycle của component.",
  },
  {
    lessonId: "5",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
  },
  {
    lessonId: "6",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
  },
  {
    lessonId: "7",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
  },
  {
    lessonId: "8",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
  },
];
