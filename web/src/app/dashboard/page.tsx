import DashboardHomePage from "@/features/dashboard/components/pages/home";
import { getStudentChart } from "@/features/enroll-courses/actions/get-student-chart";
import { Suspense } from "react";

export const revalidate = 60 * 1; // 1 minutes

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
  let studentChartData = null;

  try {
    studentChartData = await getStudentChartData();
  } catch (error) {
    // Xử lý khi không thể lấy dữ liệu
    console.error("Không thể tải dữ liệu biểu đồ:", error);
  }

  return (
    <div className="flex-1">
      <Suspense fallback={<div>Đang tải...</div>}>
        {studentChartData ? (
          <DashboardHomePage studentChartData={studentChartData} />
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </Suspense>
    </div>
  );
}
