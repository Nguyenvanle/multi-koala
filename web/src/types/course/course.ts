export interface CourseCardProps {
  courseId: string;
  courseName: string;
  courseCreateAt: Date;
  coursePrice: number;
  courseDescription: string;
  courseType: {
    typeName: string;
    typeDescription: string;
  }[];
  courseImage: string; // => Image?
  uploadByTeacher: string; // => Teacher?
  approvedByAdmin: string; // => Admin?
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | string;
  courseRating: number;
  courseLevel: CourseLevel | string;
}
