export type RoleBody = {
  roleName: string;
  roleDescription: string;
  permissions: [];
};

export type RoleBodyList = RoleBody[];

export type ImageBody = {
  imageId: string;
  imageUrl: string;
};

export type CreateByAdmin = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  userBirth: Date;
  userBio: string;
  userHometown: string;
  email: string;
  image: ImageBody;
  roles: RoleBodyList;
  createByAdmin: null;
  deleted: boolean;
  firstLogin: boolean;
};

export type ApprovedByAdmin = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  userBirth: Date;
  userBio: string;
  userHometown: string;
  email: string;
  image: ImageBody;
  roles: RoleBodyList;
  createByAdmin: CreateByAdmin;
  deleted: boolean;
  firstLogin: boolean;
};

export type TypeBody = {
  typeName: string;
  typeDescription: string;
};

export type TypeBodyList = TypeBody[];

export type FieldBody = {
  fieldName: string;
  fieldDescription: string;
};

export type FieldBodyList = FieldBody[];

export type UploadedByTeacherBody = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  userBirth: Date;
  userBio: string;
  userHometown: string;
  email: string;
  image: ImageBody;
  roles: RoleBodyList;
  deleted: boolean;
  firstLogin: boolean;
};

export type ResultBody = {
  courseId: string;
  courseName: string;
  courseUploadedAt: Date;
  courseResponsibilityEndAt: null;
  coursePrice: number;
  courseDescription: string;
  courseLevel: string;
  types: TypeBodyList;
  fields: FieldBodyList;
  image: ImageBody;
  uploadedByTeacher: UploadedByTeacherBody;
  approvedByAdmin: ApprovedByAdmin;
  status: string;
  deleted: boolean;
};

export type ResultBodyList = ResultBody;

export type ResultRes = {
  code: number;
  message: string;
  result: ResultBodyList;
};
