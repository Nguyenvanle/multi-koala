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
}
