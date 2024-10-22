import dynamic from "next/dynamic";
import StudentHeader from "@/features/dashboard/components/atoms/students-header";
import TopPerformingStudents from "@/features/dashboard/components/atoms/top-student";
import RecentStudentActivities from "@/features/dashboard/components/atoms/recent-activity";
const StudentPerformanceTrend = dynamic(
  () => import("@/features/dashboard/components/atoms/trend-chart"),
  { ssr: false }
);

export default function DashboardStudentPage() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex justify-between items-center">
        <StudentHeader />
      </div>

      <div className="grid gap-4 xl:gap-6 md:grid-cols-2">
        <StudentPerformanceTrend />
        <TopPerformingStudents />
      </div>

      <RecentStudentActivities />
    </div>
  );
}
