interface CourseData {
  courseId: string;
  courseName: string;
  coursePrice: number;
  image: {
    imageUrl: string;
  };
  courseDescription: string;
  uploadedByTeacher: {
    firstname: string;
    lastname: string;
  };
  courseLevel: string;
  courseRating: number;
  types: {
    typeName: string;
    typeDescription: string;
  };
  fields: {
    fieldName: string;
    fielDescription: string;
  };
  discountApprovedRate: number;
  status: string;
}