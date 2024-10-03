import { teacherService } from "@/features/users/services/teacher";
import { withAuth } from "@/lib/with-auth";

export const dynamic = "force-dynamic";

export const GET = withAuth(teacherService.getStatistic);