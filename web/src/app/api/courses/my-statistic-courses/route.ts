import { courseService } from "@/features/courses/services/courses";
import { withAuth } from "@/lib/with-auth";

export const dynamic = "force-dynamic";

export const GET = withAuth(courseService.getMyCourses);