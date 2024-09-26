export type CourseBody = {
  courseId: string;
  courseName: string;
  coursePrice: number;
  image: {
    imageUrl: string;
    image: string;
  };
  courseDescription: string;
  uploadedByTeacher: {
    firstname: string;
    lastname: string;
  };
  courseLevel: string;
  types: {
    typeName: string;
    typeDescription: string;
  };
  fields: {
    fieldName: string;
    fielDescription: string;
  };
};

export type CourseRes = {
  code: number;
  message: string;
  result: CourseBody;
};

export type CourseBodyList = CourseBody[];

export type CourseResList = {
  code: number;
  message: string;
  result: CourseBodyList;
};
