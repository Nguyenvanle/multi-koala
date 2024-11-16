import { Card, CardContent } from "@/components/ui/card";
import { getTests } from "@/features/lessons/actions/get-test";
import TestEditor from "@/features/test/components/pages/test";
import { Pencil } from "lucide-react";

export const revalidate = 60;

async function fetchTests(lessonId: string) {
  const res = await getTests(lessonId);
  return res.tests;
}

const EmptyState = () => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Pencil className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Test Data Available
      </h3>
      <p className="text-gray-500 text-center">
        The test data appears to be missing or invalid. Please check the data
        and try again.
      </p>
    </CardContent>
  </Card>
);

export default async function Page({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
    testId: string;
  };
}) {
  const data = await fetchTests(params.lessonId);

  const initialTestData = data.find((test) => test.testId === params.testId);

  if (!initialTestData) {
    return <EmptyState />;
  }

  return <TestEditor initialTestData={initialTestData} />;
}
