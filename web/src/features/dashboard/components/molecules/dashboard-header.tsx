import { CardInfo } from "@/features/dashboard/components/atoms/card-info";
import VisitorsPieChart from "@/features/dashboard/components/molecules/student-chart";
import { StudentChartBodyType } from "@/features/enroll-courses/types/my-student-chart";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { Activity, BookOpen, GraduationCap, Users } from "lucide-react";

interface DashboardHeaderProps {
  statistics: TeacherStatisticsBodyType;
  teacherRating: number;
  studentChartData: StudentChartBodyType;
}

export function DashboardHeader({
  statistics,
  teacherRating,
  studentChartData,
}: DashboardHeaderProps) {
  return (
    <div className="grid grid-cols-3 gap-4 xl:gap-6">
      <div className="col-span-2">
        <VisitorsPieChart
          studentChartData={studentChartData}
          description={new Date(studentChartData.month).toLocaleString(
            "en-US",
            { month: "long", year: "numeric" }
          )}
          trendingPercentage={studentChartData.trend}
        />
      </div>
      <div className="flex flex-col gap-4">
        <CardInfo
          title="Total Revenue"
          value={`${statistics?.totalPrices.toFixed(2) ?? 0} USD`}
          icon={<BookOpen className="h-4 w-4 text-primary " />}
          href={`/dashboard/courses?sort=sales`}
        />
        <CardInfo
          title="Total Students"
          value={`${statistics?.totalStudents ?? 0} students`}
          icon={<Users className="h-4 w-4 text-primary" />}
          href={`/dashboard/students`}
        />
        <CardInfo
          title="Course Sales"
          value={`${statistics?.totalEnrollments ?? 0} courses`}
          icon={<GraduationCap className="h-4 w-4 text-primary " />}
        />
        <CardInfo
          title="Average Rating"
          value={`${(Number(teacherRating.toFixed(1)) * 5).toFixed(2)}⭐`}
          icon={<Activity className="h-4 w-4 text-primary " />}
        />
      </div>
    </div>
  );
}
