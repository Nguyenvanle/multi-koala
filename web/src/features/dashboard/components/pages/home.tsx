import { DashboardHeader } from "@/features/dashboard/components/molecules/dashboard-header";
import DashboardRecentCourseSales from "@/features/dashboard/components/molecules/dashboard-recent";
import DashboardTopPerformingCourses from "@/features/dashboard/components/molecules/dashboard-top";

export default function DashboardHomePage() {
  return (
    <div className="flex flex-col flex-1 gap-4 xl:gap-6">
      <DashboardHeader />
      <div className="grid gap-4 xl:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <DashboardRecentCourseSales />
        <DashboardTopPerformingCourses />
      </div>
    </div>
  );
}
