"use client";

import { getMyReport } from "@/features/quiz-results/actions/my-report";
import { Suspense } from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { TestHistory } from "@/features/test/components/molecules/test-history";
import { EmptyState } from "@/features/test/components/atoms/empty-state";

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
      <TestHistory
        reports={filteredReports}
        title="Course Test History"
        description={`Total tests taken: ${filteredReports.length}`}
        showStudent={true}
        showLesson={true}
        showTest={false}
        linkTo="lesson"
      />
    </Suspense>
  );
}
