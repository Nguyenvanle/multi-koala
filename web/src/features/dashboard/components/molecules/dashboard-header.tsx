import { CardInfo } from "@/features/dashboard/components/atoms/card-info";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { Activity, BookOpen, GraduationCap, Users } from "lucide-react";

interface DashboardHeaderProps {
  statistics: TeacherStatisticsBodyType;
  teacherRating: number;
}

export function DashboardHeader({
  statistics,
  teacherRating,
}: DashboardHeaderProps) {
  return (
    <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardInfo
        title="Total Revenue"
        value={`${statistics?.totalPrices.toFixed(2)} USD`}
        icon={<BookOpen className="h-4 w-4 text-primary " />}
      />
      <CardInfo
        title="Active Students"
        value={`${statistics?.totalStudents} students`}
        icon={<Users className="h-4 w-4 text-primary" />}
      />
      <CardInfo
        title="Course Sales"
        value={`${statistics?.totalCourses} courses`}
        icon={<GraduationCap className="h-4 w-4 text-primary " />}
      />
      <CardInfo
        title="Average Rating"
        value={`${(Number(teacherRating.toFixed(1)) * 100).toFixed(1)}%`}
        icon={<Activity className="h-4 w-4 text-primary " />}
      />
    </div>
  );
}
