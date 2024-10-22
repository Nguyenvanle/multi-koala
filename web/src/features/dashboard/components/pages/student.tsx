import StudentHeader from "@/features/dashboard/components/atoms/students-header";
import StudentPerformanceTrend from "@/features/dashboard/components/atoms/trend-chart";

export default function DashboardStudentPage() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex justify-between items-center">
        <StudentHeader />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StudentPerformanceTrend />
      </div>
    </div>
  );
}
