import { CourseNormal } from "@/src/feature/course/types/course-details";
import CourseDetails from "../../../app/(courses-details)/[courseId]";
export interface CourseRes {
  code: string;
  message: string;
  result: CourseNormal;
}
