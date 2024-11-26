export type EnrollRes = {
  code: number;
  message: string;
  result: EnrollBody;
};

export type EnrollBody = {
  enrollCourseId: string;
  enrollAt: Date;
  process: number;
  student: StudentBody;
  course: CourseBody;
  suggest: boolean;
};

export type StudentBody = {
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

export type CourseBody = {
  courseId: string;
  courseName: string;
  courseUploadedAt: Date;
  courseResponsibilityEndAt: Date;
  coursePrice: number;
  courseDescription: string;
  courseLevel: string;
  types: TypeBodyList;
  fields: FieldBodyList;
  image: ImageBody;
  uploadedByteacher: UploadedByTeacherBody;
  approvedByAdmin: ApprovedByAdminBody;
  status: string;
  deleted: boolean;
};

export type ImageBody = {
  imageId: string;
  imageUrl: string;
};

export type RoleBodyList = RoleBody[];

export type RoleBody = {
  roleName: string;
  roleDescription: string;
  permissions: [];
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
  createByAdmin: CreateByAdmin;
  deleted: boolean;
  firstLogin: boolean;
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
