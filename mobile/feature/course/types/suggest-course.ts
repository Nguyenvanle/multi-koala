export type CourseBody = {
  courseId: string;
  courseName: string;
  courseUploadedAt: Date;
  courseResponsibilityEndAt: Date | null;
  coursePrice: number;
  courseDescription: string;
  courseLevel: string;
  types: TypeBodyList;
  fields: FieldBodyList;
  image: ImageBody;
  uploadedByTeacher: UploadedByTeacherBody;
  approvedByAdmin: ApprovedByAdminBody;
  status: string;
  deleted: boolean;
};

export type TypeBodyList = TypeBody;

export type TypeBody = {
  typeName: string;
  typeDescription: string;
};

export type FieldBodyList = FieldBody;

export type FieldBody = {
  fieldName: string;
  fieldDescription: string;
};

export type ImageBody = {
  imageId: string;
  imageUrl: string;
};

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

export type RoleBodyList = RoleBody;

export type RoleBody = {
  roleName: string;
  roleDescription: string;
  permissions: [];
};

export type ApprovedByAdminBody = {
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
  createByAdmin: CreateByAdminBody;
  deleted: boolean;
  firstLogin: boolean;
};

export type CreateByAdminBody = {
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

export type CourseBodyList = CourseBody[];

export type SuggestRes = {
  code: number;
  message: string;
  result: CourseBodyList;
};
