import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MyReportBodyType } from "@/features/quiz-results/types/my-report";
import { EmptyState } from "@/features/test/components/atoms/empty-state";
import { TestTable } from "@/features/test/components/atoms/test-table";

interface TestHistoryProps {
  reports: MyReportBodyType[];
  title?: string;
  description?: string;
  showStudent?: boolean;
  showLesson?: boolean;
  showTest?: boolean;
  linkTo?: "lesson" | "test" | "course";
}

export const TestHistory = ({
  reports,
  title = "Test History",
  description,
  showStudent = true,
  showLesson = true,
  showTest = false,
  linkTo = "lesson",
}: TestHistoryProps) => {
  if (!reports || reports.length === 0) {
    return <EmptyState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <TestTable
          reports={reports}
          showStudent={showStudent}
          showLesson={showLesson}
          showTest={showTest}
          linkTo={linkTo}
        />
      </CardContent>
    </Card>
  );
};
