import VisitorsPieChart from "@/features/dashboard/components/molecules/student-chart";
import DashboardHomePage from "@/features/dashboard/components/pages/home";
import { Suspense } from "react";

export default async function Dashboard() {
  return (
    <div className="flex-1">
      <Suspense>
        <DashboardHomePage />
      </Suspense>
    </div>
  );
}
