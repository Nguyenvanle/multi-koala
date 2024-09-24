import { CourseNormal } from "@/src/feature/course/types/course-details";
import CourseDetails from "../../../app/[courseId]";
export interface CourseRes {
  code: string;
  message: string;
  result: CourseNormal;
}
