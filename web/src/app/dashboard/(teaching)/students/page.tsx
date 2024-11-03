import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";
import StudentHeader from "@/features/dashboard/components/atoms/students-header";
import DashboardStudentPage from "@/features/dashboard/components/pages/student";
import { getMyReport } from "@/features/quiz-results/actions/my-report";
import { quizColumns } from "@/features/quiz-results/components/atoms/columns";
import { ReportTable } from "@/features/quiz-results/components/molecules/report-table";
import { Home } from "lucide-react";
import { Suspense } from "react";

async function getReports() {
  const res = await getMyReport();
  if (!res.reports) throw new Error("Failed to fetch data");
  return res.reports;
}

const breadcrumbs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  { label: "Student Management" },
];

export default async function Page() {
  // return <DashboardStudentPage />;

  const reports = await getReports();

  return (
    <div className="flex flex-col w-full gap-2">
      <Breadcrumbs items={breadcrumbs} />
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
    </div>
  );
}
