import { teacherService } from "@/features/users/services/teacher";
import { withAuth } from "@/lib/with-auth";

export const GET = withAuth(teacherService.getStatistic);