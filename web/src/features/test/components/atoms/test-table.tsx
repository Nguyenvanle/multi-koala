import { Badge } from "@/components/ui/badge";
import { MyReportBodyType } from "@/features/quiz-results/types/my-report";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";

interface TestTableProps {
  reports: MyReportBodyType[];
  showStudent?: boolean;
  showLesson?: boolean;
  showTest?: boolean;
  linkTo?: "lesson" | "test" | "course";
}

export const TestTable = ({
  reports,
  showStudent = true,
  showLesson = true,
  showTest = false,
  linkTo = "lesson",
}: TestTableProps) => {
  const getColumns = () => {
    let cols = [];
    if (showLesson) cols.push("Lesson");
    if (showStudent) cols.push("Student");
    if (showTest) cols.push("Test");
    cols = [...cols, "Score", "Correct", "Date"];
    return cols;
  };

  const getGridCols = () => {
    let count = 4; // Correct, Score, Date are always present
    if (showLesson) count++;
    if (showStudent) count++;
    if (showTest) count++;
    return `grid-cols-${count}`;
  };

  const getLinkHref = (report: MyReportBodyType) => {
    switch (linkTo) {
      case "lesson":
        return `/dashboard/courses/${report.courseId}/lessons/${report.lessonId}`;
      case "test":
        return `/dashboard/courses/${report.courseId}/lessons/${report.lessonId}/tests/${report.testId}`;
      case "course":
        return `/dashboard/courses/${report.courseId}`;
      default:
        return "#";
    }
  };

  return (
    <div className="rounded-md border">
      <div
        className={`grid ${getGridCols()} gap-4 p-4 mr-4 font-medium border-b`}
      >
        {getColumns().map((col) => (
          <div
            key={col}
            className={`text-left ${col === "Lesson" ? "col-span-2" : ""} ${col === "Score" ? "ml-1" : ""}`}
          >
            {col}
          </div>
        ))}
      </div>
      <div className="divide-y">
        <div className="overflow-y-auto max-h-72">
          {reports.map((test, index) => {
            const score = parseFloat(test.score);
            return (
              <div
                key={index}
                className={`grid ${getGridCols()} gap-4 p-4 hover:bg-gray-100 dark:hover:bg-muted`}
              >
                {showLesson && (
                  <Link
                    className="text-sm text-primary col-span-2"
                    href={getLinkHref(test)}
                  >
                    {test.lessonName}
                  </Link>
                )}
                {showStudent && (
                  <div className="text-sm">{test.studentName}</div>
                )}
                {showTest && <div className="text-sm">{test.testName}</div>}
                <div className="text-sm">
                  <Badge
                    variant={
                      score >= 80
                        ? "default"
                        : score >= 50
                          ? "pending"
                          : "destructive"
                    }
                    className="px-2 py-1 text-xs"
                  >
                    {score.toFixed(1)}%
                  </Badge>
                </div>

                <div className="text-sm ">{test.correct}</div>
                <div className="text-sm ">
                  {dateFormatter(new Date(test.dateTaken))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
