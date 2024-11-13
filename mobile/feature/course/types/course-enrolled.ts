export type TypeBody = {
  typeName: string;
  typeDescription: string;
};

export type FieldBody = {
  fieldName: string;
  fieldDescription: string;
};

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
    types: TypeBody[];
    fields: FieldBody[];
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
