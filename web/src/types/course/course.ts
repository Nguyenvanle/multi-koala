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
  courseFields: {
    fieldName: string;
    fieldDescription: string;
  }[];
  courseImage: string; // => Image?
  uploadByTeacher: string; // => Teacher?
  approvedByAdmin: string; // => Admin?
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | string;
  courseRating: number;
  courseLevel: CourseLevel | string;
  courseDiscount: number;
}
