export type EnrolledBody = {
  course: {
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
    courseRating: number;
    types: {
      typeName: string;
      typeDescription: string;
    };
    fields: {
      fieldName: string;
      fielDescription: string;
    };
    status: string;
  };
  process: number;
};

export type EnrolledRes = {
  code: number;
  message: string;
  result: EnrolledBody;
};

export type EnrolledBodyList = EnrolledBody[];

export type EnrolledResList = {
  code: number;
  message: string;
  result: EnrolledBodyList;
};
