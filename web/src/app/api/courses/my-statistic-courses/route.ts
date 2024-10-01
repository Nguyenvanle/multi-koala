import { courseService } from "@/features/courses/services/courses";
import { withAuth } from "@/lib/with-auth";

export const GET = withAuth(courseService.getMyCourses);