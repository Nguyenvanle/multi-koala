import DashboardHomePage from "@/features/dashboard/components/pages/home";
import { getStudentChart } from "@/features/enroll-courses/actions/get-student-chart";
import { Suspense } from "react";

async function getStudentChartData() {
  try {
    const res = await getStudentChart();
    if (!res.success) {
      throw new Error(res.message);
    }

    if (!res.studentChart) {
      throw new Error("No data in getStudentChart");
    }

    return res.studentChart;
  } catch (error) {
    throw new Error("Failed to fetch student chart data");
  }
}

export default async function Dashboard() {
  const studentChartData = await getStudentChartData();

  return (
    <div className="flex-1">
      <Suspense>
        <DashboardHomePage studentChartData={studentChartData} />
      </Suspense>
    </div>
  );
}
