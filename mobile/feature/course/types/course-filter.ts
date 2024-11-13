export type FieldsBody = {
  fieldName: string;
  fieldDescription: string;
};

export type FieldsBodyList = FieldsBody[];

export type TypesBody = {
  typeName: string;
  typeDescription: string;
};

export type TypesBodyList = TypesBody[];

export type ResultBody = {
  courseId: string;
  courseName: string;
  courseUploadedAt: Date;
  courseResponsibilityEndAt: Date;
  coursePrice: number;
  courseDescription: string;
  courseLevel: string;
  types: TypesBodyList;
  fields: FieldsBodyList;
};

export type ResultBodyList = ResultBody[];

export type ResultRes = {
  code: number;
  message: string;
  result: ResultBodyList;
};
