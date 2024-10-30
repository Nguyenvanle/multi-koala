import dynamic from "next/dynamic";
import StudentHeader from "@/features/dashboard/components/atoms/students-header";
import TopPerformingStudents from "@/features/dashboard/components/atoms/top-student";
import RecentStudentActivities from "@/features/dashboard/components/atoms/recent-activity";
const StudentStatsPie = dynamic(
  () => import("@/features/dashboard/components/atoms/trend-chart"),
  { ssr: false }
);

export default function DashboardStudentPage() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <StudentHeader />
      </div>

      <div className="grid gap-4 xl:gap-6 lg:grid-cols-2 ">
        <StudentStatsPie />
        <TopPerformingStudents />
      </div>

      {/* <RecentStudentActivities /> */}
    </div>
  );
}
