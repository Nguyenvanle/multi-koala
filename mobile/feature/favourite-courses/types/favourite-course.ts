import { FieldCourseList } from "../../../src/feature/favourite-courses/types/fields-course";
import { Image } from "../../../src/feature/favourite-courses/types/image";
import { RolesList } from "../../../src/feature/favourite-courses/types/roles";
import { TypeCourseList } from "../../../src/feature/favourite-courses/types/type-course";

export type uploadedByTeacher = {
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
  uploadedByTeacher: uploadedByTeacher;
  approvedByAdmin: [];
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
  course: Course;
  student: Student;
};

export type CourseResList = {
  code: number;
  message: string;
  result: ResultCourse[];
};

export type CourseRes = {
  code: number;
  message: string;
  result: ResultCourse;
};

export type CourseDelete = {
  code: number;
  message: string;
};

export type CourseCheck = {
  code: number;
  message: string;
  result: boolean;
};
