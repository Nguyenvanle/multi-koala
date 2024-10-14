import { courseService } from "@/features/courses/services/courses";
import { withAuthAndCourseIdAndData } from "@/lib/with-auth";

export const dynamic = "force-dynamic";

export const PUT = withAuthAndCourseIdAndData(courseService.updateCourses);
