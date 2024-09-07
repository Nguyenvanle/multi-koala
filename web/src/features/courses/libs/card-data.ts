import { CoursesResultResType } from "@/features/courses/types/course";
import { CourseCardProps } from "@/types/course/course";

export default function cardDataFilter({
  courses,
}: {
  courses: CoursesResultResType;
}): CourseCardProps[] {
  // Khởi tạo mảng để lưu trữ dữ liệu đầu ra
  const outputCourses: CourseCardProps[] = courses.map((course) => ({
    approvedByAdmin:
      course.approvedByAdmin?.firstname + course.approvedByAdmin?.lastname ||
      "", // Hoặc lấy từ thuộc tính khác nếu cần
    courseCreateAt: course.courseUploadedAt, // Giả sử bạn muốn giữ nguyên ngày đã tải lên
    courseDescription: course.courseDescription,
    courseId: course.courseId,
    courseName: course.courseName,
    coursePrice: course.coursePrice,
    courseImage: course.image.imageUrl || "", // Lấy URL hình ảnh
    uploadByTeacher:
      course.uploadedByTeacher.firstname + course.uploadedByTeacher.lastname ||
      "", // Hoặc thuộc tính khác để lấy tên giáo viên
    status: course.status.toString(),
    courseType: course.types.map((type) => type.typeName).join(", "),
  }));

  return outputCourses;
}
