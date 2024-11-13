export type ResultRes = {
  code: number;
  message: string;
  result: ResultBodyList;
};

export type ResultBodyList = ResultBody[];

export type ResultBody = {
  lessonStudentId: string;
  process: number;
  lastUpdate: Date;
  lesson: LessonBody;
};

export type LessonBody = {
  lessonId: string;
  lessonName: string;
  lessonDescription: string;
  image: ImageBody;
  video: VideoBody;
  lessonUploadedAt: Date;
  course: CourseBody;
  deleted: boolean;
  demo: boolean;
};

export type ImageBody = {
  imageId: string;
  imageUrl: string;
};

export type VideoBody = {
  videoId: string;
  videoUrl: string;
  videoDuration: number;
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
  uploadedByTeacher: UploadedByTeacherBody;
  approvedByAdmin: ApprovedByAdminBody;
  status: string;
  deleted: boolean;
};

export type TypeBodyList = TypeBody[];

export type TypeBody = {
  typeName: string;
  typeDescription: string;
};

export type FieldBodyList = FieldBody[];

export type FieldBody = {
  fieldName: string;
  fieldDescription: string;
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
  createByAdmin: CreatedByAdminBody;
  deleted: boolean;
  firstLogin: boolean;
};

export type RoleBodyList = RoleBody[];

export type RoleBody = {
  roleName: string;
  roleDescription: string;
  permissions: [];
};

export type CreatedByAdminBody = {
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
  createByAdmin: string;
  deleted: boolean;
  firstLogin: boolean;
};
