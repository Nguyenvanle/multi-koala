import DashboardStudentPage from "@/features/dashboard/components/pages/student";
import { getMyReport } from "@/features/quiz-results/actions/my-report";

async function getReports() {
  const res = await getMyReport();
  if (!res.reports) throw new Error("Failed to fetch data");
  return res.reports;
}

export default async function Page() {
  // return <DashboardStudentPage />;

  const reports = await getReports();

  return <pre>{JSON.stringify(reports, null, 2)}</pre>;
}
