import { FieldCourseList } from "./fields-course";
import { Image } from "./image";
import { RolesList } from "./roles";
import { TypeCourseList } from "./type-course";

export type UploadByTeacher = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  userBirth: null;
  userBio: string;
  userHometown: string;
  email: string;
  image: Image;
  roles: RolesList;
  deleted: boolean;
  firstLogin: boolean;
};

export type Course = {
  courseId: string;
  courseName: string;
  courseUploadedAt: string;
  coursePrice: number;
  courseDescription: string;
  courseLevel: string;
  types: TypeCourseList;
  fields: FieldCourseList;
  image: Image;
  uploadByTeacher: UploadByTeacher;
  approvedByAdmin: null;
  status: string;
  deleted: boolean;
};

export type Student = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  userBirth: string;
  userBio: string;
  userHometown: string;
  email: string;
  image: Image;
  roles: RolesList;
  deleted: boolean;
  firstLogin: boolean;
};

export type ResultCourse = {
  favouriteId: string;
  favouriteAt: string;
  student: Student;
  course: Course;
};

export type CourseRes = {
  code: number;
  message: string;
  result: ResultCourse;
};
