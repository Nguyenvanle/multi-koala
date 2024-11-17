"use client";

import { getMyReport } from "@/features/quiz-results/actions/my-report";
import { Suspense } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardX } from "lucide-react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EmptyState = () => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-3 mb-4">
        <ClipboardX className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Test Data Available
      </h3>
      <p className="text-gray-500 text-center">
        There is currently no test data to display. Please check back later.
      </p>
    </CardContent>
  </Card>
);

async function getReports() {
  const res = await getMyReport();
  return res.reports ? res.reports : [];
}

export default function StudentList() {
  const { data } = useSWR("getReports", getReports);
  const { courseId } = useParams();
  const filteredReports = data
    ? data.filter((report) => report.courseId === courseId)
    : [];

  if (!filteredReports || filteredReports.length === 0) {
    return <EmptyState />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
          <CardDescription>
            Total tests taken: {filteredReports.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 mr-4 font-medium border-b">
              <div>Student</div>
              <div className="col-span-2">Lesson</div>
              <div className="text-center">Correct</div>
              <div className="text-left ml-1">Score</div>
              <div className="text-right">Date</div>
            </div>
            <div className="divide-y">
              <div className="overflow-y-auto max-h-72">
                {filteredReports.map((test, index) => {
                  const score = parseFloat(test.score);
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-100"
                    >
                      <div className="text-sm">{test.studentName}</div>
                      <Link
                        className="text-sm col-span-2 font-bold"
                        href={`/dashboard/courses/${test.courseId}/lessons/${test.lessonId}`}
                      >
                        {test.lessonName}
                      </Link>
                      <div className="text-sm text-center">{test.correct}</div>
                      <div className="text-sm ">
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
                      <div className="text-sm text-right">
                        {formatDate(test.dateTaken)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Suspense>
  );
}
