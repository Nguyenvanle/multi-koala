export interface Lesson {
  lessonId: string;
  lessonTitle: string;
  lessonDuration: number; // Thời gian học (ví dụ: "10 phút" hoặc "1 giờ")
  lessonContent: string; // Tóm tắt nội dung bài học
  lessonsImageUrl: string;
}

export const lessons = [
  {
    lessonId: "1",
    lessonTitle: "Giới thiệu về React",
    lessonDuration: 15,
    lessonContent: "Tìm hiểu về lịch sử và cách hoạt động của React.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1724930786~exp=1724934386~hmac=7f60a2921ecc9c979299c2a49fbc0eebccb329c66620be3a1f61dbda6075301c&w=826",
  },
  {
    lessonId: "2",
    lessonTitle: "Cài đặt và cấu hình môi trường phát triển",
    lessonDuration: 30,
    lessonContent: "Hướng dẫn cài đặt Node.js và tạo ứng dụng React đầu tiên.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-astronaut-riding-rocket-waving-hand-cartoon-icon-illustration-science-technology-icon-concept_138676-2130.jpg?t=st=1724932898~exp=1724936498~hmac=55f825794d04c2c69df04c521293657a8a62e523553a263ad08ea6ef418094b7&w=740",
  },
  {
    lessonId: "3",
    lessonTitle: "Component và Props",
    lessonDuration: 20,
    lessonContent: "Tìm hiểu cách tạo và sử dụng component trong React.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-koala-holding-branch-tree-cartoon-vector-icon-illustration-animal-nature-icon-isolated-flat_138676-12795.jpg?t=st=1724932967~exp=1724936567~hmac=883fae2eb5f3d4541ac5bd815cee3ac6ae2d04e137260bb20b33f34b6d9d03b2&w=740",
  },
  {
    lessonId: "4",
    lessonTitle: "State và Lifecycle",
    lessonDuration: 25,
    lessonContent:
      "Hiểu về state trong React và cách quản lý lifecycle của component.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1724930786~exp=1724934386~hmac=7f60a2921ecc9c979299c2a49fbc0eebccb329c66620be3a1f61dbda6075301c&w=826",
  },
  {
    lessonId: "5",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1724930786~exp=1724934386~hmac=7f60a2921ecc9c979299c2a49fbc0eebccb329c66620be3a1f61dbda6075301c&w=826",
  },
  {
    lessonId: "6",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1724930786~exp=1724934386~hmac=7f60a2921ecc9c979299c2a49fbc0eebccb329c66620be3a1f61dbda6075301c&w=826",
  },
  {
    lessonId: "7",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1724930786~exp=1724934386~hmac=7f60a2921ecc9c979299c2a49fbc0eebccb329c66620be3a1f61dbda6075301c&w=826",
  },
  {
    lessonId: "8",
    lessonTitle: "Xử lý sự kiện",
    lessonDuration: 15,
    lessonContent: "Hướng dẫn cách xử lý sự kiện trong React.",
    lessonsImageUrl:
      "https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1724930786~exp=1724934386~hmac=7f60a2921ecc9c979299c2a49fbc0eebccb329c66620be3a1f61dbda6075301c&w=826",
  },
];
