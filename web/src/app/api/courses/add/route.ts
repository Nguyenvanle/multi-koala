import { courseService } from "@/features/courses/services/courses";
import { withAuthAndData } from "@/lib/with-auth";

export const POST = withAuthAndData(courseService.createNewCourse);
