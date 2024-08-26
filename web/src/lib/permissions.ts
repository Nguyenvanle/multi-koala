// roles.ts
export type Role = "admin" | "teacher" | "guest";

// viết hoa
export const permissionMap: Record<string, Role[]> = {
  reviewPosts: ["admin"], // Chỉ admin có quyền duyệt bài
  manageUsers: ["admin"], // Chỉ admin có quyền quản lý người dùng
  revenueStats: ["admin"], // Chỉ admin có quyền thống kê doanh thu
  createCourse: ["teacher"], // Chỉ teacher có quyền đăng bài khóa học
  editCourse: ["teacher"], // Chỉ teacher có quyền chỉnh sửa thông tin khóa học
  viewStudentStats: ["teacher"], // Chỉ teacher có quyền xem thống kê học viên
  viewCourses: ["admin", "teacher", "guest"], // Tất cả có quyền xem danh sách khóa học
  searchCourses: ["admin", "teacher", "guest"], // Tất cả có quyền tìm kiếm khóa học
  viewCourseDetails: ["admin", "teacher", "guest"], // Tất cả có quyền xem chi tiết khóa học
  viewLessonDetails: ["admin", "teacher"], // Chỉ admin và teacher có quyền xem chi tiết bài học
};
