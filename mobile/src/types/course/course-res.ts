import { CourseNormal } from "@/src/feature/api/course-details";
import { CourseDetails } from "@/src/feature/coursedetailsprogress";
export interface CourseRes {
  code: string;
  message: string;
  result: CourseNormal;
}
