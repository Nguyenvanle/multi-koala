import { courseService } from "@/features/courses/services/courses";
import { withAuthAndData } from "@/lib/with-auth";

export const dynamic = "force-dynamic";

export const POST = withAuthAndData(courseService.createNewCourse);
