export type CourseType = {
  typeName: string;
  // other type fields
};

export type FieldType = {
  fieldName: string;
  // other field fields
};

export type Teacher = {
  firstname: string;
  lastname: string;
  // other teacher fields
};

export type Course = {
  courseId: string;
  courseName: string;
  types: CourseType;
  fields: FieldType;
  uploadedByTeacher: Teacher;
  image: {
    imageUrl: string;
  };
  // other course fields
};

export type EnrolledCourse = {
  course: Course;
  process: number;
  // other enrolled course fields
};
