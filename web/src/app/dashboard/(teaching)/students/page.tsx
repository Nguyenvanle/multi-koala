import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardStudentPage from "@/features/dashboard/components/pages/student";
import { getMyReport } from "@/features/quiz-results/actions/my-report";
import { quizColumns } from "@/features/quiz-results/components/atoms/columns";
import { ReportTable } from "@/features/quiz-results/components/molecules/report-table";
import { Suspense } from "react";

async function getReports() {
  const res = await getMyReport();
  if (!res.reports) throw new Error("Failed to fetch data");
  return res.reports;
}

export default async function Page() {
  // return <DashboardStudentPage />;

  const reports = await getReports();

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle>Student Test Results</CardTitle>
        <CardDescription>
          Recent test scores and performance data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-[50vw] h-[50vh] m-4" />}>
          <ReportTable columns={quizColumns} data={reports} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
